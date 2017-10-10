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
    <a href = "https://www.linkedin.com/in/andrew-laird-a814b8134">(Linkedin)</a>
    <a href = "http://poems.calit2.uci.edu/about">(Projects)</a>
    <a href = "http://www.codepen.io/LairdAndrew">(CodePen)<a>
    
    
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
var board = [];
window.onload = SnakeArt("canvas");

window.onbeforeunload = closing_save();

function SnakeArt(id) {
  startup_load();
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

  var xNum = Math.floor(width / 10);
  var yNum = Math.floor(height / 10);
  var xBox = width / xNum;
  var yBox = height / yNum;
  //var board = [];
  for (y = 0; y < yNum; y++) {
    board[y] = [];
    for (x = 0; x < xNum; x++) {
      board[y][x] = 0;
    }
  }

  c.lineWidth = 1;

 
  var snake1 = [Rand(xNum), Rand(yNum)];
  var snake2 = [Rand(xNum), Rand(yNum)];
  var snake3 = [Rand(xNum), Rand(yNum)];
  var snake4 = [Rand(xNum), Rand(yNum)];
  var snake5 = [Rand(xNum), Rand(yNum)];
  var snake6 = [Rand(xNum), Rand(yNum)];
  var snake7 = [Rand(xNum), Rand(yNum)];
  var snake8 = [Rand(xNum), Rand(yNum)];
  var snakes = [snake1, snake2, snake3,snake4,snake5,snake6,snake7,snake8];
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
        colorDict = {0:color1,1:color2,2:color3,3:color4,4:color1,5:color2,6:color3,7:color4};
        c.fillStyle =colorDict[i]
        c.fillRect(x * xBox, y * yBox, xBox, yBox );
        board[y][x] = i;
      }
    }
    //does this every 50 miliseconds
  }, 50);
}

//setting up closing script
function closing_save(){
  //realizing its hard to store the whole game board in a cookie
  var json_board = JSON.stringify(board);
  window.localStorage.setItem('board',json_board);
  console.log(window.localStorage.getItem("board"))
  return 0
}

//loading the json_board
function startup_load(){

  json_board = JSON.parse(window.localStorage.getItem("board"));
  console.log(json_board);
  return 0;
}



function Rand(num) {
  return Math.floor(Math.random() * num);
}

// function createCookie(name,value,days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + value + expires + "; path=/";
// }

// function readCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

// function eraseCookie(name) {
//     createCookie(name,"",-1);
// }

</script>