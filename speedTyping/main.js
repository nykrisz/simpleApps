window.addEventListener('load', init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

const currentLevel = levels.easy;

const currentWord = document.querySelector('#current-word');
const inputField = document.querySelector('#word-input');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');

let time = currentLevel;
let score = 0;
let isPlaying;

const words = []; // create array here    
function getWords(){
    $.getJSON( "words.json", function( data ) {
        $.each(data, function (index, word) {
            words.push(word); //push values here
        });
        // console.log(words); // see the output here
    });
}

//init 
function init(){
    getWords();
    //show number of seconds
    seconds.innerHTML = currentLevel;
    //load random word
    randomWord();
    //
    inputField.addEventListener('input', matchController);
    //call countdown every sec
    setInterval(countdown, 1000);
    //check game status
    setInterval(checkStatus, 50);
}

function matchController(){
    if(checkWord()){
        isPlaying =  true;
        time = currentLevel + 1;
        randomWord();
        inputField.value = '';
        score++;
    }

    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;
    }
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
    }else{
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!'
        score = -1;
    }
}
