function roll(){
  return Math.floor((Math.random() * 6) + 1);
}

$(document).ready(function(){
  $('.left-player').addClass('active');
  var player;
  player = 1;

  function swapPlayer(){
    if(player === 1){
      player = 2;
    }
    else{
      player = 1;
    }
  }

  var p1GameTotal = 0;
  var p2GameTotal = 0;

  function endTurn(){
    console.log('end turn');
    if(player === 1){
      p1GameTotal += turnTotal;
      $('#p1-game-total').text(p1GameTotal);
      $('.right-player').addClass('active');
      $('.left-player').removeClass('active');
    }
    else if(player === 2){
      p2GameTotal += turnTotal;
      $('#p2-game-total').text(p2GameTotal);
      $('.right-player').removeClass('active');
      $('.left-player').addClass('active');
    }

    if(p1GameTotal >= 100){
      $('#mainDisplay').text("Congratulations player #1, you win!");
    }
    if(p2GameTotal >= 100){
      $('#mainDisplay').text("Congratulations player #2, you win!");
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
      turnTotal = 0;
      $('#roll-result').text("You rolled a 1! Sorry!");
      endTurn();
    } else {
      turnTotal += result;
      $('#roll-result').text(result);
      $('#p' + player + '-combinedResults').append("<li>" + turnTotal + "</li>");
    }

  })
})
