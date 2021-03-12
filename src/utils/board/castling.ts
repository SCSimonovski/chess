import { ChessField } from "../../fixtures/chess-board";
import { updateBoard } from "./update-board";

import { Castling, EnPassant } from "../../utils/types";

// Castling //////////////////////////////////////////////////////
export const castling = (
  board: Array<Array<ChessField>>,
  castlingInfo: Castling
) => {
  let { rookPosFrom, rookPosTo, rook } = castlingInfo;
  const field1 = document.getElementById(rookPosFrom)!;
  const field2 = document.getElementById(rookPosTo)!;

  field2.appendChild(field1.firstChild!);
  board = updateBoard(board, rookPosFrom, rookPosTo, null, rook);

  return board;
};

// En Passant ////////////////////////////////////////////////
export const enPassant = (
  board: Array<Array<ChessField>>,
  enPassantInfo: EnPassant
) => {
  let { position, row, column } = enPassantInfo;
  const field = document.getElementById(position)!;
  field.removeChild(field.firstChild!);

  board[row][column].figure = null;
  return board;
};
