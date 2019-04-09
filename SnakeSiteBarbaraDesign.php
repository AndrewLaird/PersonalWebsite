
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800" rel="stylesheet">
<div id="background">
  <canvas id="canvas" width="100%" height="100%">
    Im sorry you require canvas
    </canvas>
</div>

<div class="page">
  <h1 id="Title"> Andrew Laird</h1>
  <h2> Computer Science - Specialization in AI </h2>
</div>
<div class="cl-effect-1 page">
  <nav>
    <a href="https://github.com/AndrewLaird">GitHub</a>
    <a href="https://www.linkedin.com/in/andrew-laird-a814b8134">Linked In</a>
    <a href="http://poems.calit2.uci.edu/about">Projects</a>
    <a href="http://www.codepen.io/LairdAndrew">CodePen</a>
  </nav>
</div>
<div class="page">
  <div id="Content">


    <h1> Reinforcement Learning </h1>

    <h3>
      Quarter Long Research Project in Reinforcement Learning <br/>towards the goal of a self learning robotic arm
    </h3>
    <div class="polaroid">
     <div class="caption">
        <p>Using PPO and a laptop CPU to train a robot to walk<br>OpenAI BipedalWalker</p>
      </div>
      <img src="https://www.ics.uci.edu/~alaird/BipedalWalker190.gif" alt="Using PPO and a laptop CPU to train a robot to walk - OpenAI BipedalWalker" style="width:100%">
      
    </div>

    <div class="polaroid">
      <div class="caption">
        <p>Reacher Arm in a lower dimensional environment<br>OpenAI RoboSchool</p>
      </div>
      <img src="https://www.ics.uci.edu/~alaird/Reacher18.gif" alt="Reacher Arm in a lower dimensional environment - OpenAI RoboSchool" style="width:100%">
     
    </div>

    <div class="polaroid">
    <div class="caption">
        <p>Robotic Arm in the Fetch Reach environment<br>OpenAI Mujoco</p>
      </div>
      <img src="https://www.ics.uci.edu/~alaird/Reacher-Solved.gif" alt="Robotic Arm in the Fetch Reach environment - OpenAI Mujoco" style="width:100%">
      
    </div>



    <p>
      Other research topics include DDQN, Ciriculum Learning, and How to Read Research Papers Effciently.
    </p>
  </div>
</div>

<style>
* {
  font-family: 'Montserrat', sans-serif;
}

#canvas {
  position: fixed;
  top: 0;
  left: 0;
}

.page {
  background-color: #d3bdb0;
  color: #715b64;
  position: relative;
  width: 50%;
  margin: 25px auto;
  text-align: center;
  padding: 1%;
  min-width: 650px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}



nav a {
  position: relative;
  display: inline-block;
  margin: 15px 15px;
  outline: none;
  color: #d3bdb0;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

nav a:hover,
nav a:focus {
  outline: none;
}

/* Effect 1: Brackets */
.cl-effect-1 {
  background-color: #69385c;
}
.cl-effect-1 a::before,
.cl-effect-1 a::after {
  display: inline-block;
  opacity: 0;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
  -moz-transition: -moz-transform 0.3s, opacity 0.2s;
  transition: transform 0.3s, opacity 0.2s;
}

.cl-effect-1 a::before {
  margin-right: 10px;
  content: '[';
  -webkit-transform: translateX(20px);
  -moz-transform: translateX(20px);
  transform: translateX(20px);
}

.cl-effect-1 a::after {
  margin-left: 10px;
  content: ']';
  -webkit-transform: translateX(-20px);
  -moz-transform: translateX(-20px);
  transform: translateX(-20px);
}

.cl-effect-1 a:hover::before,
.cl-effect-1 a:hover::after,
.cl-effect-1 a:focus::before,
.cl-effect-1 a:focus::after {
  opacity: 1;
  -webkit-transform: translateX(0px);
  -moz-transform: translateX(0px);
  transform: translateX(0px);
}

h1 {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

h2 {
  font-weight: normal;
}

h3 {
  font-weight: normal;
}

div.polaroid {
  width: 80%;
  background-color: #f5f1ed;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: relative;
  margin: 10%;
}

img {
  width: 100%;
}

div.caption {
  text-align: center;
  padding: 10px 20px;
  color: #899373;
}

.caption p {
    font-weight: 300;
}

</style>

<script>
window.onload = SnakeArt("canvas");

function SnakeArt(id) {
  var canvas = document.getElementById(id);
  var c = canvas.getContext("2d");

  c.canvas.height = window.innerHeight;
  c.canvas.width = window.innerWidth;

  var width = canvas.width;
  var height = canvas.height;

  c.fillStyle = "#f5f1ed";
  c.fillRect(0, 0, width, height);


  var color1 = "#d3bdb0";
  var color2 = "#c1ae9f";
  var color3 = "#715b64";
  var color4 = "#69385c";

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
  var snakes = [snake1, snake2, snake3, snake4];
  setInterval(function() {
    for (var i = 0; i < snakes.length; i++) {
      var dir = Rand(4);
      if (dir == 0) {
        snakes[i][1]--;
        if (snakes[i][1] < 0) {
          snakes[i][1] = yNum - 1
        }
      } else if (dir == 1) {
        snakes[i][0]++;
        if (snakes[i][0] >= xNum) {
          snakes[i][0] = 0
        }
      } else if (dir == 2) {
        snakes[i][1]++;
        if (snakes[i][1] >= yNum) {
          snakes[i][1] = 0
        }
      } else if (dir == 3) {
        snakes[i][0]--;
        if (snakes[i][0] < 0) {
          snakes[i][0] = xNum - 1
        }
      }
      var x = snakes[i][0];
      var y = snakes[i][1];

      if (board[y][x] == 0) {
        colorDict = {
          0: color1,
          1: color2,
          2: color3,
          3: color4
        };
        c.fillStyle = colorDict[i]
        c.fillRect(x * xBox, y * yBox, xBox, yBox);
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
