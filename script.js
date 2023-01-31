const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn; // false if x's on the move, true if o's on the move

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const introMessageScreen = document.querySelector("#introMessage");
const winningMessageScreen = document.querySelector("#winningMessage");
const startButton = document.getElementById("start-btn");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
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
/** 
 * The main function. Adds event listener on start button. 
 */
function main() {
  startButton.addEventListener("click", (e) => {
    introMessageScreen.classList.add("hide");
    startGame();
  });
}

/**
 * Starts the game. Hides winning screen if needed, clears the board and adds listeners to each cell.
 */
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

/**
 * If the player clicks on a cell, checks whose turn it is and places the mark. If there is a winning combination, shows the winning message screen.
 */
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

/**
 * Places the mark on given cell of given class.
 */
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

/**
 * Swaps the turns between x's and o's.
 */
function swapTurns() {
  circleTurn = !circleTurn;
}

/**
 * Adds the 'x' or 'circle' class on #board depending on whose turn it is.
 */
function setBoardHoverClass() {
  boardElement.classList.remove(X_CLASS);
  boardElement.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    boardElement.classList.add(CIRCLE_CLASS);
  } else {
    boardElement.classList.add(X_CLASS);
  }
}

/**
 * Checks if the current player just got a winning combination.
 * @param {*} currentClass 
 * @returns true if there is a winning combination
 */
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

/**
 * Checks if all cells are fulfilled.
 * @returns true if all nine squares are fulfilled with 'x' or 'circle' class.
 */
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

/**
 * Shows the winning message screen.
 */
function endGame({ draw }) {
  if (draw) {
    winningMessageTextElement.innerText = "Remíza!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "Vyhrávají kolečka!" : "Vyhrávají křížky!"}`;
  }
  winningMessageScreen.classList.remove("hide");
}
