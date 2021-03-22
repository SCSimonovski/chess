import {
  ChessBoard,
  ChessField,
  ChessFigure,
} from "../../fixtures/chess-board";

import { AvailableMoves } from "../../utils/types";

import { pawnMoves } from "./pawn.move";
import { rookMoves } from "./rook.moves";
import { knightMoves } from "./knight.moves";
import { bishopMoves } from "./bishop.moves";
import { queenMoves } from "./queen.moves";
import { kingMoves } from "./king.moves";
import { positionToIndices } from "../board/position-to-indices";
import { updateBoard } from "../board/update-board";
import { isCheck } from "./is-check";

// ALLOWED MOVES /////////////////////////////////////////////////////
export const availableMoves = (
  figure: ChessFigure,
  position: string,
  board: Array<Array<ChessField>>,
  pawnColumn: number
): AvailableMoves => {
  let [row, column] = positionToIndices(position);

  let moves: AvailableMoves = {
    arr: [],
    castling: undefined,
    enPassant: undefined,
  };

  let { title, side } = figure;
  const enemySide = side === "white" ? "black" : "white";

  switch (title) {
    case "pawn":
      if (side === "black") {
        moves = pawnMoves(board, row, column, -1, "white", pawnColumn);
      } else {
        moves = pawnMoves(board, row, column, -1, "black", pawnColumn);
      }
      break;

    case "rook":
      moves.arr = rookMoves(board, row, column, enemySide);
      break;

    case "knight":
      moves.arr = knightMoves(board, row, column, enemySide);
      break;

    case "bishop":
      moves.arr = bishopMoves(board, row, column, enemySide);
      break;

    case "queen":
      moves.arr = queenMoves(board, row, column, enemySide);
      break;

    case "king":
      moves = kingMoves(board, row, column, enemySide);
  }

  let newBoard: ChessBoard;
  moves.arr = moves.arr.filter((move) => {
    newBoard = updateBoard(board, position, move, figure);
    if (isCheck(newBoard, enemySide).length === 0) {
      return true;
    }
    return false;
  });

  return moves;
};
