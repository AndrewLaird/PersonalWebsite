<?php
    require("../snakeBackground/Background.php");
    require("../header/header.php");
?>
<link rel="stylesheet" href ="../header/header.css" >
<script src='../snakeBackground/Background.js'></script>
<link rel='stylesheet' href='../snakeBackground/Background.css' >
<link rel="stylesheet" href ="./projects.css" >

<div class='page'>
    <div class="Content">

    <div class="polaroid">
     <div class="caption">
        <p>AlphaZero TicTacToe
            </br>Github repo: https://github.com/AndrewLaird/alpha_tictactoe</br>
            </br>Applied Deepmind's AlphaZero Reinforcement Learning algorithm to learn tictactoe from scratch. This is overkill but I wanted to dive into the AlphaZero algoritm without requiring a huge amount of computational power
        </p>
      </div>
        <div class="caption">
          <p>Video presentation I did in 2020 for UCI's AI club</p>
        </div>
        <iframe width="420" height="315" src="https://www.youtube.com/embed/axSM-YMa4RU">
        </iframe>
    </div>

    <div class="polaroid">
     <div class="caption">
        <p>PPO
        </br>Github repo: https://github.com/AndrewLaird/AI_Club_PPO </br>
        </br>Similar to AlphaZero, I wanted to look into the Proximal Policy Optimization (PPO) reinforcement learning algorithm. What is significant about PPO is how fast it learns to play games. I trained the AI below on a laptop computer in about an hour. Alot of the popular reinforcement learning algorithms before this focused on predicting how good -- based on received reward-- to be in a specific state of the environment. PPO and other Policy Optimization algorithms focus just on predicting a policy that maximizes the received reward. Because of this they are less robust and explainable but solve certain problems much better. 
        </p>
      </div>
      <img src="./BipedalWalker2.gif"  alt="BipdealWalker" style="width:100%">
        <div class="caption">
          <p>Video presentation I did in 2019 for UCI's AI club</p>
        </div>
        <iframe width="420" height="315" src="https://www.youtube.com/embed/YjAKEGXYf_s">
        </iframe>
      
    </div>

    <div class="polaroid">
     <div class="caption">
        <p>Google Irvine's Tech Challenge
        </br>This was a fantastic opportuniy, Google invited teams of college students to compete over tiny challenges, some programming, some logic puzzles, some that required pop culture knowledge. It was a day of solving problems and working as a team to use each persons strengths. Our team solved the most challenges and won the competition but the real reward was just being in that room and having fun being computer science students  </p>
      </div>
      <img src="./GoogleIrvine.jpeg"  alt="Google Irvine image" style="width:100%">
      
    </div>

    <div class="polaroid">
     <div class="caption">
        <p>Ragan Lab:
        </br>I left INRF because I wanted to learn more about machine learning. I found a grad student that was working on his PhD in Material Science. William Thrift was an amazing mentor and introduction to machine learning. We had a goal of what we wanted for the paper he was working on, but we were both learning how to achieve that goal and I learned a lot of the basics from talking back and forth with him. The paper that I and a couple of other undergraduates helped him write ended being published in ACS Sensors. Which makes me a published author, this was a fun benefit but what I got from working in the Ragan Lab was tons of knowledge about machine learning that would help me learn more on my own. Below is the image from the abstract of that paper</p>
      </div>
      <img src="./RaganACS.gif"  alt="Picture from acs paper"  style="width:100%">
      
    </div>

    <div class="polaroid">
     <div class="caption">
        <p>INRF:
        </br>During my first year at UCI I was incredibly fortunate to find a lab that needed fullstack work done and had the time to let me learn. I worked with one software developer and a lab full of engineers to provide meaningful information. Technicians would create circuits in this lab and the process of doing that is very inconsistent. To help them understand why their experiments were failing, I built a system that measured the climate in the lab at any particular moment. So they could look back and see if the lab spiked out of reasonable conditions during their experiment. One of the best parts of this project was the lack of direction, we had a final goal but other than that, I was given a budget and blank desktop computer. So I installed linux on the computer and went to work making a network of raspberry pi's to measure the climate and report it to the main server. From there I made the API public and a more senior engineer took that data and integrated it into the interface you see below. The second picture is the raspberry pi's before they were installed</p>
      </div>
      <img src="./inrf_temp_humid.gif"  alt="gif showing inrf system" style="width:100%">
      <img src="./raspberryPi.jpg"  alt="gif showing inrf system" style="width:100%">
      
    </div>


</div>
