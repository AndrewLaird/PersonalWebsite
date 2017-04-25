<header>
</header>
<body>
  <div id = "background">
    <canvas id = "canvas" width = "100%" height = "100%">
    Im sorry you require canvas
    </canvas>
  </div>
  <div id = "Page">
    <h1 id = "Title"> Andrew Laird</h1>
    <a src = "https://github.com/AndrewLaird">(GitHub)</a>
    <a src = "">(Linked In)</a>
    <a src = "">(Projects)</a>
    <a href = "http:://www.codepen.io/LairdAndrew">(CodePen)<a>
    
    
  </div>
</body>
<style>

#canvas{
  position: absolute;
}
#Page{
  color:rgb(50,0,50);
  position:relative;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  text-align:center;
  padding:5%;
}
a{
  font-size:25px;
  text-decoration:none;
  color:inherit;
}



</style>

<script type="text/javascript">

window.onload = SnakeArt("canvas");

function SnakeArt(id) {
  var canvas = document.getElementById(id);
  var c = canvas.getContext("2d");
  
  c.canvas.height = window.innerHeight;
  c.canvas.width = window.innerWidth;
  
  var width = canvas.width;
  var height = canvas.height;

  //c.fillStyle = "gray";
  //c.fillRect(0, 0, width, height);
  c.strokeStyle = "black";
  c.strokeWidth = 5;
  c.strokeRect(0, 0, width+5 , height+5);

  var color1 = "rgb(100, 200,100)";
  var color2 = "rgb(0,200,0)";
  var color3 = "rgb(50,50,154)";
  var color4 = "rgb(0,0,150)";

  var xNum = width / 10;
  var yNum = height / 10;
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
  for (y = 0; y < yNum; y++) {
    for (x = 0; x < xNum; x++) {
      //difference between stroke and fill style

     // c.strokeStyle = "black";
      //c.strokeRect(x * xBox, y * yBox, (x + 1) * xBox, (y + 1) * yBox);
    }
    //hey good to note that things stay on the canvas and do not need to
    //be repainted if they are just remaining
  }
 
  var snake1 = [Rand(yNum), Rand(xNum)];
  var snake2 = [Rand(yNum), Rand(xNum)];
  var snake3 = [Rand(yNum), Rand(xNum)];
  var snake4 = [Rand(yNum), Rand(xNum)];
  var snake5 = [Rand(yNum), Rand(xNum)];
  var snake6 = [Rand(yNum), Rand(xNum)];
  var snake7 = [Rand(yNum), Rand(xNum)];
  var snake8 = [Rand(yNum), Rand(xNum)];
  var snakes = [snake1, snake2, snake3, snake4,snake5,snake6,snake7,snake8];
  setInterval(function() {
    for (var i = 0; i < snakes.length; i++) {
      var dir = Rand(4);
      if (dir == 0) {
        snakes[i][1]--;
        if(snakes[i][1] < 0){snakes[i][1] = yNum }
      } else if (dir == 1) {
        snakes[i][0]++;
        if(snakes[i][0] >= xNum){snakes[i][0] = 0 }
      } else if (dir == 2) {
        snakes[i][1]++;
        if(snakes[i][1] >= yNum){snakes[i][1] = 0 }
      } else if (dir == 3) {
        snakes[i][0]--;
        if(snakes[i][0] < 0){snakes[i][0] = xNum }
      }
      var x = snakes[i][0];
      var y = snakes[i][1];
      var pos = board[y][x];
      colorDict = {0:color1,1:color2,2:color3,3:color4,4:color1,5:color2,6:color3,7:color4};
      
      if (pos == 0) {
        c.fillStyle =colorDict[i]
        c.fillRect(x * xBox, y * yBox, xBox, yBox );
        console.log(c);
        board[y][x] = 1;
      }
    }
    //does this every 50 miliseconds
    ScoreBoard();
  }, .001);
}

function Rand(num) {
  return Math.floor(Math.random() * num);
}

function ScoreBoard(){
  document.getElementById("scoreBoard").innerHTML = ("Snake1: " + count1 + " Snake2: " + count2 + " Snake3: " + count3 + " Snake4: " + count4);
}



</script>