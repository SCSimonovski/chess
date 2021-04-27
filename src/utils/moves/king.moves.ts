import { ChessField } from "../../types/types";

import { AvailableMoves, Castling } from "../../types/types";
import { isUnderAttack } from "./is-under-attack";

export const kingMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemySide: string,
  pawnsDirection: number
): AvailableMoves => {
  const arr: string[] = [];

  const isAllowed = (r: number, c: number) => {
    if (board[r][c].figure) {
      if (board[r][c].figure!.side === enemySide) {
        arr.push(`${r}${c}`);
      }
    } else {
      arr.push(`${r}${c}`);
    }
  };

  let r = row;
  let c = column + 1;

  if (c <= 7) {
    isAllowed(r, c);
  }

  c = column - 1;
  if (c >= 0) {
    isAllowed(r, c);
  }

  //////////////////////////////////////////////////////////

  r = row - 1;
  c = column;

  if (r >= 0) {
    isAllowed(r, c);

    c = column - 1;
    if (c >= 0) {
      isAllowed(r, c);
    }

    c = column + 1;
    if (c <= 7) {
      isAllowed(r, c);
    }
  }

  //////////////////////////////////////////////

  r = row + 1;
  c = column;

  if (r <= 7) {
    isAllowed(r, c);

    c = column - 1;
    if (c >= 0) {
      isAllowed(r, c);
    }

    c = column + 1;
    if (c <= 7) {
      isAllowed(r, c);
    }
  }

  // CASTLING ////////////////////////////////////////////////////

  let castling: Castling | undefined = undefined;

  const n = column === 3 ? 1 : -1;
  if (board[row][column].figure!.firstMove) {
    if (
      board[row][column + 4 * n].figure?.title === "rook" &&
      board[row][column + 4 * n].figure?.firstMove &&
      !board[row][column + 1 * n].figure &&
      !board[row][column + 2 * n].figure &&
      !board[row][column + 3 * n].figure
    ) {
      if (
        !isUnderAttack(
          board,
          enemySide,
          `${row}${column + 1 * n}`,
          pawnsDirection
        )
      ) {
        arr.push(`${row}${column + 2 * n}`);
        castling = {
          position: `${row}${column + 2 * n}`,
          rookPosFrom: `${row}${column + 4 * n}`,
          rookPosTo: `${row}${column + 1 * n}`,
          rook: board[row][column + 4 * n].figure!,
        };
      }
    }

    if (
      board[row][column - 3 * n].figure?.title === "rook" &&
      board[row][column - 3 * n].figure?.firstMove &&
      !board[row][column - 1 * n].figure &&
      !board[row][column - 2 * n].figure
    ) {
      if (
        !isUnderAttack(
          board,
          enemySide,
          `${row}${column - 1 * n}`,
          pawnsDirection
        )
      ) {
        arr.push(`${row}${column - 2 * n}`);
        castling = {
          position: `${row}${column - 2 * n}`,
          rookPosFrom: `${row}${column - 3 * n}`,
          rookPosTo: `${row}${column - 1 * n}`,
          rook: board[row][column - 3 * n].figure!,
        };
      }
    }
  }

  return { arr: arr, castling, enPassant: undefined };
};
