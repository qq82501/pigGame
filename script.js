'use strick';

//Select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore, activedPlayer, score, playing;

const init = function () {
  playing = true;
  diceEl.classList.add('hidden');
  currentScore = 0;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  activedPlayer = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const changePlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activedPlayer}`).textContent =
    currentScore;
  activedPlayer = activedPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll dice functionality
const rollHandler = function () {
  if (playing) {
    //1. Roll dice and get its value
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Show the dice imag accordingly
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //3 if dice value !== 1, add the value to current score of relatvely player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activedPlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
};

//Hold score functionality
const holdHandler = function () {
  if (playing) {
    //1. calculate score
    score[activedPlayer] += currentScore;
    document.querySelector(`#score--${activedPlayer}`).textContent =
      score[activedPlayer];

    //2. if score >= 40 , the player won, and game stop.
    if (score[activedPlayer] >= 10) {
      //adding winner style
      document
        .querySelector(`.player--${activedPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activedPlayer}`)
        .classList.remove('player--active');
      //disable buttons of roll and hold
      /* #### By adding "playing" state at the begining of rollHandler & holdHandler, 
              which has a same effect as removeEventListener below does.
              Using state to control is a better solution rathan keeps enabling /disabling the eventListener,
              the later will consumes more recourse and delay the app.
      */
      playing = false;
      // btnRoll.removeEventListener('click', rollHandler);
      // btnHold.removeEventListener('click', holdHandler);
      diceEl.classList.add('hidden');
    } else {
      changePlayer();
    }
  }
};

init();
btnRoll.addEventListener('click', rollHandler);
btnHold.addEventListener('click', holdHandler);
btnNew.addEventListener('click', init);

//############### My try for changing active player with object and For-Loop ################
/* Why is Jonas's method better? 
        1. More efficent:
            In this case, only has 2 players. When I tried to use For-loop to solve changing actived-player,
            the loop will execute no matter player is actived or not, so every time loop execute (a loop will run twice, because of 2 players. also, the more players, the more times a loop has to run), there must be one wastful running. By using Jonas's method, it's more straightfoward. 
              
  /*
#1. store elements in array of objects
const players = [
  {
    player: player0El,
    currentScore: currentScore0El,
    score: score0El,
  },
  {
    player: player1El,
    currentScore: currentScore1El,
    score: score1El,
  },
];
#2. create an function which controls to change active player
  const changePlayer = function (dice, i) {
    if (dice === 1) {
      currentScore = 0;
      players[i].currentScore.textContent = currentScore;
      players[i].player.classList.remove('player--active');
      if (i < players.length - 1) {
        i++;
        players[i].player.classList.add('player--active');
        return i;
      } else {
        players[i].player.classList.remove('player--active');
        i = 0;
        players[i].player.classList.add('player--active');
        return i;
      }
    }
  };

#3 use For-Loop to check which player has been actived
  for (let i = 0; i < players.length; i++) {  
    if (players[i].player.classList.contains('player--active')) {
      if (dice !== 1) {
        currentScore += dice;
        players[i].currentScore.textContent = currentScore;
      } else i = changePlayer(dice, i);
    }
  }
*/
