"use strict";

// start with html and css to get a firm grasp on the elements we will be working with
// once we have board, move over to JS to handle game
// first:   determine player
// second:  handle click / determine column
// third:   determine row
// fourth:  place color
// fifth:   check for winner
// sixth:   if none: switch player

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;

let currentPlayer = "red"; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 // test this
function makeBoard() {
  board = []
  for (let y = 0; y < HEIGHT; y++) {
    let rowArray = [];
    for (let x = 0; x < WIDTH; x++) {
      rowArray.push(null);
    }
    board.push(rowArray);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.querySelector("#board");
  //create a tag for table row with an id of column-top, and
  //a click event listener for handling each turn
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //create columns with id of x and append to the corresponding row.
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //append rows to the board
  htmlBoard.append(top);
  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    let tableRow = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let tableCell = document.createElement("td");
      tableCell.setAttribute("id", `${y}-${x}`);
      // you'll use this later, so make sure you use y-x
      tableRow.append(tableCell);
    }
    htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

// test this for return ycoord or null
function findSpotForCol(x) {
  for (let yCoord = HEIGHT - 1; yCoord >= 0; yCoord--) {
    if (!board[yCoord][x]) {
      // place piece there
      return yCoord;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let newPiece = document.createElement("div");
  newPiece.classList.add("piece", `${currentPlayer}`);
  document.getElementById(`${y}-${x}`).append(newPiece);
}

/** endGame: announce game end */

//test this
function endGame(msg) {
  // console.log(`${currentPlayer} Won!`);
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table

  board[y][x] = currentPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(endGame, 200, `${currentPlayer} player wins!`);
    return;
  }

  // check for tie
  let rowIsFull = board[0].every(cell => cell !== null);
  if (rowIsFull) {
    endGame("Game Over, nobody wins - You're all losers.");
  }
  // switch players
  currentPlayer = currentPlayer === "red" ? "blue" : "red";
  console.log(currentPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currentPlayer
   */
  function _win(cells) {
    // console.log(cells);
    //**** make variable here ******/
    for (let [y, x] of cells) {
      if (y < 0 || y > HEIGHT - 1 || x < 0 || x > WIDTH - 1) {
        return false;
      }
      if (board[y][x] !== currentPlayer) return false;
    }
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];

      // find winner (only checking each win-possibility as needed)
      if (
        _win(horiz) ||
        _win(vert) ||
        _win(diagDR) ||
        _win(diagDL)
      ) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
