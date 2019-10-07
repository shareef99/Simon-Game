var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;
//runing the nextSequence
$(document).keydown(function () {
//start nextSequence only ones
  if (!started){
    // changing the title
    $("#level-title").text("level " + level);
    //calling nextSequence
    nextSequence();

    started = true;
  }
});

$(".btn").click( function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //playing sound when button is pressed
  playSound(userChosenColour);
  //showing animation when button is pressed
  animatePress(userChosenColour);
  //calling checkAnswer
  checkAnswer(userChosenColour.length-1);
});

//making a function to check the answer of the user
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
//
function startOver(){
  var level = 0;
  var gamePattern = [];
  var started = false;
}
function nextSequence(){
  userClickedPattern = [];
    //incrizing the level
  level++;
  $("h1").text("level " + level);
  // generating random number
  var randomNumber = Math.floor(Math.random()*4);
  // picking random color using random number
  var randomChosenColour = buttonColours[randomNumber];
  // pushing random color into empty gamePattern array
  gamePattern.push(randomChosenColour);
  //adding animation to chosen color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // playing sound
  playSound(randomChosenColour);
}

// creating a function which will play sounds accourding to button pressed
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// creating a function which will show animation when button is pressed
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
}
