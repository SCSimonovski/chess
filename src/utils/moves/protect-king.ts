import { ChessField } from "../../fixtures/chess-board";
import { positionToIndices } from "../board/position-to-indices";

export const protectKing = (
  board: Array<Array<ChessField>>,
  figures: Array<string>,
  value: string
): boolean => {
  const arr: string[] = [];

  let [row, column] = positionToIndices(value);

  ////////////////////////////////////////////////////////
  // BlOCK WITH QUEEN OR ROOK ////////////////////////////
  let ef: Array<string> = [];
  figures.forEach((figure) => {
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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }
      break;
    }
    c--;
  }

  ////////////////////////////////////////////////////////
  // BLOCK WITH BISHOP OR QUEEN //////////////////////////
  ef = [];
  figures.forEach((figure) => {
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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }
      break;
    }

    r--;
    c--;
  }

  ////////////////////////////////////////////////////////
  // BLOCK WITH KNIGHT ////////////////////////////////////
  ef = [];
  figures.forEach((figure) => {
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
          return true;
        }
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          return true;
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
          return true;
        }
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          return true;
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
          return true;
        }
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          return true;
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
          return true;
        }
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (board[r][c].figure !== "empty") {
        if (ef.includes(board[r][c].figure)) {
          return true;
        }
      }
    }
  }

  ////////////////////////////////////////////////////////
  // BLOCK WITH PAWN ////////////////////////////////////

  if (figures.includes("pawnBlack") && row < 6) {
    if (board[row + 1][column].figure === "pawnBlack") return true;

    if (
      row === 4 &&
      board[row + 2][column].figure === "pawnBlack" &&
      board[row + 1][column].figure === "empty"
    ) {
      return true;
    }
  }

  if (figures.includes("pawnWhite") && row > 1) {
    if (board[row - 1][column].figure === "pawnWhite") return true;

    if (
      row === 3 &&
      board[row - 2][column].figure === "pawnWhite" &&
      board[row - 1][column].figure === "empty"
    ) {
      return true;
    }
  }

  return false;
};
