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

function GameOfLife(canvas) {
    var ctx = canvas.getContext("2d");
    var cellSize = 10;
    var bgColor = "#312E2B";
    var maxAlpha = 0.4;       // cells stay subtle behind content
    var fadeIn = 0.08;        // alpha gained per frame while alive
    var fadeOut = 0.045;      // alpha lost per frame while dead -> soft trails
    var tickInterval = 180;   // ms between generations (slow, relaxed)
    var seedDensity = 0.08;
    var reseedTicks = 40;     // rain in a few new clusters every N generations

    // Fixed to the viewport, so the grid stays bounded on long pages
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var cols = Math.floor(canvas.width / cellSize);
    var rows = Math.floor(canvas.height / cellSize);
    var size = cols * rows;

    var cells = new Uint8Array(size);
    var next = new Uint8Array(size);
    var alpha = new Float32Array(size);

    // Soft round cell sprite, drawn once and stamped per cell
    var sprite = document.createElement("canvas");
    sprite.width = sprite.height = cellSize;
    var sctx = sprite.getContext("2d");
    var r = cellSize / 2;
    var glow = sctx.createRadialGradient(r, r, 0, r, r, r);
    glow.addColorStop(0, "rgba(211, 189, 176, 1)");
    glow.addColorStop(0.7, "rgba(211, 189, 176, 0.85)");
    glow.addColorStop(1, "rgba(211, 189, 176, 0)");
    sctx.fillStyle = glow;
    sctx.fillRect(0, 0, cellSize, cellSize);

    function seedCluster(cx, cy, radius, density) {
        for (var y = cy - radius; y <= cy + radius; y++) {
            for (var x = cx - radius; x <= cx + radius; x++) {
                if (x < 0 || x >= cols || y < 0 || y >= rows) continue;
                if (Math.random() < density) cells[y * cols + x] = 1;
            }
        }
    }

    function seed() {
        for (var i = 0; i < size; i++) {
            cells[i] = Math.random() < seedDensity ? 1 : 0;
        }
    }

    function step() {
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
        var swap = cells;
        cells = next;
        next = swap;
    }

    function render() {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                var i = y * cols + x;
                // Ease each cell's brightness toward its state for soft trails
                if (cells[i]) {
                    alpha[i] = Math.min(maxAlpha, alpha[i] + fadeIn);
                } else if (alpha[i] > 0) {
                    alpha[i] = Math.max(0, alpha[i] - fadeOut);
                }
                if (alpha[i] > 0.01) {
                    ctx.globalAlpha = alpha[i];
                    ctx.drawImage(sprite, x * cellSize, y * cellSize);
                }
            }
        }
        ctx.globalAlpha = 1;
    }

    var animFrameId = null;
    var lastTick = 0;
    var tickCount = 0;

    function animate(timestamp) {
        if (timestamp - lastTick >= tickInterval) {
            lastTick = timestamp;
            step();
            tickCount++;
            if (tickCount % reseedTicks === 0) {
                for (var i = 0; i < 3; i++) {
                    seedCluster(
                        Math.floor(Math.random() * cols),
                        Math.floor(Math.random() * rows),
                        4, 0.4
                    );
                }
            }
        }
        render();
        animFrameId = requestAnimationFrame(animate);
    }

    // The canvas ignores pointer events, so listen on the document;
    // viewport coordinates line up with the fixed canvas.
    function onMouseMove(e) {
        var cx = Math.floor(e.clientX / cellSize);
        var cy = Math.floor(e.clientY / cellSize);
        seedCluster(cx, cy, 1, 0.35);
    }

    function onClick(e) {
        var cx = Math.floor(e.clientX / cellSize);
        var cy = Math.floor(e.clientY / cellSize);
        seedCluster(cx, cy, 4, 0.55);
    }

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.start = function() {
        seed();
        if (reduceMotion) {
            for (var i = 0; i < size; i++) alpha[i] = cells[i] ? maxAlpha : 0;
            render();
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
