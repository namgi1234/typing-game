let gameTime = 10;
let score = 0;
let time = gameTime;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words =  [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('start game');
    getWords();
    wordInput.addEventListener('input',checkMatch);
}

function run (){
    isPlaying = true;
    if (!isPlaying){
        return;
    }
    buttonChange('playing game');
    time = gameTime;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText= score;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 1);
} 

function checkStatus(){
    if (!isPlaying && time === 0) {
        buttonChange('start game')
        clearInterval(checkInterval)
    }
}

function getWords(){
        axios.get('https://random-words-api.herokuapp.com/w?n=100')
        .then(function (response) {
        words = response.data
            buttonChange('start game');
        })
        .catch(function (error) {
    // handle error
             console.log(error);
  })
} 

//단어 체크
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value= ""; 
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText =  score;
        time = gameTime;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
} 

function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}


function buttonChange(text) {
    button.innerText = text;
    text === 'start game' ? button.classList.remove('loading') : button.classList.add('loading')
}

function iseasyMode() {
    if(isPlaying){
        return;
    }
    timeDisplay.innerText = 10
    gameTime = 10
}

function ishardMode() {
        if(isPlaying){
        return;
    }
    timeDisplay.innerText = 3
    gameTime = 3
}

function ismediumMode() {
        if(isPlaying){
        return;
    }
    timeDisplay.innerText = 5
    gameTime = 5
}
