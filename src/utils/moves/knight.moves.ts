import { ChessField } from "../../fixtures/chessBoard";

///////////////////////////////////////////////////////////////
// knight MOVES ////////////////////////////////////////////////

export const knightMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemyFigures: Array<string>
): Array<string> => {
  const arr: string[] = [];

  // MOVE FORWARD ///////////
  let r = row + 2;
  let c = column + 1;

  if (r <= 7) {
    if (c <= 7) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }
  }

  // MOVE BACK ///////////
  r = row - 2;
  c = column + 1;

  if (r >= 0) {
    if (c <= 7) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }

    c = column - 1;
    if (c >= 0) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }
  }

  // MOVE RIGHT ///////////
  c = column + 2;
  r = row + 1;
  if (c <= 7) {
    if (r <= 7) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }
  }

  // MOVE LEFT ///////////
  c = column - 2;
  r = row + 1;

  if (c >= 0) {
    if (r <= 7) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }

    r = row - 1;
    if (r >= 0) {
      if (
        board[r][c].figure === "empty" ||
        enemyFigures.includes(board[r][c].figure)
      ) {
        arr.push(`${r}${c}`);
      }
    }
  }

  return arr;
};

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
