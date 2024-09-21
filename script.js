
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; 
let cardsArray = [...cardValues, ...cardValues]; 
let firstCard = null, secondCard = null;
let isChecking = false;


const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function initializeGame() {
    gameBoard.innerHTML = '';
    shuffle(cardsArray);
    cardsArray.forEach(value => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = value;
        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}


function flipCard() {
    if (isChecking || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}


function checkForMatch() {
    isChecking = true;
    const match = firstCard.dataset.value === secondCard.dataset.value;
    if (match) {
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}


function resetCards() {
    [firstCard, secondCard] = [null, null];
    isChecking = false;
}


restartBtn.addEventListener('click', initializeGame);


window.onload = initializeGame;
