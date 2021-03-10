import {
  WHITE_FIGURES,
  BLACK_FIGURES,
  ChessField,
  ChessFigure,
} from "../../fixtures/chess-board";

import { PrevMove, AllowedMoves } from "../../utils/types";

import { pawnWhiteMoves } from "./pawn-white.moves";
import { pawnBlackMoves } from "./pawn-black.moves";
import { rookMoves } from "./rook.moves";
import { knightMoves } from "./knight.moves";
import { bishopMoves } from "./bishop.moves";
import { queenMoves } from "./queen.moves";
import { kingMoves } from "./king.moves";

// ALLOWED MOVES /////////////////////////////////////////////////////
export const allowedMoves = (
  figure: ChessFigure,
  field: string,
  board: Array<Array<ChessField>>,
  prevMove: PrevMove
): AllowedMoves => {
  const fields = field.split("");
  let row = parseInt(fields[0]);
  let column = parseInt(fields[1]);

  let arr: Array<string> = [];
  switch (figure) {
    case "pawnBlack":
      return pawnBlackMoves(board, row, column, prevMove);

    case "pawnWhite":
      return pawnWhiteMoves(board, row, column);

    case "rookWhite":
      arr = rookMoves(board, row, column, BLACK_FIGURES);
      break;

    case "rookBlack":
      arr = rookMoves(board, row, column, WHITE_FIGURES);
      break;

    case "knightWhite":
      arr = knightMoves(board, row, column, BLACK_FIGURES);
      break;

    case "knightBlack":
      arr = knightMoves(board, row, column, WHITE_FIGURES);
      break;

    case "bishopWhite":
      arr = bishopMoves(board, row, column, BLACK_FIGURES);
      break;
    case "bishopBlack":
      arr = bishopMoves(board, row, column, WHITE_FIGURES);
      break;

    case "queenWhite":
      arr = queenMoves(board, row, column, BLACK_FIGURES);
      break;
    case "queenBlack":
      arr = queenMoves(board, row, column, WHITE_FIGURES);
      break;

    case "kingWhite":
      return kingMoves(board, row, column, BLACK_FIGURES);
    case "kingBlack":
      return kingMoves(board, row, column, WHITE_FIGURES);
  }

  return { arr, castling: undefined, enPassant: undefined };
};
