var interval_id = 0
window.onload = function(){
    interval_id = SnakeArt("canvas");
};
window.onresize = function(){
    clearInterval(interval_id);
    interval_id = SnakeArt("canvas");

}

function SnakeArt(id) {
    var canvas = document.getElementById(id);
    var c = canvas.getContext("2d");

    c.canvas.height = window.innerHeight;
    c.canvas.width = window.innerWidth;

    var width = canvas.width;
    var height = canvas.height;

    c.fillStyle = "#f5f1ed";
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

    };

    function clamp(val,min,max){
        return Math.min(Math.max(val, min), max)
    }
    // javascript mod function returns negative for negative numbers
    function mod(n, m) {
        var remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };


    
    var interval_id = setInterval(function() {
        for (var i = 0; i < snakes.length; i++) {
            var dir = Rand(4);
            while(dir == (previous[i]+2)%4){
                var dir = Rand(4);
            }
            // give a bias toward exploration
            previous[i] = dir;

            for(var j = 0; j < 2; j++){
                var x = snakes[i][0];
                var y = snakes[i][1];

                var delta = move_snake(dir);
                const delta_x = delta[0];
                const delta_y = delta[1];

                x = mod((x+delta_x) , (xNum-2));
                y = mod((y+delta_y) , (yNum-2));


                if (board[y][x] == 0) {
                    c.fillStyle = colorDict[i]
                    c.fillRect(x * xBox, y * yBox, xBox, yBox);
                    board[y][x] = 1;
                }
                snakes[i][0] = x;
                snakes[i][1] = y;
            }

        }
        //Repeat this on a timer
    }, 10);
    return interval_id;
}

function Rand(num) {
    return Math.floor(Math.random() * num);
}

