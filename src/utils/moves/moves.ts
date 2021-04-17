import { ChessBoard, ChessField, ChessFigure } from "../../types/types";

import { AvailableMoves } from "../../types/types";

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
  playerBoardSide: string,
  enPassantPosition: string
): AvailableMoves => {
  let [row, column] = positionToIndices(position);

  let moves: AvailableMoves = {
    arr: [],
    castling: undefined,
    enPassant: undefined,
  };

  let { title, side } = figure;
  const enemySide = side === "white" ? "black" : "white";
  const pawnsDirection = playerBoardSide === "up" ? 1 : -1;

  switch (title) {
    case "pawn":
      if (side === "black") {
        moves = pawnMoves(
          board,
          row,
          column,
          pawnsDirection,
          "white",
          enPassantPosition
        );
      } else {
        moves = pawnMoves(
          board,
          row,
          column,
          pawnsDirection,
          "black",
          enPassantPosition
        );
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
    if (isCheck(newBoard, enemySide, pawnsDirection).length === 0) {
      return true;
    }
    return false;
  });

  return moves;
};
