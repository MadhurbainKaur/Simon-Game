var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start game when key pressed for first time
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//trigger function when any btn is clicked
$(".btn").click(function(){
  //store id of that button
  var userChosenColour = $(this).attr("id");
  //add clicked colour to end of array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //pass in the index of the chosen colour
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  //check if last pattern matches last user pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check if the length is also the same
    if (userClickedPattern.length === gamePattern.length) {
      //call next sequence function after 1000 millisecs
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    //if user gets it wrong
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //reset all values
    startOver();
  }
}


//Generate random colour
function nextSequence() {
  //reset userClickedPattern to an empty array for next Level
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  //create random number between 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);
  //randomly choose colour from array
  var randomChosenColour = buttonColours[randomNumber];
  //push colour to end of gamePattern
  gamePattern.push(randomChosenColour);

  //Simulate button click effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//animate corresponding button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//play corresponding sound
function playSound(name) {
  //play appropriate sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
