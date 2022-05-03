var randomNumber, nextElement, track = 0, levelCount = 0;
var simonElements = ["red", "yellow", "green", "blue"];

var simonSequence = [], userSequence = [];

function playSound(element) {
  var sound = new Audio("sounds/" + element + ".wav");
  sound.play();
}

function userClick(element) {
  $("." + element).addClass("animation");
  setTimeout(function() {
    $("." + element).removeClass("animation");
  }, 100);
}

$(document).keydown(function() {
  if (track === 0) {
    setTimeout(function() {
      sequence();
    }, 250);
    track++;
  }
});

function sequence() {
  levelCount++;
  randomNumber = Math.trunc(Math.random()*4);
  nextElement = simonElements[randomNumber];

  simonSequence.push(nextElement);

  $("h2").text("Level " + levelCount);

  $("."+ nextElement).addClass("flashIn");
  playSound(nextElement);
  setTimeout(function(){

    $("."+ nextElement).removeClass("flashIn");
  }, 200);
}

$("button").click(function(event) {
  var userInput = event.target.id;
  userSequence.push(userInput);
  playSound(userInput);
  userClick(userInput);
  checkSequence(userSequence.length - 1);
});

function checkSequence(checkAnswer) {
  if (userSequence[checkAnswer] === simonSequence[checkAnswer]) {
    if (userSequence.length === simonSequence.length) {
      userSequence = [];
      setTimeout(function() {
        sequence();
      }, 1000);
    }
  }
  else {
    playSound("lose");
    $("body").addClass("lost");
    setTimeout(function() {
      $("body").removeClass("lost");
    }, 100);
    $("h2").text("Game Over.. Press Any Key to Start..");
    track = 0;
    levelCount = 0;
    userSequence = [];
    simonSequence = [];
  }
}
