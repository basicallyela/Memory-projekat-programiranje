const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let score = 0;

//timer

"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => startGame();
document.form_main.refresh.onclick = () => refresh();

function start() {
  clearInterval(cron);
  cron = setInterval(() => { timer(); }, 10);
}


function reset() {
  clearInterval(cron);
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}


//exit timer

function flipCard(e){
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDeck){
       clickedCard.classList.add("flip");
       if(!cardOne){
        return cardOne = clickedCard;
       } 
       cardTwo = clickedCard;
       disableDeck = true;
       let cardOneImg = cardOne.querySelector("img").src,
       cardTwoImg = cardTwo.querySelector("img").src;
       matchCards(cardOneImg, cardTwoImg);
    } 
    
    
    
}
function matchCards(img1, img2){
    if(img1 === img2){
        matchedCard++;
        score+=10;
        document.getElementById('score').innerText = returnData(score);
        if(matchedCard==8){
            setTimeout(()=> {
            return shuffleCard();
                
            }, 1000);
            reset();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard); 
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
    
}
function shuffleCard(){
    score = 0;
    document.getElementById('score').innerText = returnData(score);
    matchedCard = 0;
    cardOne = cardTwo = "";
    let lista =[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    lista.sort(()=> Math.random() >0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `img-${lista[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}




function refresh(){
    score = 0;
    document.getElementById('moves').innerText = returnData(moves);
    shuffleCard();
    reset();
}

function startGame(){
    shuffleCard();
    disableDeck = false;
    cards.forEach(card => {
        card.addEventListener("click", flipCard);

});
    start();
}

//start game
disableDeck = true;




