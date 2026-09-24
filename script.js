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

}