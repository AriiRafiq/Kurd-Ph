const gameBoard = document.querySelector('.game-board');
const movesCounter = document.getElementById('moves');
const matchesCounter = document.getElementById('matches');
const restartButton = document.getElementById('restart');
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');

let moves = 0;
let matches = 0;
let cardArray = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍒', '🍒', '🍓', '🍓', '🍉', '🍉', '🍍', '🍍', '🥝', '🥝'];
let flippedCards = [];
let matchedCards = [];
let lock = false; // Add this line

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardArray);
    gameBoard.innerHTML = '';
    cardArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = `<span class="emoji">${item}</span>`;
        card.querySelector('.emoji').style.display = 'none';
        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !lock) { // Update this line
        const card = this;
        const emoji = card.querySelector('.emoji');
        if (!card.classList.contains('flip') && !card.classList.contains('match')) {
            card.classList.add('flip');
            emoji.style.display = 'block';
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    lock = true; // Set lock to true
    moves++;
    movesCounter.textContent = moves;

    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.emoji').textContent;
    const emoji2 = card2.querySelector('.emoji').textContent;

    if (emoji1 === emoji2) {
        card1.classList.add('match');
        card2.classList.add('match');
        matches++;
        matchesCounter.textContent = matches;
        matchedCards.push(card1, card2);
        setTimeout(() => {
            lock = false; // Unlock after a match
        }, 500); // Slight delay to show the matched cards
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            card1.querySelector('.emoji').style.display = 'none';
            card2.querySelector('.emoji').style.display = 'none';
            lock = false; // Reset lock when cards do not match
        }, 750);
    }

    flippedCards = [];

    if (matchedCards.length === cardArray.length) {
        setTimeout(() => {
            alert(`You won the game in ${moves} moves!`);
        }, 500);
    }
}

function resetGame() {
    moves = 0;
    matches = 0;
    movesCounter.textContent = moves;
    matchesCounter.textContent = matches;
    flippedCards = [];
    matchedCards = [];
    lock = false; // Reset lock when game is reset
    createBoard();
}

restartButton.addEventListener('click', resetGame);

createBoard();

    // Toggle side menu
    menuButton.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
		menuButton.classList.toggle('clicked');
    });

	// Close side-menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (event.target !== sideMenu && !sideMenu.contains(event.target) && event.target !== menuButton) {
            sideMenu.classList.remove('open');
            menuButton.classList.remove('clicked');
        }
    });
