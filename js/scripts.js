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

var activePlayer, playerOne, playerTwo;

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
  activePlayer.numRolls = 0;
  if(activePlayer.robot === true && gameOver === false){
    console.log('processing robot');
    activePlayer.processRobotTurn();
  }
}

$(document).ready(function(){
  $("#startButton").click(function(){
    $('.middleCol').show();
    $('.left-player').show();
    $('.right-player').show();
    $('#startButton').hide();

    playerOne = new Player($("#nameOne").val(), 0, 0, "left-player", false);

    if($("#nameTwo").val().length > 0){
      playerTwo = new Player($("#nameTwo").val(), 0, 0, "right-player", false);
    } else {
      playerTwo = new Player("bot", 0, 0, "right-player", true);
    }
    activePlayer = playerOne;

  })

  Player.prototype.playerRolls = function(){
      var result = roll();
      if (result === 1) {
        this.turnTotal = 0;
        $('#roll-result').text('You rolled a 1!');
        this.endTurn();
      } else {
        this.turnTotal += result;
        $('#roll-result').text(result);
        $('.' + this.boardSide + ' ul').append("<li>" + this.turnTotal + "</li>");
      }
  }

  Player.prototype.playerHolds = function(){
    this.endTurn();
  }

  Player.prototype.processRobotTurn = function(){
    setTimeout(function(){
      this.playerRolls();
      if(this != activePlayer){return;}
      setTimeout(function(){
        this.playerRolls();
        if(this != activePlayer){return;}
        setTimeout(function(){
          this.playerHolds();
        }.bind(this), 300);
      }.bind(this),300);
    }.bind(this),300);
  }

  $('.left-player').addClass('active');

  $('#replay').click(function() {
    location.reload();
  });

  Player.prototype.endTurn = function(){

    this.gameTotal += this.turnTotal;
    $("." + this.boardSide + " h2 .game-total").text(this.gameTotal);
    $("." + this.boardSide).removeClass('active');

    if(this.gameTotal >= 100){
      gameOver = true;
      var victoryText;
      if(this.robot){
        victoryText = "Good job, you got beat by a dumb robot that has four lines of code...";
      } else {
        victoryText = "Congratulations player " + this.playerName + ", you win!"
      }
      $('#winning').text(victoryText);
      // $('#hold').prop("disabled",true);
      // $('#roll').prop("disabled",true);
      $('#replay').show();
    }

    $('.' + this.boardSide + ' ul').empty();
    this.turnTotal = 0;
    swapPlayer();
    $("." + activePlayer.boardSide).addClass('active');
  }

  $('#hold').click(function(){
    activePlayer.endTurn();
  });

  $('#roll').click(function(){
    activePlayer.playerRolls();
  })
})
