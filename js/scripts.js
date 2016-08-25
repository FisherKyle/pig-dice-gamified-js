function roll(){
  return Math.floor((Math.random() * 6) + 1);
}

function Player(name, turnTotal, gameTotal, boardSide, robot) {
  this.playerName = name;
  this.turnTotal = turnTotal;
  this.gameTotal = gameTotal;
  this.boardSide = boardSide;
  this.robot = robot;
}


var playerOne = new Player("Peter", 0, 0, "left-player", false);
var playerTwo = new Player("Kyle", 0, 0, "right-player", true);

var activePlayer = playerOne;

var gameOver = false;

function swapPlayer(){
  console.log('swapping player');
  if(activePlayer.playerName === playerOne.playerName){
    activePlayer = playerTwo;
  }
  else{
    activePlayer = playerOne;
  }
  console.log('active player is ' + activePlayer.playerName);

  if(activePlayer.robot === true && gameOver === false){
    console.log('processing robot');
    activePlayer.processRobotTurn();
  }
}

$(document).ready(function(){

  function playerRolls(){
    console.log('player ' + activePlayer.playerName + ' rolls')
    var result = roll();
    console.log('roll result was ' + result);
    if (result === 1) {
      console.log(activePlayer.playerName + ' rolled 1')
      activePlayer.turnTotal = 0;
      $('#roll-result').text("You rolled a 1! Sorry!");
      endTurn();
    } else {
      activePlayer.turnTotal += result;
      $('#roll-result').text(result);
      $('.' + activePlayer.boardSide + ' ul').append("<li>" + activePlayer.turnTotal + "</li>");
    }
  }

  function playerHolds(){
    endTurn();
  }

  Player.prototype.processRobotTurn = function(){
    playerRolls();
    if(activePlayer.playerName === this.playerName){
      playerRolls();
    }
    if(activePlayer.playerName === this.playerName){
      playerHolds();
    }
  }

  $('.left-player').addClass('active');

  $('#replay').click(function() {
    location.reload();
  });

  function endTurn(){

    activePlayer.gameTotal += activePlayer.turnTotal;
    $("." + activePlayer.boardSide + " h2 .game-total").text(activePlayer.gameTotal);
    $("." + activePlayer.boardSide).removeClass('active');

    if(activePlayer.gameTotal >= 100){
      gameOver = true;
      var victoryText;
      if(activePlayer.robot){
        victoryText = "Good job, you got beat by a dumb robot that has four lines of code...";
      } else {
        victoryText = "Congratulations player " + activePlayer.playerName + ", you win!"
      }
      $('#winning').text(victoryText);
      // $('#hold').prop("disabled",true);
      // $('#roll').prop("disabled",true);
      $('#replay').show();
    }

    $('.' + activePlayer.boardSide + ' ul').empty();
    activePlayer.turnTotal = 0;
    swapPlayer();
    $("." + activePlayer.boardSide).addClass('active');
  }

  $('#hold').click(function(){
    endTurn();
  });

  $('#roll').click(function(){
    playerRolls();
  })
})
