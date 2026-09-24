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
  
  

}