import { ChessField, ChessFigure } from "../../fixtures/chess-board";
import { updateBoard } from "../board/update-board";
import { AvailableMoves } from "../types";
import { isCheck } from "./is-check";

export const isAllowed = (
  moves: AvailableMoves,
  board: Array<Array<ChessField>>,
  elemBelowPos: string,
  figurePos: string,
  figure: ChessFigure,
  enemyFigure: ChessFigure | null,
  enemySide: "white" | "black"
): boolean => {
  return moves.arr.some((move) => {
    if (elemBelowPos === move) {
      board = updateBoard(board, elemBelowPos, figurePos, figure, null);
      if (isCheck(board, enemySide).length === 0) {
        return true;
      }

      board = updateBoard(board, figurePos, elemBelowPos, figure, enemyFigure);
      return false;
    }
    return false;
  });
};
