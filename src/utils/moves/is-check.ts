import { ChessField } from "../../fixtures/chess-board";
import { findKingIndices } from "../board/find-king-indices";
import { positionToIndices } from "../board/position-to-indices";

export const isCheck = (
  board: Array<Array<ChessField>>,
  enemyFigures: Array<string>,
  value: string
): Array<string> => {
  const arr: string[] = [];

  let row: number;
  let column: number;

  if (["kingBlack", "kingWhite"].includes(value)) {
    [row, column] = findKingIndices(board, value);
  } else {
    [row, column] = positionToIndices(value);
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM ROOK OR QUEEN ////////////////////////////
  let ef: Array<string> = [];
  enemyFigures.forEach((figure) => {
    if (figure.includes("rook") || figure.includes("queen")) {
      ef.push(figure);
    }
  });
  let r = row + 1;
  let c = column;

  // FORWARD /////////////////////////////
  while (r <= 7) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    r++;
  }

  // BACK ////////////////////////////////
  r = row - 1;

  while (r >= 0) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    r--;
  }

  // RIGHT ///////////////////////////////
  r = row;
  c = column + 1;

  while (c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    c++;
  }

  // LEFT /////////////////////////////////
  c = column - 1;

  while (c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }
    c--;
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM BISHOP or QUEEN //////////////////////////
  ef = [];
  enemyFigures.forEach((figure) => {
    if (figure.includes("bishop") || figure.includes("queen")) {
      ef.push(figure);
    }
  });

  // FORWARD RIGHT //////////////////////////////////////
  r = row + 1;
  c = column + 1;

  while (r <= 7 && c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    r++;
    c++;
  }

  // FORWARD LEFT //////////////////////////////////////
  r = row + 1;
  c = column - 1;

  while (r <= 7 && c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }
    r++;
    c--;
  }

  // BACK RIGHT //////////////////////////////////////
  r = row - 1;
  c = column + 1;

  while (r >= 0 && c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    r--;
    c++;
  }

  // BACK LEFT //////////////////////////////////////
  r = row - 1;
  c = column - 1;

  while (r >= 0 && c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (ef.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    r--;
    c--;
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM knight ////////////////////////////////////
  ef = [];
  enemyFigures.forEach((figure) => {
    if (figure.includes("knight")) {
      ef.push(figure);
    }
  });

  // FORWARD ///////////
  r = row + 2;
  c = column + 1;

  if (r <= 7) {
    if (c <= 7) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }
  }

  // BACK ///////////
  r = row - 2;
  c = column + 1;

  if (r >= 0) {
    if (c <= 7) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }
  }

  // RIGHT ///////////
  c = column + 2;
  r = row + 1;
  if (c <= 7) {
    if (r <= 7) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }
  }

  // LEFT ///////////
  c = column - 2;
  r = row + 1;

  if (c >= 0) {
    if (r <= 7) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM pawn ////////////////////////////////////

  if (enemyFigures.includes("pawnBlack") && row + 1 <= 6) {
    if (column + 1 <= 7 && board[row + 1][column + 1].figure === "pawnBlack") {
      arr.push(`${row + 1}${column + 1}`);
    }

    if (column - 1 >= 0 && board[row + 1][column - 1].figure === "pawnBlack") {
      arr.push(`${row + 1}${column - 1}`);
    }
  }

  if (enemyFigures.includes("pawnWhite") && row - 1 >= 1) {
    if (column + 1 <= 7 && board[row - 1][column + 1].figure === "pawnWhite") {
      arr.push(`${row + 1}${column + 1}`);
    }

    if (column - 1 >= 0 && board[row - 1][column - 1].figure === "pawnWhite") {
      arr.push(`${row + 1}${column - 1}`);
    }
  }

  return arr;
};
