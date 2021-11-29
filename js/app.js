function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//element
const deck = document.querySelector("#deck");
const moves = document.querySelector("#moves");
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const cardToShuffle = document.querySelectorAll("#deck li");
const heart = document.querySelectorAll("#heart li");

// varible
let time = 0;
let timerId = 0;
let timeOut = true;
let openCards = [];
let movesCounter = 0;
let match = 0;
let arr = Array.from(cardToShuffle);


reShuffle();
//functions

const initClock = () =>{
    timeOut = false;
    timerId = setInterval(() => {
        time++;
        timerCount();
        }, 1000);
}

const timerCount = () =>{
    const min = Math.floor(time/60);
    const sec = time % 60;
    if(sec <10){
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
}
const stopClock = () =>{
    clearInterval(timerId);
}

function reShuffle(){
    let shuffled = shuffle(arr);
    for(let item of shuffled){
        deck.appendChild(item);
    }
}

function validClick(click){
    return click.classList.contains("card")&&!click.classList.contains("match")&&!openCards.includes(click)&&openCards.length<2;

}

function toggleCard(card){
    card.classList.toggle("open");
}

function pushCard(card){
    openCards.push(card);
}

function checkMatch(){
    if(openCards[0].children[0].className == openCards[1].children[0].className){
        openCards[0].classList.toggle("match");
        openCards[1].classList.toggle("match");
        openCards = []
        match++;
        if (match == 8){
            setTimeout(()=>{
                alert("Win");
            }, 500)
        }
    }else{
        setTimeout(()=> {
            openCards[0].classList.toggle("open");
            openCards[1].classList.toggle("open");
            openCards = []
        }, 500);
        
    }
}

function addMove(){
     movesCounter++;
     moves.innerHTML = movesCounter;
}

function removeStars(){
   // heart.classList.toggle("bi-heart-fill");
   if(movesCounter == 8){
       heart[0].getElementsByClassName.display = "none"
   }
   if(movesCounter == 16){
    heart[1].getElementsByClassName.display = "none"
}
if(movesCounter == 24){
    heart[2].getElementsByClassName.display = "none"
}
}

function resetStars(){
    for(let star of heart ){
        if(star.style.display == "none"){
            star.style.display = "inline"
        }
    }
}

// event listeners

deck.addEventListener('click', function(event){
    target = event.target;
    if(validClick(target))
    {
    if(timeOut == true){
        initClock(); 
    }
    toggleCard(target);
    pushCard(target);
    if(openCards.length == 2){
        checkMatch();
        addMove();
       // if(movesCounter == 8 || movesCounter == 24){
        //   removeStars();
       // }
        if(movesCounter >= 8 && match < 8){
            removeStars();
         }

    }
    }
  })

restart.addEventListener('click', function(event){
    stopClock();
    timeOut = true ;
    time = 0;
    timerCount();
    movesCounter = 0;
    moves.innerHTML = movesCounter;
    //deck.classList.toggle("open");
    //deck.classList.toggle("match");
    for(const card of arr  ){
        card.classList.remove("open","match");
    }
    resetStars();
    openCards = [];
  });