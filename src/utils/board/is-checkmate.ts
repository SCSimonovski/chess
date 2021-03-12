import { ChessField } from "../../fixtures/chess-board";
import { kingMoves } from "../moves/king.moves";
import { findKingIndices } from "./find-king-indices";

import { AvailableMoves } from "../types";
import { isUnderAttack } from "../moves/is-under-attack";
import { positionToIndices } from "./position-to-indices";
import { protectKing } from "../moves/protect-king";

export const isCheckmate = (
  board: Array<Array<ChessField>>,
  enemySide: "white" | "black",
  checkArr: Array<string>
): boolean => {
  let moves: AvailableMoves;
  let isProtected = false;
  let checkmate = true;
  let alliesSide: "black" | "white" = enemySide === "white" ? "black" : "white";

  let [row, column] = findKingIndices(board, alliesSide);

  let [i, j] = positionToIndices(checkArr[0]);
  const figure = board[i][j].figure;

  console.log(figure);

  moves = kingMoves(board, row, column, enemySide);

  console.log(moves, "moves");

  if (checkArr.length > 1 && moves.arr.length === 0) {
    return true;
  }

  if (!isUnderAttack(board, alliesSide, checkArr[0])) {
    return false;
  }

  checkmate = !moves.arr.some((move) => !isUnderAttack(board, enemySide, move));
  if (!checkmate) {
    console.log("honest mistake!");

    return false;
  }

  ////////////////////////////////////////////////////////////////////////
  // CHECK FROM QUEEN OR BISHOP //////////////////////////////////////////
  if (["queen", "bishop"].includes(figure!.title)) {
    // FORWARD LEFT //////////////////////////////////////
    while (i + 1 < row && j + 1 < column) {
      isProtected = protectKing(board, enemySide, `${i + 1}${j + 1}`);
      if (isProtected) {
        return false;
      }
      i++;
      j++;
    }

    // FORWARD RIGHT //////////////////////////////////////
    while (i + 1 < row && j - 1 > column) {
      isProtected = protectKing(board, enemySide, `${i + 1}${j - 1}`);
      if (isProtected) {
        return false;
      }
      i++;
      j--;
    }

    // BACK LEFT //////////////////////////////////////
    while (i - 1 > row && j + 1 < column) {
      isProtected = protectKing(board, enemySide, `${i - 1}${j + 1}`);
      if (isProtected) {
        return false;
      }
      i--;
      j++;
    }

    // BACK RIGHT //////////////////////////////////////
    while (i - 1 > row && j - 1 > column) {
      isProtected = protectKing(board, enemySide, `${i - 1}${j - 1}`);
      if (isProtected) {
        return false;
      }
      i--;
      j--;
    }
  }

  ///////////////////////////////////////////////////////////////////
  // CHECK FROM PAWN OR KNIGHT //////////////////////////////////////////
  if (["queen", "rook"].includes(figure!.title)) {
    // FORWARD /////////////////////////////
    while (i - 1 > row) {
      isProtected = protectKing(board, alliesSide, `${i - 1}${j}`);
      if (isProtected) {
        return false;
      }
      i--;
    }

    // BACK ////////////////////////////////
    while (i + 1 < row) {
      isProtected = protectKing(board, enemySide, `${i + 1}${j}`);
      if (isProtected) {
        return false;
      }
      i++;
    }

    // RIGHT ///////////////////////////////
    while (j - 1 > column) {
      isProtected = protectKing(board, enemySide, `${i}${j - 1}`);
      if (isProtected) {
        return false;
      }
      j--;
    }

    // LEFT /////////////////////////////////
    while (j + 1 < column) {
      isProtected = protectKing(board, enemySide, `${i}${j + 1}`);
      if (isProtected) {
        return false;
      }
      j++;
    }
  }

  return true;
};