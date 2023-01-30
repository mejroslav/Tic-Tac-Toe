const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

const introMessageScreen = document.querySelector("#introMessage");
const startButton = document.getElementById("start-btn");

const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageScreen = document.querySelector("#winningMessage");
const restartButton = document.getElementById("restart-btn");

const WINNING_COMBINATIONS = [
  // horizontal combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal combinations
  [0, 4, 8],
  [6, 4, 2],
];

main();

function main() {
  startButton.addEventListener("click", (e) => {
    introMessageScreen.classList.add("hide");
    startGame();
  });
}

function startGame() {
  circleTurn = false;
  winningMessageScreen.classList.add("hide");
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  restartButton.addEventListener("click", startGame);
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // placeMark
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    console.log(`${currentClass} vyhrává!`);
    endGame({ draw: false });
  } else if (isDraw()) {
    console.log("Remíza!");
    endGame({ draw: true });
  }
  // switch turns
  swapTurns();
  setBoardHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame({ draw }) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
  }
  winningMessageScreen.classList.remove("hide");
}
