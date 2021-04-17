import { ChessField } from "../../types/types";

export const queenMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemySide: "white" | "black"
): Array<string> => {
  const arr: string[] = [];

  // MOVES FORWARD //////////////////////////////////////
  let r = row + 1;
  let c = column;

  while (r <= 7) {
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r++;
  }

  // MOVES BACK //////////////////////////////////////
  r = row - 1;

  while (r >= 0) {
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    r--;
  }

  // MOVES RIGHT //////////////////////////////////////
  r = row;
  c = column + 1;

  while (c <= 7) {
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    c++;
  }

  // MOVES LEFT //////////////////////////////////////
  c = column - 1;

  while (c >= 0) {
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
        arr.push(`${r}${c}`);
      }

      break;
    }

    arr.push(`${r}${c}`);
    c--;
  }

  // MOVES FORWARD RIGHT //////////////////////////////////////
  r = row + 1;
  c = column + 1;

  while (r <= 7 && c <= 7) {
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
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
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
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
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
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
    if (board[r][c].figure) {
      if (enemySide === board[r][c].figure!.side) {
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
