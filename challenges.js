/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScores,activePlayer,isGamePlaying,dice=[];
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
  if(isGamePlaying){
     dice.push(Math.floor(Math.random() * 6) + 1);
     console.log(dice[dice.length-1])
     document.querySelector('[alt="Dice"]').src='dice-'+dice[dice.length-1]+'.png';
    document.querySelector('[alt="Dice"]').style.display='block';
    if(dice[dice.length-1] != 1 && !(dice.length>1 && dice[dice.length-1]==6 && dice[dice.length-2]==6)){
      roundScore +=dice[dice.length-1];
      document.getElementById("current-"+activePlayer).textContent=roundScore;
    }
    else{
      if(dice.length>1){
        dice.shift();
      }
      scores[activePlayer]=0;
     document.querySelector("#score-"+activePlayer).textContent='0';
     nextPlayer();
    }
  }

});

  document.querySelector(".btn-hold").addEventListener('click',function(){
    if(isGamePlaying){
        scores[activePlayer]+=roundScore;
        document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];
        document.querySelector('[alt="Dice"]').style.display='none';
        var finalScore;
        if(document.querySelector('#finalScore').value){
          finalScore=document.querySelector('#finalScore').value;
        }
        else{
          finalScore=100;
        }
        console.log(finalScore)
        if(scores[activePlayer] >= finalScore){
          document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
          document.querySelector('#name-'+activePlayer).textContent='Winner!';
          document.querySelector('#name-'+activePlayer).classList.add('winner');
          document.querySelector('#current-0').textContent=0;
          document.querySelector('#current-1').textContent=0;
          isGamePlaying=false;
        }
        else{
          nextPlayer();
        }
    }

})

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  scores=[0,0];
  roundScore=0;
  activePlayer=0;
  isGamePlaying=true;
  document.querySelector('#score-0').innerHTML='0'
  document.querySelector('#current-0').textContent=0;
  document.querySelector('#score-1').textContent=0;
  document.querySelector('#current-1').textContent=0;
  document.querySelector('[alt="Dice"]').style.display='none';
  document.querySelector('#name-0').classList.remove('winner');
  document.querySelector('#name-1').classList.remove('winner');
  document.querySelector('#name-0').textContent='Player 1';
  document.querySelector('#name-1').textContent='Player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
function nextPlayer(){
  roundScore=0;
  document.getElementById("current-"+activePlayer).textContent=roundScore;
  document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
  activePlayer==0? activePlayer=1:activePlayer=0;
  document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}
