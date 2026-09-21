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