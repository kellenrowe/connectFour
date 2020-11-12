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

let currentPlayer = "player1"; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    let rowArray = []
    for (let x = 0; x < WIDTH; x++) {
      rowArray.push(null);
    }
    board.push(rowArray);
  }
  console.log(board)
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
    // TODO: Create a table row element and assign to a "row" variable
    let tableRow = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let tableCell = document.createElement("td");
      // TODO: add an id, y-x, to the above table cell element
      tableCell.setAttribute("id", `${y}-${x}`);
      // you'll use this later, so make sure you use y-x
      // TODO: append the table cell to the table row
      tableRow.append(tableCell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let yCoord = board.length - 1; yCoord >= 0; yCoord--) {
    if (!board[yCoord][x]) {
      // place piece there
      return yCoord;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let newPiece = document.createElement('div');
  newPiece.classList.add('piece', `${currentPlayer}`);
  document.getElementById(`${y}-${x}`).append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // console.log(`${currentPlayer} Won!`);
  // TODO: pop up alert message
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
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    let alert = setTimeout(endGame, 200, `${currentPlayer} won!`);
    return alert;
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let topRowArr = Array.from(document.querySelectorAll("tr")[1]);
  console.log(topRowArr);
  if (board[0].every(function (cell) {
    cell !== null;
  })) endGame("Game Over, nobody wins - You're all losers.");
  // switch players
  // TODO: switch currentPlayer 1 <-> 2
  currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
  console.log(currentPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** legalMovePlayerMatch:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currentPlayer
   */
  function legalMovePlayerMatch(cells) {
    // console.log(cells);
    for(let [y, x] of cells){
      if((y < 0 || y > HEIGHT - 1 )||( x < 0 || x > WIDTH - 1)){
        return false;
      }
      if(board[y][x] !== currentPlayer) return false;
    }
    //TODO: Check four cells to see if they're all legal & all color of current
    //player
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (legalMovePlayerMatch(horiz) || legalMovePlayerMatch(vert) || legalMovePlayerMatch(diagDR) || legalMovePlayerMatch(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
