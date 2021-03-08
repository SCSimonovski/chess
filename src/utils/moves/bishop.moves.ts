import { ChessField } from "../../fixtures/chessBoard";

////////////////////////////////////////////////////////////////////////
// BISHOP MOVES /////////////////////////////////////////////////////////

export const bishopMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemyFigures: Array<string>
): Array<string> => {
  const arr: string[] = [];

  // MOVES FORWARD RIGHT //////////////////////////////////////
  let r = row + 1;
  let c = column + 1;

  while (r <= 7 && c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r++;
    c++;
  }

  // MOVES FORWARD LEFT //////////////////////////////////////
  r = row + 1;
  c = column - 1;

  while (r <= 7 && c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r++;
    c--;
  }

  // MOVES BACK RIGHT //////////////////////////////////////
  r = row - 1;
  c = column + 1;

  while (r >= 0 && c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r--;
    c++;
  }

  // MOVES BACK LEFT //////////////////////////////////////
  r = row - 1;
  c = column - 1;

  while (r >= 0 && c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r--;
    c--;
  }
  //////////////////////////////////////////////////////////

  return arr;
};
