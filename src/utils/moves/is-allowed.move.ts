import { ChessField, ChessFigure } from "../../fixtures/chess-board";
import { updateBoard } from "../board/update-board";
import { AvailableMoves } from "../types";
import { isCheck } from "./is-check";

type IsAllowed = { allow: boolean; newBoard: Array<Array<ChessField>> | null };

export const isAllowed = (
  moves: AvailableMoves,
  board: Array<Array<ChessField>>,
  elemBelowPos: string,
  figurePos: string,
  figure: ChessFigure,
  enemySide: "white" | "black"
): IsAllowed => {
  let newBoard: Array<Array<ChessField>> | null = null;

  let allow = moves.arr.some((move) => {
    if (elemBelowPos === move) {
      newBoard = updateBoard(board, figurePos, elemBelowPos, figure);
      if (isCheck(newBoard, enemySide).length === 0) {
        return true;
      }
      return false;
    }
    return false;
  });

  return { allow, newBoard };
};
