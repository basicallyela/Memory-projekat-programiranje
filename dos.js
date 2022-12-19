const cards = document.querySelectorAll(".card");

let matchedCard = 0; //karte koje se slazu
let cardOne, cardTwo; //prva i druga kartica
let disableDeck = false; //onemoguci spil
let score = 0; //bodovi

//"use strict";
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => startGame();
document.form_main.refresh.onclick = () => refresh();

//starta tajmer
function start() {
  clearInterval(cron);
  cron = setInterval(() => { timer(); }, 10);
}

//reseta sve vrijednosti na 00
function reset() {
  clearInterval(cron);
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}


//broji vrijeme tako sto prvo broji milisekunde, a zatim ispisuje sekunde i minute
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

//kad su sekunde u jedinicama da pise npr 01 umjesto samo 1
function returnData(input) {
  return input >= 10 ? input : `0${input}`
}


//okrece kartice 
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

//uporedjuje da li su prva kartica i druga kartica jednake
//ako jesu povecava score
//ako nisu trese ih i okrece
//ako su sve matchane onda se deck gasi i igra se restartuje
function matchCards(img1, img2){
    if(img1 === img2){
        matchedCard++;
        score+=10;
        document.getElementById('score').innerText = returnData(score);
        if(matchedCard==8){
          moj.pause();
          disableDeck=true;
            setTimeout(()=> {
            return shuffleCard();
            
            }, 4500);
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

//mijesa kartice tako sto im dodjeljuje broj u nizu i koristeci random() ih postavlja na pozicije
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



//ponovno mijesa kartice, reseta vrijeme i score, zahtijeva ponovno pritiskanje starta
function refresh(){
  moj.pause();
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
    });
    disableDeck = true;
    shuffleCard();
    reset();
    score = 0;
    
    document.getElementById('score').innerText = returnData(score);
    
    
    
}
//pusta muziku
function addSound(){
  moj = new Audio('muzikica.mp3'); 
  if (typeof moj.loop == 'boolean')
  {
      moj.loop = true;
  }
  else
  {
      moj.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
  }
  moj.play();
}


//zapocinje igru, okrece karte i mijesa ih
function startGame(){
    addSound();
    shuffleCard();
    disableDeck = false;
    cards.forEach(card => {
        card.addEventListener("click", flipCard);

});
    start();
}

//start igrice, ne moze se nista prije nego sto se start klikne
disableDeck = true;



//prevod varijabli za one koji ne znaju engleski (-S.B.)
//
