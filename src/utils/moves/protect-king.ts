import { ChessField, FigureTitle } from "../../types/types";
import { positionToIndices } from "../board/position-to-indices";

export const protectKing = (
  board: Array<Array<ChessField>>,
  enemySide: string,
  position: string
): boolean => {
  let [row, column] = positionToIndices(position);

  const attackFrom = (r: number, c: number, enemies: Array<FigureTitle>) => {
    if (board[r][c].figure) {
      const { side, title } = board[r][c].figure!;
      if (side !== enemySide && enemies.includes(title)) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };

  ////////////////////////////////////////////////////////
  // ATACK FROM QUEEN OR ROOK ////////////////////////////

  let r = row + 1;
  let c = column;
  let response: number;
  let enemies: Array<FigureTitle> = ["queen", "rook"];

  // FORWARD /////////////////////////////
  while (r <= 7) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r++;
  }

  // BACK ////////////////////////////////
  r = row - 1;

  while (r >= 0) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r--;
  }

  // RIGHT ///////////////////////////////
  r = row;
  c = column + 1;

  while (c <= 7) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    c++;
  }

  // LEFT /////////////////////////////////
  c = column - 1;

  while (c >= 0) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    c--;
  }

  ////////////////////////////////////////////////////////
  // ATACK FROM QUEEN OR BISHOP //////////////////////////

  enemies = ["queen", "bishop"];

  // FORWARD RIGHT //////////////////////////////////////
  r = row + 1;
  c = column + 1;

  while (r <= 7 && c <= 7) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r++;
    c++;
  }

  // FORWARD LEFT //////////////////////////////////////
  r = row + 1;
  c = column - 1;

  while (r <= 7 && c >= 0) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r++;
    c--;
  }

  // BACK RIGHT //////////////////////////////////////
  r = row - 1;
  c = column + 1;

  while (r >= 0 && c <= 7) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r--;
    c++;
  }

  // BACK LEFT //////////////////////////////////////
  r = row - 1;
  c = column - 1;

  while (r >= 0 && c >= 0) {
    response = attackFrom(r, c, enemies);

    if (response === 1) return true;
    if (response === -1) break;

    r--;
    c--;
  }

  ////////////////////////////////////////////////////////
  // ATACK FROM KNIGHT ////////////////////////////////////
  enemies = ["knight"];

  // FORWARD ///////////
  r = row + 2;
  c = column + 1;

  if (r <= 7) {
    if (c <= 7) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }

    c = column - 1;
    if (c >= 0) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }
  }

  // BACK ///////////
  r = row - 2;
  c = column + 1;

  if (r >= 0) {
    if (c <= 7) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }

    c = column - 1;
    if (c >= 0) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }
  }

  // RIGHT ///////////
  c = column + 2;
  r = row + 1;
  if (c <= 7) {
    if (r <= 7) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }

    r = row - 1;
    if (r >= 0) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }
  }

  // LEFT ///////////
  c = column - 2;
  r = row + 1;

  if (c >= 0) {
    if (r <= 7) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }

    r = row - 1;
    if (r >= 0) {
      response = attackFrom(r, c, enemies);
      if (response === 1) return true;
    }
  }

  ////////////////////////////////////////////////////////
  // BLOCK WITH PAWN ////////////////////////////////////
  const n = enemySide === "white" ? -1 : 1;

  if (row < 6 && row > 1) {
    if (board[row + n][column].figure?.title === "pawn") return true;

    if (
      board[row + n + n][column].figure?.title === "pawn" &&
      board[row + n + n][column].figure?.firstMove &&
      !board[row + n][column].figure
    ) {
      return true;
    }
  }

  return false;
};
