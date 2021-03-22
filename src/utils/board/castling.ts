import { ChessField } from "../../fixtures/chess-board";
import { updateBoard } from "./update-board";

import { Castling, EnPassant } from "../../utils/types";

// Castling //////////////////////////////////////////////////////
export const castling = (
  board: Array<Array<ChessField>>,
  castlingInfo: Castling
) => {
  let { rookPosFrom, rookPosTo, rook } = castlingInfo;
  board = updateBoard(board, rookPosFrom, rookPosTo, rook);

  return board;
};

// En Passant ////////////////////////////////////////////////
export const enPassant = (
  board: Array<Array<ChessField>>,
  enPassantInfo: EnPassant
) => {
  let { pawnToTakePos } = enPassantInfo;

  return board.map((row, i) => {
    return row.map((column, j) => {
      if (`${i}${j}` === pawnToTakePos) {
        return { ...column, figure: null };
      }
      return { ...column };
    });
  });
};
