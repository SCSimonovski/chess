import { ChessField } from "../../fixtures/chess-board";
import { updateBoard } from "./update-board";

import { Castling, EnPassant } from "../../utils/types";

// Castling //////////////////////////////////////////////////////
export const castling = (
  board: Array<Array<ChessField>>,
  castlingInfo: Castling
) => {
  let { indicesFrom, indicesTo, kingIndices, rookSide } = castlingInfo;
  const field1 = document.getElementById(indicesFrom)!;
  const field2 = document.getElementById(indicesTo)!;

  field2.appendChild(field1.firstChild!);
  board[kingIndices.row][kingIndices.column].firstMove = false;
  board = updateBoard(board, indicesFrom, indicesTo, "empty", rookSide);

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

  board[row][column].figure = "empty";
  return board;
};
