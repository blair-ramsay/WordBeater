window.addEventListener('load', init);

// Difficulty levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

// Change level
var currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;
let countdownInterval;
let statusInterval;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const highScoreDisplay = document.querySelector('#highscore');
const title = document.querySelector('#title');

//Typed.js stuff
var options = {
  strings: ["WordBeater"],
  typeSpeed: 100,
  cursorChar: "|"
}

var typed = new Typed(title, options);

// Initialise the game
function init(){
  // Display the correct time for the level
  seconds.innerHTML = currentLevel;
  startButton.addEventListener('click', startGame);
  //Display the high score from local storage
  highScoreDisplay.innerHTML = localStorage.getItem("highScore");
}

function startGame(){
  isPlaying = true;
  time = currentLevel;
  scoreDisplay.innerHTML = score;
  //Make Start Button Invisible
  startButton.style.visibility = "hidden";
  //Set focus to the input box
  wordInput.focus();
  // Load word from the array
  showWord(words);
  // Start ckecking word input
  wordInput.addEventListener('input', checkInput);
  // Call countdown every second
  countdownInterval = setInterval(countdown, 1000);
  // Check game status
  statusInterval = setInterval(checkStatus, 50);
}

// Start Match
function checkInput(){
  console.log("Check Input Called");
  if(matchWords()){
    isPlaying = true;
    time = currentLevel + 1; //Reset the timer
    showWord(words); //Show a new word
    wordInput.value = ''; //Reset the input box
    score++; //Add to the score
  }
  if(score === 0){
    scoreDisplay.innerHTML = 0;
  }
  else{
    scoreDisplay.innerHTML = score;
  }

}

// Match current word to the users input
function matchWords(){
  if(wordInput.value === currentWord.innerHTML){
    return true;
  }
  else{
    message.innerHTML = "";
    return false;
  }
}

// Get a random word from the array and show it
function showWord(words){
  // Generate a random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output a random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown(){
  // Check if time has run out
  if(time > 0){
    time--;
  }
  else if(time === 0){
    isPlaying = false;
  }
  // Display time
  timeDisplay.innerHTML = time;
}

// Check the game satus
function checkStatus(){
  if(!isPlaying && time === 0){
    console.log("Game Over");
    message.innerHTML = 'Game Over!';
    storeScore();
    score = 0;
    startButton.style.visibility = "visible";
    clearInterval(countdownInterval);
    clearInterval(statusInterval);
  }
}

function storeScore(){
  let highScore = localStorage.getItem("highScore");
  if(highScore === null || highScore < score){
    localStorage.setItem("highScore", score);
    highScoreDisplay.innerHTML = localStorage.getItem("highScore");
  }
}

function updateDifficulty(){
  if(document.querySelector('#diff_easy').checked){
    currentLevel = levels.easy;
  }else if(document.querySelector('#diff_med').checked){
    currentLevel = levels.medium;
  }else if(document.querySelector('#diff_hard').checked){
    currentLevel = levels.hard;
  }
  seconds.innerHTML = currentLevel;
}
