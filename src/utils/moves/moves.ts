import { ChessField, ChessFigure } from "../../fixtures/chess-board";

import { AvailableMoves } from "../../utils/types";

import { pawnMoves } from "./pawn.move";
import { rookMoves } from "./rook.moves";
import { knightMoves } from "./knight.moves";
import { bishopMoves } from "./bishop.moves";
import { queenMoves } from "./queen.moves";
import { kingMoves } from "./king.moves";
import { positionToIndices } from "../board/position-to-indices";

// ALLOWED MOVES /////////////////////////////////////////////////////
export const availableMoves = (
  figure: ChessFigure,
  field: string,
  board: Array<Array<ChessField>>,
  pawnColumn: number
): AvailableMoves => {
  let [row, column] = positionToIndices(field);
  let arr: Array<string> = [];

  let { title, side } = figure;
  const enemySide = side === "white" ? "black" : "white";

  switch (title) {
    case "pawn":
      if (side === "black") {
        return pawnMoves(board, row, column, 1, "white", pawnColumn);
      } else {
        return pawnMoves(board, row, column, -1, "black", pawnColumn);
      }

    case "rook":
      arr = rookMoves(board, row, column, enemySide);
      break;

    case "knight":
      arr = knightMoves(board, row, column, enemySide);
      break;

    case "bishop":
      arr = bishopMoves(board, row, column, enemySide);
      break;

    case "queen":
      arr = queenMoves(board, row, column, enemySide);
      break;

    case "king":
      return kingMoves(board, row, column, enemySide);
  }
  return { arr, castling: undefined, enPassant: undefined };
};
