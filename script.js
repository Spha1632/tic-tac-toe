function gameBoard() {

  let board =
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]

  function getBoard() {
    return board;
  }

  //resets board to original state
  function resetBoard() {
    board =
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]
  }

  //Adds marker to board
  function addToBoard(row, col, marker) {

    if (board[row][col] === "") {
      board[row][col] = marker;
    }

  }

  // Print board to console
  function printBoard() {
    console.log(board);
  }

  return { getBoard, resetBoard, addToBoard, printBoard }
}

function players(name, marker) {

  let score = 0;

  function incrementScore() {
    score++
  }

  function resetScore() {
    score = 0;
  }

  function getScore() {
    return score;
  }

  return { name, marker, incrementScore, resetScore, getScore }
}

function gameController(playerOne, playerTwo) {

  const game = gameBoard();
  const board = game.getBoard();

  let activePlayer = playerOne;
  
  function checkWinner(marker) {

    if (marker !== "X" && marker !== "O") {
      return false;
    }

    // Rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === marker &&
        board[i][1] === marker &&
        board[i][2] === marker
      ) {
        return true;
      }
    }

    // Columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === marker &&
        board[1][i] === marker &&
        board[2][i] === marker
      ) {
        return true;
      }
    }

    // Diagonal \
    if (
      board[0][0] === marker &&
      board[1][1] === marker &&
      board[2][2] === marker
    ) {
      return true;
    }

    // Diagonal /
    if (
      board[0][2] === marker &&
      board[1][1] === marker &&
      board[2][0] === marker
    ) {
      return true;
    }

    return false;
  }

  function switchPlayerTurn() {
    if (activePlayer === playerOne) {
      activePlayer = playerTwo
    } else {
      activePlayer = playerOne
    }
  };

  function getActivePlayer() {
    return activePlayer;
  }

  function playRound(row, col) {

    game.addToBoard(row, col, getActivePlayer().marker);
    if (!checkWinner(playerOne.marker) && !checkWinner(playerTwo.marker)) {
      switchPlayerTurn();
    } else {
      return false
    }
  }

  return { playRound, board: game, activePlayer: getActivePlayer, checkWinner }
}

(function displayController() {

  let player1name = prompt("Please enter player 1's name")
  let player2name = prompt("Please enter player 2's name")

  let playerOne = players(player1name, "X");
  let playerTwo = players(player2name, "O");

  let game = gameController(playerOne, playerTwo);

  const playerOneDivName = document.querySelector(".playerOneName")
  const playerTwoDivName = document.querySelector(".playerTwoName")
  const playerOneDivScore = document.querySelector(".playerOneScore")
  const playerTwoDivScore = document.querySelector(".playerTwoScore")

  function printGrid() {

    const gridContainer = document.querySelector(".container");
    gridContainer.textContent = "";
    const playerName = document.querySelector(".player-name");
    playerName.textContent = game.activePlayer().name

    playerOneDivName.textContent = playerOne.name
    playerTwoDivName.textContent = playerTwo.name

    playerOneDivScore.textContent = playerOne.getScore();
    playerTwoDivScore.textContent = playerTwo.getScore();

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {

        const gridItem = document.createElement("button");
        gridItem.classList.add("grid-item");
        gridItem.disabled = false;
        gridItem.dataset.row = row;
        gridItem.dataset.col = col;
        gridItem.textContent = game.board.getBoard()[row][col]
        gridContainer.appendChild(gridItem)

      }
    }
  };

  function handleClick() {
    const gridContainer = document.querySelector(".container");

    gridContainer.addEventListener("click", (e) => {
      if (e.target.matches(".grid-item")) {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;

        if (!game.checkWinner(playerOne.marker) && !game.checkWinner(playerTwo.marker)) {
          game.playRound(row, col)
          printGrid();
        }

        if (game.checkWinner(game.activePlayer().marker)) {

          setTimeout(() => {
            game.board.resetBoard();
            game.activePlayer().incrementScore();
            game = gameController(playerOne, playerTwo);
            printGrid();

            if (playerOne.getScore() >= 3 || playerTwo.getScore() >= 3) {
              const winnerScreen = document.createElement("div");
              winnerScreen.classList.add("winner-screen");
              gridContainer.textContent = ""
              winnerScreen.innerHTML =
                `${game.activePlayer().name} Wins.
                <button class="restart">Restart Game?</button>
              `
              gridContainer.appendChild(winnerScreen)
            }
          }, 1000);
        }
      }
    })
  }

  function handleRestart() {
    const gridContainer = document.querySelector(".container");

    gridContainer.addEventListener("click", (e) => {
      if (e.target.matches(".restart")) {
        game.board.resetBoard();
        playerOne.resetScore();
        playerTwo.resetScore();

        player1name = prompt("Please enter player 1's name")
        player2name = prompt("Please enter player 2's name")

        playerOne = players(player1name, "X");
        playerTwo = players(player2name, "O");

        game = gameController(playerOne, playerTwo)
        printGrid()
      }
    })
  }

  printGrid();
  handleClick();
  handleRestart()

})();