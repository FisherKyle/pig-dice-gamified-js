function roll(){
  return Math.floor((Math.random() * 6) + 1);
}

function Player(name, turnTotal, gameTotal, boardSide) {
  this.playerName = name;
  this.turnTotal = turnTotal;
  this.gameTotal = gameTotal;
  this.boardSide = boardSide
}

var playerOne = new Player("one", 0, 0, "left-player");
var playerTwo = new Player("two", 0, 0, "right-player");


var activePlayer = playerOne;

$(document).ready(function(){
  $('.left-player').addClass('active');


  function swapPlayer(){
    if(active.playerName === playerOne.playerName){
      activePlayer = playerTwo;
    }
    else{
      activePlayer = playerOne;
    }
  }

  function endTurn(){
    console.log('end turn');
    if(player === 1){
      active.gameTotal += active.turnTotal;
      $('#p1-game-total').text(p1GameTotal);
      $('.right-player').addClass('active');
      $('.left-player').removeClass('active');
    }

    if(p1GameTotal >= 100){
      $('#mainDisplay').text("Congratulations player #1, you win!");
      $('#hold').prop("disabled",true);
      $('#roll').prop("disabled",true);
    }
    if(p2GameTotal >= 100){
      $('#mainDisplay').text("Congratulations player #2, you win!");
      $('#hold').prop("disabled",true);
      $('#roll').prop("disabled",true);
    }

    turnTotal = 0;
    $('#p' + player + '-combinedResults').empty();
    swapPlayer();
  }

  $('#hold').click(function(){
    endTurn();
  });

  var turnTotal = 0;
  //click button to roll die

  $('#roll').click(function(){
    console.log('player ' + player + ': ' + turnTotal);
    var result = roll();
    if (result === 1) {
      active.turnTotal = 0;
      $('#roll-result').text("You rolled a 1! Sorry!");
      endTurn();
    } else {
      active.turnTotal += result;
      $('#roll-result').text(result);
      $('#p' + player + '-combinedResults').append("<li>" + turnTotal + "</li>");
    }

  })
})
