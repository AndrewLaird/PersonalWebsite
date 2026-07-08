var automaton = null;

window.onload = function() {
    var canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    automaton = new GameOfLife(canvas);
    automaton.start();
};

window.onresize = function() {
    var canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    if (automaton) automaton.stop();
    automaton = new GameOfLife(canvas);
    automaton.start();
};

// One toroidal Life grid drawn at a given scale/brightness/speed.
// Small + dim + slow + stronger scroll lag reads as "far away".
function LifeLayer(canvas, opts) {
    this.cellSize = opts.cellSize;
    this.maxAlpha = opts.maxAlpha;
    this.fadeIn = opts.fadeIn;
    this.fadeOut = opts.fadeOut;
    this.tickInterval = opts.tickInterval;
    this.seedDensity = opts.seedDensity;
    this.reseedTicks = opts.reseedTicks;
    this.parallax = opts.parallax; // fraction of scroll this layer follows

    this.cols = Math.floor(canvas.width / this.cellSize);
    this.rows = Math.floor(canvas.height / this.cellSize);
    this.size = this.cols * this.rows;
    this.gridHeight = this.rows * this.cellSize;

    this.cells = new Uint8Array(this.size);
    this.next = new Uint8Array(this.size);
    this.alpha = new Float32Array(this.size);
    this.lastTick = 0;
    this.tickCount = 0;

    // Soft round cell sprite, drawn once and stamped per cell
    this.sprite = document.createElement("canvas");
    this.sprite.width = this.sprite.height = this.cellSize;
    var sctx = this.sprite.getContext("2d");
    var r = this.cellSize / 2;
    var glow = sctx.createRadialGradient(r, r, 0, r, r, r);
    glow.addColorStop(0, "rgba(211, 189, 176, 1)");
    glow.addColorStop(0.7, "rgba(211, 189, 176, 0.85)");
    glow.addColorStop(1, "rgba(211, 189, 176, 0)");
    sctx.fillStyle = glow;
    sctx.fillRect(0, 0, this.cellSize, this.cellSize);
}

LifeLayer.prototype.seed = function() {
    for (var i = 0; i < this.size; i++) {
        this.cells[i] = Math.random() < this.seedDensity ? 1 : 0;
    }
};

LifeLayer.prototype.seedCluster = function(cx, cy, radius, density) {
    for (var y = cy - radius; y <= cy + radius; y++) {
        for (var x = cx - radius; x <= cx + radius; x++) {
            if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) continue;
            if (Math.random() < density) this.cells[y * this.cols + x] = 1;
        }
    }
};

LifeLayer.prototype.step = function() {
    var cols = this.cols, rows = this.rows, cells = this.cells, next = this.next;
    for (var y = 0; y < rows; y++) {
        var up = ((y - 1 + rows) % rows) * cols;
        var mid = y * cols;
        var down = ((y + 1) % rows) * cols;
        for (var x = 0; x < cols; x++) {
            var left = (x - 1 + cols) % cols;
            var right = (x + 1) % cols;
            var n =
                cells[up + left] + cells[up + x] + cells[up + right] +
                cells[mid + left] + cells[mid + right] +
                cells[down + left] + cells[down + x] + cells[down + right];
            var alive = cells[mid + x];
            next[mid + x] = (n === 3 || (alive && n === 2)) ? 1 : 0;
        }
    }
    this.next = cells;
    this.cells = next;
};

LifeLayer.prototype.update = function(timestamp) {
    if (timestamp - this.lastTick < this.tickInterval) return;
    this.lastTick = timestamp;
    this.step();
    this.tickCount++;
    if (this.tickCount % this.reseedTicks === 0) {
        for (var i = 0; i < 3; i++) {
            this.seedCluster(
                Math.floor(Math.random() * this.cols),
                Math.floor(Math.random() * this.rows),
                4, 0.4
            );
        }
    }
};

LifeLayer.prototype.render = function(ctx, scrollY, animateFades) {
    // Lag behind the scroll; the toroidal grid lets the offset wrap cleanly
    var offset = (scrollY * this.parallax) % this.gridHeight;
    for (var y = 0; y < this.rows; y++) {
        var py = y * this.cellSize - offset;
        if (py < -this.cellSize) py += this.gridHeight;
        for (var x = 0; x < this.cols; x++) {
            var i = y * this.cols + x;
            if (animateFades) {
                if (this.cells[i]) {
                    this.alpha[i] = Math.min(this.maxAlpha, this.alpha[i] + this.fadeIn);
                } else if (this.alpha[i] > 0) {
                    this.alpha[i] = Math.max(0, this.alpha[i] - this.fadeOut);
                }
            }
            if (this.alpha[i] > 0.01) {
                ctx.globalAlpha = this.alpha[i];
                ctx.drawImage(this.sprite, x * this.cellSize, py);
            }
        }
    }
};

function GameOfLife(canvas) {
    var ctx = canvas.getContext("2d");
    var bgColor = "#312E2B";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var far = new LifeLayer(canvas, {
        cellSize: 6,
        maxAlpha: 0.14,
        fadeIn: 0.04,
        fadeOut: 0.02,
        tickInterval: 320,
        seedDensity: 0.07,
        reseedTicks: 40,
        parallax: 0.1
    });

    var near = new LifeLayer(canvas, {
        cellSize: 12,
        maxAlpha: 0.4,
        fadeIn: 0.08,
        fadeOut: 0.045,
        tickInterval: 180,
        seedDensity: 0.08,
        reseedTicks: 40,
        parallax: 0.3
    });

    var animFrameId = null;

    function render(animateFades) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var scrollY = window.scrollY || 0;
        far.render(ctx, scrollY, animateFades);
        near.render(ctx, scrollY, animateFades);
        ctx.globalAlpha = 1;
    }

    function animate(timestamp) {
        far.update(timestamp);
        near.update(timestamp);
        render(true);
        animFrameId = requestAnimationFrame(animate);
    }

    // The canvas ignores pointer events, so listen on the document;
    // viewport coordinates line up with the fixed canvas. Interaction
    // targets the near layer only, which keeps the depth illusion.
    function onMouseMove(e) {
        var offset = (window.scrollY || 0) * near.parallax;
        var cx = Math.floor(e.clientX / near.cellSize);
        var cy = Math.floor(((e.clientY + offset) % near.gridHeight) / near.cellSize);
        near.seedCluster(cx, cy, 1, 0.35);
    }

    function onClick(e) {
        var offset = (window.scrollY || 0) * near.parallax;
        var cx = Math.floor(e.clientX / near.cellSize);
        var cy = Math.floor(((e.clientY + offset) % near.gridHeight) / near.cellSize);
        near.seedCluster(cx, cy, 4, 0.55);
    }

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.start = function() {
        far.seed();
        near.seed();
        if (reduceMotion) {
            var i;
            for (i = 0; i < far.size; i++) far.alpha[i] = far.cells[i] ? far.maxAlpha : 0;
            for (i = 0; i < near.size; i++) near.alpha[i] = near.cells[i] ? near.maxAlpha : 0;
            render(false);
            return;
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("click", onClick);
        animFrameId = requestAnimationFrame(animate);
    };

    this.stop = function() {
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("click", onClick);
    };
}
