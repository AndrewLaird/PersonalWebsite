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
        <span class='bolder'>Chess Detector </span> - <a href="http://chessdetector.com">ChessDetector.com </a>
        <hr>
        <p class="left">
            Takes images of chess boards and ouptuts the chessboards in a format that the major chess websites understand. The goal of this project was to add something to the wonderful chess community. I got into chess when queens gambit came out like everyone else. I was surprised by how much video content there was to help anyone become a better player. This tool allows those videos to be even more helpful. A learner can take a position from a video they are watching and deep dive into it using one of the chess analyzers such as lichess or Chess.com. This project was fun for me because I was able to use my ai skills in a real world context and learn React while I was at it.
        </p>
      </div>
        <div class="caption">
          <p>Here's the model running on a dificult image with lots of arrows obstructing the pieces</p>
        </div>
      <img src="./ChessDetector.png"  alt="ChessDetector" style="width:100%">
    </div>

    <div class="polaroid">
     <div class="caption">
        <p><span class='bolder'>Keyboard</span>
        <hr>
	      <img src="./GlamorKeyboard.jpg"  alt="Keyboard" style="width:50%" align='left'>
	</p>
	<p class="left">
I built a handwired split ergonomic keyboard. Keyboards like this have been popping up in the last 5 years after a talk by Matt Adereth <a href="https://www.youtube.com/watch?v=uk3A41U0iO4&ab_channel=ClojureTV">(link)</a>.  Below is what the underside looks like. It was a mess of soldering at all sorts of weird angles but after a couple sessions, I got the whole keyboard working. I respect that this keyboard is a silly but its really fun to do your work on something that you built yourself. And the added benifit of being able to use QMK firmware and all of it's functionality makes me never want to go back.
	</p>
      </div>
      <img src="./HandWiredKeyboard.jpg"  alt="HandWiredKeyboard" style="transform:rotate(270de); width:100%; ">
    </div>

    <div class="polaroid">
     <div class="caption">
        <p><span class='bolder'>AlphaZero TicTacToe - </span>
        <a href="https://github.com/AndrewLaird/alpha_tictactoe">Github repo</a>
        <hr>
         </p>
         <p class="left">
            Applied Deepmind's AlphaZero Reinforcement Learning algorithm to learn tictactoe from scratch. This is overkill but I wanted to dive into the AlphaZero algoritm without requiring a huge amount of computational power
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
        <p><span class='bolder'>PPO - </span>
        <a href="https://github.com/AndrewLaird/AI_Club_PPO">Github repo</a>
        <hr>
         </p>
         <p class="left">
        I wanted to look into the Proximal Policy Optimization (PPO) reinforcement learning algorithm. What is significant about PPO is how inexpensive it is to train in comparision to the previous algorithms. I trained the AI below on a laptop computer in about an hour. A lot of the popular reinforcement learning algorithms before this focused on predicting how good -- based on received reward-- to be in a specific state of the environment. PPO and other Policy Optimization algorithms focus just on predicting a policy that maximizes the received reward. Because of this they are less robust and explainable but solve certain problems much better. 
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
        <p><span class='bolder'>Google Irvine's Tech Challenge</span>
        <hr>
	</p>
	<p class="left">
		This was a fantastic opportunity; Google invited teams of college students to compete over tiny challenges, some programming, some logic puzzles, some that required pop culture knowledge. It was a day of solving problems and working as a team to use each persons' strengths. Our team solved the most challenges and won the competition, but the real reward was just being in that room and having fun being computer science students.
        </p>
      </div>
      <img src="./GoogleIrvine.jpeg"  alt="Google Irvine image" style="width:100%">
      
    </div>

    <div class="polaroid">
     <div class="caption">
        <p><span class='bolder'>Ragan Lab</span>
        <hr>
	</p>
	<p class="left">
        I left INRF because I wanted to learn more about machine learning. I found a grad student that was working on his PhD in Material Science. William Thrift was an amazing mentor and introduction to machine learning. We had a goal of what we wanted for the paper he was working on, but we were both learning how to achieve that goal and I learned a lot of the basics from talking back and forth with him. The paper that I and a couple of other undergraduates helped him write was published in ACS Sensors. What I got from working in the Ragan Lab was tons of knowledge about machine learning that would help me learn more on my own. Below is an image from the abstract of that paper depicting our process. </p>
      </div>
      <img src="./RaganACS.gif"  alt="Picture from acs paper"  style="width:100%">
      
    </div>

    <div class="polaroid">
     <div class="caption">
        <p><span class='bolder'>INRF</span>
        <hr>
	</p>
	<p class="left">
        During my first year at UCI I was incredibly fortunate to find a lab that needed fullstack work done and had the time to let me learn. I worked with one software developer and a lab full of engineers to provide meaningful information. Technicians would create circuits in this lab and the process of doing that is very inconsistent. To help them understand why their experiments were failing, I built a system that measured the climate in the lab at any particular moment. So they could look back and see if the lab spiked out of reasonable conditions during their experiment. One of the best parts of this project was the lack of direction; we had a final goal but other than that, I was given a budget and blank desktop computer. So, I installed Linux on the computer and went to work making a network of raspberry Pi's to measure the climate and report it to the main server. From there I made the API public and a more senior engineer took that data and integrated it into the interface you see below. The second picture is the raspberry Pi's before they were installed. </p>
      </div>
      <img src="./inrf_temp_humid.gif"  alt="gif showing inrf system" style="width:100%">
      <img src="./raspberryPi.jpg"  alt="gif showing inrf system" style="width:100%">
      
    </div>


</div>
