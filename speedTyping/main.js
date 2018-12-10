window.addEventListener('load', init);

const levels = {
    easy: 8,
    medium: 5,
    hard: 2
}

const btnStart = document.querySelector('#start-game');
const currentWord = document.querySelector('#current-word');
const inputField = document.querySelector('#word-input');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const difficulty = document.querySelector('#difficulty');
const statDisplay = document.querySelector('#stats');
const leadtext = document.querySelector('p.lead');
const optionsList = document.querySelectorAll('option');
const words = [];
const countdownInterval = setInterval(countdown, 1000);

let currentLevel;
let time = currentLevel;
let score = 0;
let isPlaying = false;
let timeOver = false;

btnStart.addEventListener('click', startGame);
difficulty.addEventListener('input', selectDifficulty);

function init(){
    $.getJSON( "words.json", function( data ) {
        $.each(data, function (index, word) {
            words.push(word); 
        });
    });
    stats.style.display = "none";
    leadtext.style.display = "none";
}

function selectDifficulty(){
    currentLevel = levels[difficulty.value];
    btnStart.removeAttribute("disabled");
    seconds.innerHTML = currentLevel;
    leadtext.style.display = "";
}

function initNewGame(){
    inputField.value = '';
    message.innerHTML = ''
    time = currentLevel + 1;
    isPlaying = true;
    timeOver = false;
    stats.style.display = "";
    inputField.removeAttribute("disabled");
    inputField.focus();
    score = 0;
    scoreDisplay.innerHTML = score;
}

function startGame(){
    initNewGame();
    randomWord();
    inputField.addEventListener('input', matchController);
    //call countdown every sec
    countdownInterval;
    //check game status
    setInterval(checkStatus, 50);
}

function matchController(){
    if(checkWord()){
        time = currentLevel + 1;
        randomWord();
        inputField.value = '';
        score++;
    }
    scoreDisplay.innerHTML = score;
}

//put random word to the screen
function randomWord(){
    currentWord.innerHTML = words[Math.floor(Math.random() * words.length)];
}

//check word
function checkWord(){    
    if(inputField.value == currentWord.innerHTML){
        message.innerHTML = 'Correct!';
        return true;
    }else{
        message.innerHTML = '';
        return false;
    }
}

//countdown timer
function countdown(){
    if(time > 0){
        time--;
        btnStart.setAttribute("disabled", "");
        optionsList.forEach((option) => {
            option.setAttribute("disabled","");
        });
    }else{
        isPlaying = false;
        inputField.setAttribute("disabled", "");
    }

    timeDisplay.innerHTML = time;
    
}

function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!';
        timeOver = true;
    }
    if(timeOver){
        btnStart.removeAttribute("disabled");
        optionsList.forEach((option) => {
            option.removeAttribute("disabled");
        });
    }
}
