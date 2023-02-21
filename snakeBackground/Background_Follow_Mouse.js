var requestId = 0;

window.onload = function(){
  requestId = SnakeArt("canvas");
};

window.onresize = function(){
  cancelAnimationFrame(requestId);
  requestId = SnakeArt("canvas");
}

function SnakeArt(id) {
  var canvas = document.getElementById(id);
  var c = canvas.getContext("2d");
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var xNum = Math.ceil(width / 10);
  var yNum = Math.ceil(height / 10);
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

  var color1 = "#d3bdb0";
  var color2 = "#69385c";
  var color3 = "#715b64";
  var color4 = "#c1ae9f";
  colorDict = {
    0: color1,
    1: color2,
    2: color3,
    3: color4
  };
  
  var snakes = [    [Math.round(xNum*1/8), Math.round(yNum*1/4)],
    [Math.round(xNum*7/8), Math.round(yNum*1/4)],
    [Math.round(xNum*1/8), Math.round(yNum*3/4)],
    [Math.round(xNum*7/8), Math.round(yNum*3/4)]
  ];
  
  var previous = [0,0,0,0];

  function move_snake(dir) {
    delta_x = (dir % 2) * (-1)*(dir-2)
    delta_y = ((dir+1) % 2) * (dir-1)
    return [delta_x, delta_y]
  };

  function mod(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
  };
  function draw() {
    c.fillStyle = "#f5f1ed";
    c.fillRect(0, 0, width, height);
    for (var i = 0; i < snakes.length; i++) {
        var x = snakes[i][0];
        var y = snakes[i][1];
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var diffX = mouseX - (x * xBox);
        var diffY = mouseY - (y * yBox);
        var dir;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            dir = diffX > 0 ? 1 : 3;
        } else {
            dir = diffY > 0 ? 2 : 0;
        }
        if (dir == (previous[i]+2)%4) {
            dir = previous[i];
        }
        previous[i] = dir;
        var distance = 1;
        for (var j = 0; j < distance; j++) {
            var delta = move_snake(dir);
            const delta_x = delta[0];
            const delta_y = delta[1];
            x = mod((x+delta_x) , (xNum-2));
            y = mod((y+delta_y) , (yNum-2));
            snakes[i][0] = x;
            snakes[i][1] = y;
            c.fillStyle = snakeColor[i];
            c.fillRect(x*xBox, y*yBox, xBox, yBox);
        }
    }
  };
  function animate() {
      requestAnimationFrame(animate);
      draw();
  };
  animate();
}
