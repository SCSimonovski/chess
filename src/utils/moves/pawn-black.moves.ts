import { ChessField, WHITE_FIGURES } from "../../fixtures/chess-board";
import { PrevMove, AllowedMoves, EnPassant } from "../../utils/types";

////////////////////////////////////////////////////////////////////
// BLACK pawn MOVES ////////////////////////////////////////////////
export const pawnBlackMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  prevMove: PrevMove
): AllowedMoves => {
  const arr: string[] = [];

  if (row - 1 < 0)
    return { arr: [], castling: undefined, enPassant: undefined };

  if (board[row - 1][column].figure === "empty") {
    arr.push(`${row - 1}${column}`);

    if (row === 6) {
      if (board[row - 2][column].figure === "empty") {
        arr.push(`${row - 2}${column}`);
      }
    }
  }

  if (
    column - 1 >= 0 &&
    WHITE_FIGURES.includes(board[row - 1][column - 1].figure)
  ) {
    arr.push(`${row - 1}${column - 1}`);
  }
  if (
    column + 1 <= 7 &&
    WHITE_FIGURES.includes(board[row - 1][column + 1].figure)
  ) {
    arr.push(`${row - 1}${column + 1}`);
  }

  let enPassant: EnPassant | undefined = undefined;
  if (
    prevMove.title === "pawn" &&
    prevMove.from.row === 1 &&
    prevMove.to.row === 3 &&
    row === 3
  ) {
    if (prevMove.to.column === column + 1) {
      arr.push(`${row - 1}${column + 1}`);
      enPassant = {
        pawnIndices: `${row - 1}${column + 1}`,
        position: `${row}${column + 1}`,
        row: 3,
        column: column + 1,
      };
    }
    if (prevMove.to.column === column - 1) {
      arr.push(`${row - 1}${column - 1}`);
      enPassant = {
        pawnIndices: `${row - 1}${column + 1}`,
        position: `${row}${column - 1}`,
        row: 3,
        column: column - 1,
      };
    }
  }
  return { arr: arr, castling: undefined, enPassant };
};
