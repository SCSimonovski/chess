import { ChessField } from "../../fixtures/chess-board";
import { AvailableMoves, EnPassant } from "../types";

////////////////////////////////////////////////////////////////////////
// WHITE pawn MOVES ////////////////////////////////////////////////////

export const pawnMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  n: number,
  enemySide: "white" | "black",
  pawnColumn: number
): AvailableMoves => {
  const arr: string[] = [];

  let pawn = board[row][column].figure!;

  if (row + n < 0)
    return { arr: [], castling: undefined, enPassant: undefined };

  if (!board[row + n][column].figure) {
    arr.push(`${row + n}${column}`);

    if (pawn.firstMove && !board[row + n + n][column].figure) {
      arr.push(`${row + n + n}${column}`);
    }
  }

  if (
    column + n >= 0 &&
    board[row + n][column + n].figure?.side === enemySide
  ) {
    arr.push(`${row + n}${column + n}`);
  }
  if (
    column - n <= 7 &&
    board[row + n][column - n].figure?.side === enemySide
  ) {
    arr.push(`${row + n}${column - n}`);
  }

  let enPassant: EnPassant | undefined = undefined;
  let pawnRow = enemySide === "white" ? 4 : 3;
  if (pawnColumn !== -1 && row === pawnRow) {
    let r = row + n;
    let c = column + 1;
    if (pawnColumn === c) {
      arr.push(`${r}${c}`);
      enPassant = {
        pawnIndices: `${r}${c}`,
        position: `${row}${c}`,
        row: row,
        column: c,
      };
    }

    c = column - 1;
    if (pawnColumn === c) {
      arr.push(`${r}${c}`);
      enPassant = {
        pawnIndices: `${r}${c}`,
        position: `${row}${c}`,
        row: row,
        column: c,
      };
    }
  }

  //   if (row - 1 < 0)
  //     return { arr: [], castling: undefined, enPassant: undefined };

  //   if (!board[row - 1][column].figure) {
  //     arr.push(`${row - 1}${column}`);

  //     if (row === 6) {
  //       if (!board[row - 2][column].figure) {
  //         arr.push(`${row - 2}${column}`);
  //       }
  //     }
  //   }

  //   if (column - 1 >= 0 && board[row - 1][column - 1].figure?.side === "black") {
  //     arr.push(`${row - 1}${column - 1}`);
  //   }
  //   if (column + 1 <= 7 && board[row - 1][column + 1].figure?.side === "black") {
  //     arr.push(`${row - 1}${column + 1}`);
  //   }

  return { arr: arr, castling: undefined, enPassant: enPassant };
};
