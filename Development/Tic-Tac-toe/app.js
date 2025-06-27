let boxes = document.querySelectorAll('.innerbox');
let msg = document.querySelector('.message');
let restartButton = document.querySelector('#restart');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const displayMessage = (text) => {
    msg.textContent = text;
};

const checkWinner = () => {
    return winConditions.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
};

const handleClick = (e) => {
    const index = [...boxes].indexOf(e.target);

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        displayMessage(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        displayMessage("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayMessage(`Player ${currentPlayer} turn`);
};

boxes.forEach(box => box.addEventListener('click', handleClick));

restartButton.addEventListener('click', () => {
    gameBoard.fill('');
    boxes.forEach(box => box.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    displayMessage(`Player ${currentPlayer} turn`);
});
