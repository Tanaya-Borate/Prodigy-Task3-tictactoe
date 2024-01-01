const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = ['', '', '', '', '', '', '', '', ''];

// Function to handle cell clicks
function cellClick(cellIndex) {
  if (gameActive && cells[cellIndex] === '') {
    cells[cellIndex] = currentPlayer;
    document.getElementById(`cell${cellIndex}`).innerText = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for winning conditions or a draw
function checkResult() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      status.innerText = `Player ${cells[a]} wins!`;
      highlightWinningCells(winningConditions[i]);
      return;
    }
  }

  if (!cells.includes('')) {
    gameActive = false;
    status.innerText = "It's a draw!";
  }
}

// Function to highlight the winning cells
function highlightWinningCells(winningCombo) {
  winningCombo.forEach(index => {
    document.getElementById(`cell${index}`).style.backgroundColor = 'rgb(24, 101, 24) ';
  });
}

// Function to reset the game
function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.innerText = '';
  const cellElements = document.getElementsByClassName('cell');
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].innerText = '';
    cellElements[i].style.backgroundColor = '';
  }
}

// Create cells dynamically
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('id', `cell${i}`);
  cell.addEventListener('click', () => cellClick(i));
  gameBoard.appendChild(cell);
}
