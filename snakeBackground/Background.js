var requestId = 0;
var animation_id
var c;
window.onload = function(){
    var canvas = document.getElementById("canvas");
    
    c = canvas.getContext("2d");
    // Update canvas size
    c.canvas.height = window.innerHeight;
    c.canvas.width = window.innerWidth;
    canvas.style.webkitFilter = "blur(1px)";
    animation_id = SnakeArt(c.canvas);
};

window.onresize = function(){
    // Cancel the current animation frame request
    cancelAnimationFrame(animation_id);

    // Update canvas size
    c.canvas.height = window.innerHeight;
    c.canvas.width = window.innerWidth;
    
    // Call SnakeArt to restart the animation loop with the updated canvas size
    animation_id = SnakeArt(c.canvas);
}

function SnakeArt(canvas) {

    var width = canvas.width;
    var height = canvas.height;

    // Toupe
    //c.fillStyle = "#f5f1ed";
    // Grey
    c.fillStyle = "#312E2B";
    c.fillRect(0, 0, width, height);

    //var color1 = "#d3bdb0";
    //var color2 = "#69385c";
    //var color3 = "#69385c";
    //var color4 = "#d3bdb0";

    var color1 = "#d3bdb0";
    var color2 = "#69385c";
    var color3 = "#715b64";
    var color4 = "#c1ae9f";

    //var color1 = "#d3bdb0";
    //var color2 = "#69385c";
    //var color3 = "#715b64";
    //var color4 = "#FFFFFF";

    var xNum = Math.ceil(width / 10);
    var yNum = Math.ceil(height / 10);

    // make sure that there is always an even number of pixels
    xNum = xNum - xNum%2
    yNum = yNum - yNum%2

    var xBox = width / xNum;
    var yBox = height / yNum;
    var board = [];
    for (y = 0; y < yNum; y++) {
        board[y] = [];
        for (x = 0; x < xNum; x++) {
            board[y][x] = 0;
        }
    }

    c.lineWidth = 1;

    // put them in 4 quadrents
    var snake1 = [Math.round(xNum*1/8), Math.round(yNum*1/4)];
    var snake2 = [Math.round(xNum*7/8), Math.round(yNum*1/4)];
    var snake3 = [Math.round(xNum*1/8), Math.round(yNum*3/4)];
    var snake4 = [Math.round(xNum*7/8), Math.round(yNum*3/4)];
    var snakes = [snake1, snake2, snake3, snake4];
    var previous = [0,0,0,0]
    colorDict = {
        0: color1,
        1: color2,
        2: color3,
        3: color4
    };

    function move_snake(dir){
        delta_x = (dir % 2) * (-1)*(dir-2)
        delta_y = ((dir+1) % 2) * (dir-1)

        return [delta_x,delta_y]

    }
    function valid_directions(snake_index){
        let delta_x, delta_y;
        let valid_dirs = [];
        for(let dir = 0; dir < 4; dir++){
            // remove going directly behind
            if (dir == (previous[snake_index]+2)%4){
                continue
            }
            // check if the next spot is open
            [delta_x,delta_y] = move_snake(dir)
            x = mod((x+delta_x) , (xNum-2));
            y = mod((y+delta_y) , (yNum-2));
            if(board[y][x] != 1){
                valid_dirs.push(dir);
            }
        }
        return valid_dirs

    };
    function get_next_move(snake_index){
        // if you can not run into a taken square, do so
        let valid_dirs = valid_directions(snake_index)
        if(valid_dirs.length){
            let selection = Rand(valid_dirs.length);
            console.log(snake_index, valid_dirs, selection)
            return valid_dirs[selection]
        }
        // otherwise just take a random one that isn't the previous one
        var dir = Rand(4);
        while(dir == (previous[snake_index]+2)%4){
            dir = Rand(4);
        }
        return dir;
    }
;

    // javascript mod function returns negative for negative numbers
    function mod(n, m) {
        var remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };
    // interval controls how long between renders at minimum
    var interval = 10;
    var lastRender = 0;
    // start the animation loop
    function animate(timestamp) {
        if (timestamp < lastRender + interval) {
            // Not enough time has elapsed since the last frame, skip this frame
            requestAnimationFrame(animate);
            return;
        }
        lastRender = timestamp;

        for (var i = 0; i < snakes.length; i++) {
            var dir = get_next_move(i);
            // give a bias toward exploration
            previous[i] = dir;

            for(var j = 0; j < 1; j++){
                var x = snakes[i][0];
                var y = snakes[i][1];

                var delta = move_snake(dir);
                const delta_x = delta[0];
                const delta_y = delta[1];

                x = mod((x+delta_x) , (xNum-2));
                y = mod((y+delta_y) , (yNum-2));

                if (board[y][x] == 0) {
                    c.fillStyle = colorDict[i]
                    c.fillRect((x * xBox) + xBox/4
                        , (y * yBox) + yBox/4
                        , 3*xBox/4
                        , 3*yBox/4
                    );
                    board[y][x] = 1;
                }
                snakes[i][0] = x;
                snakes[i][1] = y;
            }

        }
        // Request the next frame
        animation_id = requestAnimationFrame(animate);
    }

    // Start the animation loop
    var animation_id = requestAnimationFrame(animate);

    return animation_id;
}

function Rand(num) {
    return Math.floor(Math.random() * num);
}
