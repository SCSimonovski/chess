import { ChessFigure } from "../fixtures/chessBoard";

export type AllowedMoves = {
  arr: Array<string>;
  castling: Castling | undefined;
  enPassant: EnPassant | undefined;
};

export type Castling = {
  indicesFrom: string;
  indicesTo: string;
  rookSide: ChessFigure;
  kingIndices: {
    row: number;
    column: number;
  };
};

export type EnPassant = {
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
