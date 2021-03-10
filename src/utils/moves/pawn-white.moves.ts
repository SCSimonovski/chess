import { ChessField, BLACK_FIGURES } from "../../fixtures/chess-board";
import { AllowedMoves } from "../../utils/types";

////////////////////////////////////////////////////////////////////////
// WHITE pawn MOVES ////////////////////////////////////////////////////

export const pawnWhiteMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number
): AllowedMoves => {
  const arr: string[] = [];

  if (row + 1 > 7)
    return { arr: [], castling: undefined, enPassant: undefined };

  if (board[row + 1][column].figure === "empty") {
    arr.push(`${row + 1}${column}`);

    if (row === 1) {
      if (board[row + 2][column].figure === "empty") {
        arr.push(`${row + 2}${column}`);
      }
    }
  }

  if (
    column - 1 >= 0 &&
    BLACK_FIGURES.includes(board[row + 1][column - 1].figure)
  ) {
    arr.push(`${row + 1}${column - 1}`);
  }
  if (
    column + 1 <= 7 &&
    BLACK_FIGURES.includes(board[row + 1][column + 1].figure)
  ) {
    arr.push(`${row + 1}${column + 1}`);
  }

  return { arr: arr, castling: undefined, enPassant: undefined };
};
