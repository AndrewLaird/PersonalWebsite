<!--
Created by: Andrew Laird

This program works by keeping track the heads of 4-8 'snakes' that paint the canvas they sit on as they move
it creates fun pixel art if you give it some time.
a quicker version can be seen on my codepen: https://codepen.io/LairdAndrew/pen/vGogZj

-->
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
    <a href = "https://github.com/AndrewLaird">(GitHub)</a>
    <a href = "https://www.linkedin.com/in/andrew-laird-a814b8134">(Linked In)</a>
    <a href = "http://poems.calit2.uci.edu/about">(Projects)</a>
    <a href = "http://www.codepen.io/LairdAndrew">(CodePen)</a>
    
    <div id="Content">
      <h2> Computer Science, Specilization in AI </h2>
      
      <h1> Reinforcment Learning </h1>
      
      <h3>
        Quarter Long Research Project in Reinforcement Learning towards the goal of a self learning robotic arm:
      </h3> 
      <p>Using PPO and a laptop CPU to train a robot to walk (OpenAI BipedalWalker):</p>
      <div style="width:100%;height:400px;">
          <img src="BipedalWalker190.gif">    
      </div>
      
      <p>Reacher Arm in a lower dimensional environment (OpenAI RoboSchool):</p>
      <div style="width:100%;height:400px;">
        <img src="Reacher18.gif">
      </div>
      
      <p>Robotic Arm in the Fetch Reach environment (OpenAI Mujoco):</p>
      <div style="width:100%;height:400px;">
        <img src="Reacher-Solved.gif">
      </div>
      <p>
          Other Research Topics Include DDQN, Ciriculum Learning, and how to read reasearch papers effciently.
      </p>
    </div>
  </div>
</body>
<style>
  
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }

  
  #canvas{
    position: fixed;
  }
  #Page{
    background-color:rgb(138,43,226);
    color:rgb(250,250,250);
    position:relative;
    width:50%;
    margin: 0 auto;
    text-align:center;
    padding:1%;
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

  c.fillStyle = "white";
  c.fillRect(0, 0, width, height);
  c.strokeStyle = "black";
  c.strokeWidth = 5;
  c.strokeRect(0, 0, width+5 , height+5);

  var color1 = "rgb(100, 200,100)";
  var color2 = "rgb(0,200,0)";
  var color3 = "rgb(50,50,154)";
  var color4 = "rgb(0,0,150)";

  var xNum = Math.ceil(width / 10);
  var yNum = Math.ceil(height / 10);
  var xBox = width / xNum;
  var yBox = height / yNum;
  var board = [];
  for (y = 0; y < yNum; y++) {
    board[y] = [];
    for (x = 0; x < xNum; x++) {
      board[y][x] = 0;
    }
  }
  console.log(board)
  console.log(xNum)
  console.log(yNum)

  c.lineWidth = 1;
 
  var snake1 = [Rand(xNum), Rand(yNum)];
  var snake2 = [Rand(xNum), Rand(yNum)];
  var snake3 = [Rand(xNum), Rand(yNum)];
  var snake4 = [Rand(xNum), Rand(yNum)];
  var snakes = [snake1, snake2, snake3,snake4];
  setInterval(function() {
    for (var i = 0; i < snakes.length; i++) {
      var dir = Rand(4);
      if (dir == 0) {
        snakes[i][1]--;
        if(snakes[i][1] < 0){snakes[i][1] = yNum-1 }
      } else if (dir == 1) {
        snakes[i][0]++; 
        if(snakes[i][0] >= xNum){snakes[i][0] = 0 }
      } else if (dir == 2) {
        snakes[i][1]++;
        if(snakes[i][1] >= yNum){snakes[i][1] = 0 }
      } else if (dir == 3) {
        snakes[i][0]--;
        if(snakes[i][0] < 0){snakes[i][0] = xNum-1 }
      }
      var x = snakes[i][0];
      var y = snakes[i][1];

      if(board[y][x] == 0){
        colorDict = {0:color1,1:color2,2:color3,3:color4};
        c.fillStyle =colorDict[i]
        c.fillRect(x * xBox, y * yBox, xBox, yBox );
        board[y][x] = 1;
      }
    }
    //Repeat this on a timer
  }, 1);
}

function Rand(num) {
  return Math.floor(Math.random() * num);
}

</script>
