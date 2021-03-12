import { ChessField } from "../../fixtures/chess-board";
import { AvailableMoves, Castling } from "../../utils/types";
import { isUnderAttack } from "./is-under-attack";

export const kingMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemySide: "white" | "black"
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

  if (board[row][column].figure!.firstMove) {
    if (
      board[row][column + 4].figure?.title === "rook" &&
      board[row][column + 4].figure?.firstMove &&
      !board[row][column + 1].figure &&
      !board[row][column + 2].figure &&
      !board[row][column + 3].figure
    ) {
      if (!isUnderAttack(board, enemySide, `${row}${column + 1}`)) {
        arr.push(`${row}${column + 2}`);
        castling = {
          position: `${row}${column + 2}`,
          rookPosFrom: `${row}${column + 4}`,
          rookPosTo: `${row}${column + 1}`,
          rook: board[row][column + 4].figure!,
        };
      }
    }

    if (
      board[row][column - 3].figure?.title === "rook" &&
      board[row][column - 3].figure?.firstMove &&
      !board[row][column - 1].figure &&
      !board[row][column - 2].figure
    ) {
      if (!isUnderAttack(board, enemySide, `${row}${column - 1}`)) {
        arr.push(`${row}${column - 2}`);
        castling = {
          position: `${row}${column - 2}`,
          rookPosFrom: `${row}${column - 3}`,
          rookPosTo: `${row}${column - 1}`,
          rook: board[row][column - 3].figure!,
        };
      }
    }
  }

  return { arr: arr, castling, enPassant: undefined };
};
