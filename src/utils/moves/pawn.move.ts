import { AvailableMoves, ChessField, EnPassant } from "../../types/types";

////////////////////////////////////////////////////////////////////////
// WHITE pawn MOVES ////////////////////////////////////////////////////

export const pawnMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  n: number,
  enemySide: "white" | "black",
  enPassantPos: string
): AvailableMoves => {
  const arr: string[] = [];

  let pawn = board[row][column].figure!;

  if (row + n < 0 || row + n > 7)
    return { arr: [], castling: undefined, enPassant: undefined };

  if (!board[row + n][column].figure) {
    arr.push(`${row + n}${column}`);

    if (pawn.firstMove && !board[row + n + n][column].figure) {
      arr.push(`${row + n + n}${column}`);
    }
  }

  if (
    column + n >= 0 &&
    column + n <= 7 &&
    board[row + n][column + n].figure?.side === enemySide
  ) {
    arr.push(`${row + n}${column + n}`);
  }
  if (
    column - n <= 7 &&
    column - n >= 0 &&
    board[row + n][column - n].figure?.side === enemySide
  ) {
    arr.push(`${row + n}${column - n}`);
  }

  let enPassant: EnPassant | undefined = undefined;
  if (!!enPassantPos) {
    let pawnColumn = parseInt(
      document.querySelector(`[title=${enPassantPos}]`)!.id.split("")[1]
    );
    let pawnRow = n === 1 ? 4 : 3;

    if (pawnColumn !== -1 && row === pawnRow) {
      let r = row + n;
      let c = column + 1;
      if (pawnColumn === c) {
        arr.push(`${r}${c}`);
        enPassant = {
          pawnToMovePos: `${r}${c}`,
          pawnToTakePos: `${row}${c}`,
        };
      }

      c = column - 1;
      if (pawnColumn === c) {
        arr.push(`${r}${c}`);
        enPassant = {
          pawnToMovePos: `${r}${c}`,
          pawnToTakePos: `${row}${c}`,
        };
      }
    }
  }

  return { arr: arr, castling: undefined, enPassant: enPassant };
};
