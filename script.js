let gameBoard = ["", "", "", "", "", "", "", "", ""];

const container = document.querySelector(".container");

let currentPlayerIndex = 0;

const result = document.querySelector(".results");

function getPlayer() {
  const playerName = prompt("Enter player name:");
  return playerName;
}

const players = [
  {
    name: getPlayer() || "PlayerOne",
    marker: "X",
  },
  {
    name: getPlayer() || "PlayerTwo",
    marker: "O",
  },
];

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.setAttribute("cellIndex", `${i}`);
    container.appendChild(gridItem);

    // Add an event listener for click events on each grid item
    gridItem.addEventListener("click", handleGridItemClick);
  }
}

function handleGridItemClick(event) {
  const gridItem = event.target; //Getting the element that is being clicked on
  const cellIndex = parseInt(gridItem.getAttribute("cellIndex"));

  // Prevent invalid moves by checking if the cell is already occupied if is not empty dont do anything to it
  if (gameBoard[cellIndex] !== "") {
    return;
  }

  // Place the current player's marker on the grid item and update the game board
  gridItem.textContent = players[currentPlayerIndex].marker;
  gameBoard[cellIndex] = players[currentPlayerIndex].marker;

  result.textContent = `${players[currentPlayerIndex].name}'s turn`;

  if (checkWinner()) {
    result.textContent = `Congrats🎊🎊🎉! ${players[currentPlayerIndex].name} wins!`;

    // Disable further moves by removing event listeners
    removeAllEventListeners();
    return;
  } else if (checkDraw()) {
    result.textContent = "It's a draw!";

    // Disable further moves by removing event listeners
    removeAllEventListeners();
    return;
  }

  currentPlayerIndex = 1 - currentPlayerIndex;
}

function checkWinner() {
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each winning combination
  //abc are indexes of the gameboard
  for (const [a, b, c] of winningCombinations) {
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  // Check if there are any empty cells remaining on the game board
  return gameBoard.every((cell) => cell !== "");
}

// Function to remove all event listeners from grid items
function removeAllEventListeners() {
  container.querySelectorAll(".grid-item").forEach((gridItem) => {
    gridItem.removeEventListener("click", handleGridItemClick);
  });
}

// Function to reset the game
function resetGame() {

  // Reset game board
  gameBoard = Array(9).fill("");
  
  // Clear the grid items' text content
  container.querySelectorAll(".grid-item").forEach((gridItem) => {
    gridItem.textContent = "";
  });

  // Re-add event listeners
  addEventListenersToGridItems();

  // Reset current player index
  currentPlayerIndex = 0;

  result.textContent = "";
}

// Function to add event listeners to grid items
function addEventListenersToGridItems() {
  container.querySelectorAll(".grid-item").forEach((gridItem) => {
    gridItem.addEventListener("click", handleGridItemClick);
  });
}

// Add restart button event listener
const restartBtn = document.querySelector("#restartBtn");
restartBtn.addEventListener("click", resetGame);

// Create the grid
createGrid();
