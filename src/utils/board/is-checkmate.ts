import { BLACK_FIGURES, ChessField } from "../../fixtures/chess-board";
import { kingMoves } from "../moves/king.moves";
import { findKingIndices } from "./find-king-indices";

import { AllowedMoves, Castling, EnPassant } from "../types";
import { isUnderAttack } from "../moves/is-under-attack";
import { positionToIndices } from "./position-to-indices";
import { protectKing } from "../moves/protect-king";

export const isCheckmate = (
  board: Array<Array<ChessField>>,
  enemyFigures: Array<string>,
  alliesFigures: Array<string>,
  kingFigure: "kingWhite" | "kingBlack",
  checkArr: Array<string>
): boolean => {
  let [row, column] = findKingIndices(board, kingFigure);

  let moves: AllowedMoves;
  let isProtected = false;
  let checkmate = true;

  let [i, j] = positionToIndices(checkArr[0]);
  const figure = board[i][j].figure;
  moves = kingMoves(board, row, column, enemyFigures);

  if (checkArr.length > 1 && moves.arr.length === 0) {
    return true;
  }

  checkmate = !isUnderAttack(board, alliesFigures, checkArr[0]);

  if (!checkmate) {
    return false;
  }

  checkmate = !moves.arr.some(
    (move) => !isUnderAttack(board, enemyFigures, move)
  );

  if (!checkmate) {
    return false;
  }

  ////////////////////////////////////////////////////////////////////////
  // CHECK FROM QUEEN OR BISHOP //////////////////////////////////////////
  if (
    ["queenBlack", "queenWhite", "bishopBlack", "bishopWhite"].includes(figure)
  ) {
    // FORWARD LEFT //////////////////////////////////////
    while (i + 1 < row && j + 1 < column) {
      isProtected = protectKing(board, alliesFigures, `${i + 1}${j + 1}`);
      if (isProtected) {
        return false;
      }
      i++;
      j++;
    }

    // FORWARD RIGHT //////////////////////////////////////
    while (i + 1 < row && j - 1 > column) {
      isProtected = protectKing(board, alliesFigures, `${i + 1}${j - 1}`);
      if (isProtected) {
        return false;
      }
      i++;
      j--;
    }

    // BACK LEFT //////////////////////////////////////
    while (i - 1 > row && j + 1 < column) {
      isProtected = protectKing(board, alliesFigures, `${i - 1}${j + 1}`);
      if (isProtected) {
        return false;
      }
      i--;
      j++;
    }

    // BACK RIGHT //////////////////////////////////////
    while (i - 1 > row && j - 1 > column) {
      isProtected = protectKing(board, alliesFigures, `${i - 1}${j - 1}`);
      if (isProtected) {
        return false;
      }
      i--;
      j--;
    }
  }

  ///////////////////////////////////////////////////////////////////
  // CHECK FROM PAWN OR KNIGHT //////////////////////////////////////////
  if (["queenBlack", "queenWhite", "rookBlack", "rookWhite"].includes(figure)) {
    // FORWARD /////////////////////////////
    while (i - 1 > row) {
      isProtected = protectKing(board, alliesFigures, `${i - 1}${j}`);
      if (isProtected) {
        return false;
      }
      i--;
    }

    // BACK ////////////////////////////////
    while (i + 1 < row) {
      isProtected = protectKing(board, alliesFigures, `${i + 1}${j}`);
      if (isProtected) {
        return false;
      }
      i++;
    }

    // RIGHT ///////////////////////////////
    while (j - 1 > column) {
      isProtected = protectKing(board, alliesFigures, `${i}${j - 1}`);
      if (isProtected) {
        return false;
      }
      j--;
    }

    // LEFT /////////////////////////////////
    while (j + 1 < column) {
      isProtected = protectKing(board, alliesFigures, `${i}${j + 1}`);
      if (isProtected) {
        return false;
      }
      j++;
    }
  }

  return true;
};
