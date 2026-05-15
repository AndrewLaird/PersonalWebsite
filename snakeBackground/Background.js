var automaton = null;

window.onload = function() {
    var canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    automaton = new CellularAutomaton(canvas);
    automaton.start();
};

window.onresize = function() {
    var canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    if (automaton) automaton.stop();
    automaton = new CellularAutomaton(canvas);
    automaton.start();
};

function CellularAutomaton(canvas) {
    var ctx = canvas.getContext("2d");
    var cellSize = 6;
    var bgColor = "#312E2B";
    var cellColor = "#d3bdb0";

    // Size canvas to full document
    var pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
    );
    canvas.width = window.innerWidth;
    canvas.height = pageHeight;

    var cols = Math.floor(canvas.width / cellSize);
    var rows = Math.floor(canvas.height / cellSize);

    // Rule 22: binary 00010110
    var rule = [0, 1, 1, 0, 1, 0, 0, 0];

    // Find starting points: middle of left and right padding
    var contentWidth = Math.min(800, Math.max(650, window.innerWidth));
    var paddingLeft = (window.innerWidth - contentWidth) / 2;
    var paddingRight = paddingLeft;

    var leftSeed = Math.floor((paddingLeft / 2) / cellSize);
    var rightSeed = Math.floor((window.innerWidth - paddingRight / 2) / cellSize);

    // Clamp seeds
    leftSeed = Math.max(0, Math.min(cols - 1, leftSeed));
    rightSeed = Math.max(0, Math.min(cols - 1, rightSeed));

    // If window is too narrow for meaningful padding, place seeds near edges
    if (paddingLeft < cellSize * 2) {
        leftSeed = 1;
        rightSeed = cols - 2;
    }

    // Precompute all rows
    var allRows = [];
    var firstRow = new Uint8Array(cols);
    firstRow[leftSeed] = 1;
    firstRow[rightSeed] = 1;
    allRows.push(firstRow);

    for (var y = 1; y < rows; y++) {
        var prevRow = allRows[y - 1];
        var newRow = new Uint8Array(cols);
        for (var x = 0; x < cols; x++) {
            var left = x > 0 ? prevRow[x - 1] : 0;
            var center = prevRow[x];
            var right = x < cols - 1 ? prevRow[x + 1] : 0;
            var index = (left << 2) | (center << 1) | right;
            newRow[x] = rule[index];
        }
        allRows.push(newRow);
    }

    // Animation state
    var currentY = 0;
    var animFrameId = null;
    var rowsPerFrame = 1;
    var frameInterval = 16; // ~60fps
    var lastFrame = 0;

    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function renderRow(y) {
        var row = allRows[y];
        ctx.fillStyle = cellColor;

        for (var x = 0; x < cols; x++) {
            if (row[x] === 1) {
                ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }

    function animate(timestamp) {
        if (timestamp - lastFrame < frameInterval) {
            animFrameId = requestAnimationFrame(animate);
            return;
        }
        lastFrame = timestamp;

        var end = Math.min(currentY + rowsPerFrame, allRows.length);
        for (var y = currentY; y < end; y++) {
            renderRow(y);
        }
        currentY = end;

        if (currentY < allRows.length) {
            animFrameId = requestAnimationFrame(animate);
        }
    }

    this.start = function() {
        currentY = 0;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        animFrameId = requestAnimationFrame(animate);
    };

    this.stop = function() {
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
    };
}
