import { ChessField, FigureTitle } from "../../fixtures/chess-board";
import { findKingIndices } from "../board/find-king-indices";

export const isCheck = (
  board: Array<Array<ChessField>>,
  enemySide: "white" | "black"
): Array<string> => {
  const arr: string[] = [];

  let row: number;
  let column: number;

  let alliesSide: "black" | "white" = enemySide === "white" ? "black" : "white";

  [row, column] = findKingIndices(board, alliesSide);

  const attackFrom = (r: number, c: number, enemies: Array<FigureTitle>) => {
    if (board[r][c].figure) {
      const { side, title } = board[r][c].figure!;
      if (side === enemySide && enemies.includes(title)) {
        arr.push(`${r}${c}`);
      } else if (title !== "king") {
        return -1;
      }
    }
    return 0;
  };

  ////////////////////////////////////////////////////////
  // CHECK FROM QUEEN OR ROOK ////////////////////////////

  let enemies: Array<FigureTitle> = ["queen", "rook"];

  let r = row + 1;
  let c = column;

  // FORWARD /////////////////////////////
  while (r <= 7) {
    if (attackFrom(r, c, enemies)) break;
    r++;
  }

  // BACK ////////////////////////////////
  r = row - 1;

  while (r >= 0) {
    if (attackFrom(r, c, enemies)) break;
    r--;
  }

  // RIGHT ///////////////////////////////
  r = row;
  c = column + 1;

  while (c <= 7) {
    if (attackFrom(r, c, enemies)) break;
    c++;
  }

  // LEFT /////////////////////////////////
  c = column - 1;

  while (c >= 0) {
    if (attackFrom(r, c, enemies)) break;
    c--;
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM BISHOP OR QUEEN //////////////////////////
  enemies = ["queen", "bishop"];

  // FORWARD RIGHT //////////////////////////////////////
  r = row + 1;
  c = column + 1;

  while (r <= 7 && c <= 7) {
    if (attackFrom(r, c, enemies)) break;

    r++;
    c++;
  }

  // FORWARD LEFT //////////////////////////////////////
  r = row + 1;
  c = column - 1;

  while (r <= 7 && c >= 0) {
    if (attackFrom(r, c, enemies)) break;

    r++;
    c--;
  }

  // BACK RIGHT //////////////////////////////////////
  r = row - 1;
  c = column + 1;

  while (r >= 0 && c <= 7) {
    if (attackFrom(r, c, enemies)) break;

    r--;
    c++;
  }

  // BACK LEFT //////////////////////////////////////
  r = row - 1;
  c = column - 1;

  while (r >= 0 && c >= 0) {
    if (attackFrom(r, c, enemies)) break;

    r--;
    c--;
  }

  ////////////////////////////////////////////////////////
  // CHECK FROM knight ///////////////////////////////////
  enemies = ["knight"];

  // FORWARD ///////////
  r = row + 2;
  c = column + 1;

  if (r <= 7) {
    if (c <= 7) attackFrom(r, c, enemies);

    c = column - 1;
    if (c >= 0) attackFrom(r, c, enemies);
  }

  // BACK ///////////
  r = row - 2;
  c = column + 1;

  if (r >= 0) {
    if (c <= 7) attackFrom(r, c, enemies);

    c = column - 1;
    if (c >= 0) attackFrom(r, c, enemies);
  }

  // RIGHT ///////////
  c = column + 2;
  r = row + 1;

  if (c <= 7) {
    if (r <= 7) attackFrom(r, c, enemies);

    r = row - 1;
    if (r >= 0) attackFrom(r, c, enemies);
  }

  // LEFT ///////////
  c = column - 2;
  r = row + 1;

  if (c >= 0) {
    if (r <= 7) attackFrom(r, c, enemies);

    r = row - 1;
    if (r >= 0) attackFrom(r, c, enemies);
  }

  ////////////////////////////////////////////////////////////////
  // CHECK FROM PAWN ////////////////////////////////////////////

  const checkFromPawn = (r: number, c: number, side: "white" | "black") => {
    if (
      r >= 0 &&
      r <= 7 &&
      c >= 0 &&
      r <= 7 &&
      board[r][c].figure?.title === "pawn" &&
      board[r][c].figure?.side === side
    ) {
      arr.push(`${r}${c}`);
    }
  };

  /////////////////////////////////////////////////////////////////

  if (enemySide === "white") {
    r = row + 1;
    c = column + 1;

    checkFromPawn(r, c, "white");

    c = column - 1;
    checkFromPawn(r, c, "white");
  } else {
    r = row - 1;
    c = column - 1;

    checkFromPawn(r, c, "black");

    c = column + 1;
    checkFromPawn(r, c, "black");
  }

  ///////////////////////////////////////////////////////////////////

  return arr;
};
