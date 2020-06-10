
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800" rel="stylesheet">
<div id="background">
  <canvas id="canvas" width="100%" height="100%">
    </canvas>
</div>

<?php
    $path = './PersonalWebsite';
    include($path . "/header/header.php");
?>
<link href = <?echo $path. "/splash/SplashScreen.css"?> rel="stylesheet">

  <div id="Content">


    <h1> Reinforcement Learning </h1>

    <h3>
      Quarter Long Research Project in Reinforcement Learning <br/>towards the goal of a self learning robotic arm
    </h3>
    <div class="polaroid">
     <div class="caption">
        <p>Using PPO and a laptop CPU to train a robot to walk<br>OpenAI BipedalWalker</p>
      </div>
      <img src=<?php echo $path. "/splash/BipedalWalker190.gif" ?> alt="Using PPO and a laptop CPU to train a robot to walk - OpenAI BipedalWalker" style="width:100%">
      
    </div>

    <div class="polaroid">
      <div class="caption">
        <p>Reacher Arm in a lower dimensional environment<br>OpenAI RoboSchool</p>
      </div>
      <img src=<?php echo $path. "/splash/Reacher18.gif" ?> alt="Reacher Arm in a lower dimensional environment - OpenAI RoboSchool" style="width:100%">
     
    </div>

    <div class="polaroid">
    <div class="caption">
        <p>Robotic Arm in the Fetch Reach environment<br>OpenAI Mujoco</p>
      </div>
      <img src=<?php echo $path."/splash/Reacher-Solved.gif"?> alt="Robotic Arm in the Fetch Reach environment - OpenAI Mujoco" style="width:100%">
      
    </div>



    <p>
      Other research topics include DDQN, Ciriculum Learning, and How to Read Research Papers Effciently.
    </p>
  </div>
</div>
<!--- make room for the picture to be seen -->
<div class="fullscreen">
content
</div>


<script src=<?php echo $path.'/splash/SplashScreen.js'; ?>></script>
