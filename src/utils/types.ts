import { ChessFigure } from "../fixtures/chess-board";

export type AllowedMoves = {
  arr: Array<string>;
  castling: Castling | undefined;
  enPassant: EnPassant | undefined;
};

export type Castling = {
  position: string;
  indicesFrom: string;
  indicesTo: string;
  rookSide: ChessFigure;
  kingIndices: {
    row: number;
    column: number;
  };
};

export type EnPassant = {
  pawnIndices: string;
  position: string;
  row: number;
  column: number;
};

export type PrevMove = {
  title: string;
  to: {
    row: number;
    column: number;
  };

  from: {
    row: number;
    column: number;
  };
};
