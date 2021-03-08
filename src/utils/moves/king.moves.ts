import { ChessField } from "../../fixtures/chessBoard";
import { isCheck } from "./isCheck";
import { AllowedMoves, Castling } from "../../utils/types";

export const kingMoves = (
  board: Array<Array<ChessField>>,
  row: number,
  column: number,
  enemyFigures: Array<string>
): AllowedMoves => {
  const arr: string[] = [];

  let r = row - 1;
  let c = column;
  if (r >= 0) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }
    } else {
      arr.push(`${r}${c}`);
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (enemyFigures.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      } else {
        arr.push(`${r}${c}`);
      }
    }

    c = column + 1;
    if (c <= 7) {
      if (board[r][c].figure !== "empty") {
        if (enemyFigures.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      } else {
        arr.push(`${r}${c}`);
      }
    }
  }

  r = row + 1;
  c = column;
  if (r <= 7) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }
    } else {
      arr.push(`${r}${c}`);
    }

    c = column - 1;
    if (c >= 0) {
      if (board[r][c].figure !== "empty") {
        if (enemyFigures.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      } else {
        arr.push(`${r}${c}`);
      }
    }

    c = column + 1;
    if (c <= 7) {
      if (board[r][c].figure !== "empty") {
        if (enemyFigures.includes(board[r][c].figure)) {
          arr.push(`${r}${c}`);
        }
      } else {
        arr.push(`${r}${c}`);
      }
    }
  }

  r = row;
  c = column + 1;

  if (c <= 7) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }
    } else {
      arr.push(`${r}${c}`);
    }
  }

  c = column - 1;
  if (c >= 0) {
    if (board[r][c].figure !== "empty") {
      if (enemyFigures.includes(board[r][c].figure)) {
        arr.push(`${r}${c}`);
      }
    } else {
      arr.push(`${r}${c}`);
    }
  }

  // CASTLING ////////////////////////////////////////////////////

  let castling: Castling | undefined = undefined;

  if (
    board[row][column].firstMove &&
    ["03", "73"].includes(`${row}${column}`)
  ) {
    if (
      board[row][column + 1].figure === "empty" &&
      board[row][column + 2].figure === "empty" &&
      board[row][column + 3].figure === "empty" &&
      board[row][column + 4].firstMove
    ) {
      if (isCheck(board, enemyFigures, `${row}${column + 1}`).length === 0) {
        arr.push(`${row}${column + 2}`);
        castling = {
          indicesFrom: `${row}${column + 4}`,
          indicesTo: `${row}${column + 1}`,
          rookSide: board[row][column + 4].figure,
          kingIndices: {
            row,
            column,
          },
        };
      }
    }

    if (
      board[row][column - 1].figure === "empty" &&
      board[row][column - 2].figure === "empty" &&
      board[row][column - 3].firstMove
    ) {
      if (isCheck(board, enemyFigures, `${row}${column - 1}`).length === 0) {
        arr.push(`${row}${column - 2}`);
        castling = {
          indicesFrom: `${row}${column - 3}`,
          indicesTo: `${row}${column - 1}`,
          rookSide: board[row][column - 3].figure,
          kingIndices: {
            row,
            column,
          },
        };
      }
    }
  }

  return { arr: arr, castling, enPassant: undefined };
};
