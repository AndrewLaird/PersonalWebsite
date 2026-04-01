var animationLeft, animationRight;
var cLeft, cRight;

window.onload = function() {
    var canvasLeft = document.getElementById("canvas-left");
    var canvasRight = document.getElementById("canvas-right");

    if (!canvasLeft || !canvasRight) return;

    cLeft = canvasLeft.getContext("2d");
    cRight = canvasRight.getContext("2d");

    var sideWidth = Math.floor(window.innerWidth * 0.25);

    cLeft.canvas.width = sideWidth;
    cLeft.canvas.height = window.innerHeight;
    cRight.canvas.width = sideWidth;
    cRight.canvas.height = window.innerHeight;

    animationLeft = GameOfLife(cLeft, "right");
    animationRight = GameOfLife(cRight, "left");
};

window.onresize = function() {
    if (!cLeft || !cRight) return;

    cancelAnimationFrame(animationLeft);
    cancelAnimationFrame(animationRight);

    var sideWidth = Math.floor(window.innerWidth * 0.25);

    cLeft.canvas.width = sideWidth;
    cLeft.canvas.height = window.innerHeight;
    cRight.canvas.width = sideWidth;
    cRight.canvas.height = window.innerHeight;

    animationLeft = GameOfLife(cLeft, "right");
    animationRight = GameOfLife(cRight, "left");
};

function GameOfLife(ctx, direction) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var cellSize = 16;

    var bgColor = "#312E2B";
    var cellColors = ["#d3bdb0", "#69385c", "#715b64", "#c1ae9f"];

    var cols = Math.floor(width / cellSize);
    var rows = Math.floor(height / cellSize);

    // Initialize empty grid
    var grid = [];
    var ageGrid = [];
    for (var y = 0; y < rows; y++) {
        grid[y] = [];
        ageGrid[y] = [];
        for (var x = 0; x < cols; x++) {
            grid[y][x] = 0;
            ageGrid[y][x] = 0;
        }
    }

    // Glider moving down-right
    function placeGliderRight(startX, startY) {
        var pattern = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1]
        ];
        for (var dy = 0; dy < 3; dy++) {
            for (var dx = 0; dx < 3; dx++) {
                var x = startX + dx;
                var y = startY + dy;
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    grid[y][x] = pattern[dy][dx];
                    ageGrid[y][x] = pattern[dy][dx];
                }
            }
        }
    }

    // Glider moving down-left
    function placeGliderLeft(startX, startY) {
        var pattern = [
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1]
        ];
        for (var dy = 0; dy < 3; dy++) {
            for (var dx = 0; dx < 3; dx++) {
                var x = startX + dx;
                var y = startY + dy;
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    grid[y][x] = pattern[dy][dx];
                    ageGrid[y][x] = pattern[dy][dx];
                }
            }
        }
    }

    // Place gliders diagonally from corners
    var spacing = 8;
    var xStep = Math.floor(cols / 3);
    if (direction === "right") {
        var startX = 0;
        for (var y = 2; y < rows - 5; y += spacing) {
            placeGliderRight(startX, y);
            startX = (startX + xStep) % cols;
        }
    } else {
        var startX = cols - 4;
        for (var y = 2; y < rows - 5; y += spacing) {
            placeGliderLeft(startX, y);
            startX = startX - xStep;
            if (startX < 0) startX += cols;
        }
    }

    // Track mouse position for highlight
    var mouseX = -1;
    var mouseY = -1;

    ctx.canvas.addEventListener("mousemove", function(e) {
        var rect = ctx.canvas.getBoundingClientRect();
        mouseX = Math.floor((e.clientX - rect.left) / cellSize);
        mouseY = Math.floor((e.clientY - rect.top) / cellSize);
    });

    ctx.canvas.addEventListener("mouseleave", function() {
        mouseX = -1;
        mouseY = -1;
    });

    // Loaf pattern (stable "bread" shape)
    function placeLoaf(startX, startY) {
        var pattern = [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [0, 0, 1, 0]
        ];
        for (var dy = 0; dy < 4; dy++) {
            for (var dx = 0; dx < 4; dx++) {
                var x = startX + dx - 1;
                var y = startY + dy - 1;
                if (x >= 0 && x < cols && y >= 0 && y < rows && pattern[dy][dx]) {
                    grid[y][x] = 1;
                    ageGrid[y][x] = 1;
                }
            }
        }
    }

    ctx.canvas.addEventListener("click", function(e) {
        var rect = ctx.canvas.getBoundingClientRect();
        var clickX = Math.floor((e.clientX - rect.left) / cellSize);
        var clickY = Math.floor((e.clientY - rect.top) / cellSize);
        if (clickX >= 0 && clickX < cols && clickY >= 0 && clickY < rows) {
            placeLoaf(clickX, clickY);
        }
    });

    function countNeighbors(grid, x, y) {
        var count = 0;
        for (var dy = -1; dy <= 1; dy++) {
            for (var dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                var ny = (y + dy + rows) % rows;
                var nx = (x + dx + cols) % cols;
                count += grid[ny][nx];
            }
        }
        return count;
    }

    function nextGeneration() {
        var newGrid = [];
        var newAgeGrid = [];
        for (var y = 0; y < rows; y++) {
            newGrid[y] = [];
            newAgeGrid[y] = [];
            for (var x = 0; x < cols; x++) {
                var neighbors = countNeighbors(grid, x, y);
                var alive;
                if (grid[y][x] === 1) {
                    alive = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    alive = (neighbors === 3) ? 1 : 0;
                }
                newGrid[y][x] = alive;
                newAgeGrid[y][x] = alive ? ageGrid[y][x] + 1 : 0;
            }
        }
        grid = newGrid;
        ageGrid = newAgeGrid;
    }

    function render() {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                if (grid[y][x] === 1) {
                    var age = ageGrid[y][x];
                    var colorIndex = Math.min(age - 1, cellColors.length - 1);
                    ctx.fillStyle = cellColors[colorIndex];
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
                }
            }
        }

        // Draw highlight under cursor with pulsing anticipation
        if (mouseX >= 0 && mouseX < cols && mouseY >= 0 && mouseY < rows) {
            var pulse = 0.3 + 0.2 * Math.sin(Date.now() / 150);

            // Outer glow - neighboring cells
            for (var dy = -2; dy <= 2; dy++) {
                for (var dx = -2; dx <= 2; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    var nx = mouseX + dx;
                    var ny = mouseY + dy;
                    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        var alpha = (0.15 / dist) * pulse;
                        ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
                        ctx.fillRect(nx * cellSize, ny * cellSize, cellSize - 1, cellSize - 1);
                    }
                }
            }

            // Main highlight
            ctx.fillStyle = "rgba(255, 255, 255, " + pulse + ")";
            ctx.fillRect(mouseX * cellSize, mouseY * cellSize, cellSize - 1, cellSize - 1);
        }
    }

    var gameInterval = 150;
    var lastGameUpdate = 0;

    function animate(timestamp) {
        // Update game state at slower interval
        if (timestamp - lastGameUpdate >= gameInterval) {
            nextGeneration();
            lastGameUpdate = timestamp;
        }

        // Render every frame for smooth highlight
        render();

        return requestAnimationFrame(animate);
    }

    render();
    return requestAnimationFrame(animate);
}
