export type FigureTitle =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "king"
  | "queen";

export type ChessFigure = {
  title: FigureTitle;
  side: "white" | "black";
  firstMove: boolean;
};

export type ChessField = {
  title: string;
  figure: ChessFigure | null;
  color: "white" | "black";
};

export type ChessBoard = Array<Array<ChessField>>;

export type AvailableMoves = {
  arr: Array<string>;
  castling: Castling | undefined;
  enPassant: EnPassant | undefined;
};

export type Castling = {
  position: string;
  rookPosFrom: string;
  rookPosTo: string;
  rook: ChessFigure;
};

export type EnPassant = {
  pawnToMovePos: string;
  pawnToTakePos: string;
};

export type Options = {
  positionFrom: string;
  positionTo: string;
  figure: ChessFigure | null;
};

export type GameInfo = {
  room: string;
  code: string;
  time: string;
  isSpectator: boolean;

  player: {
    username: string;
    side: string;
  };

  opponent: {
    username: string;
    side: string;
  };
};

export type PlayedMoves = {
  white: string;
  black: string;
};

export type PosPawnPromotion = {
  x: number;
  y: number;
  width: number;
  height: number;
  fieldPos: string;
  direction: string;
};

export type Time = {
  timeInSeconds: number;
  minutes: any;
  seconds: any;
};

export type PlayedMove = {
  from: string;
  to: string;
  figureTitle: string;
  takenFigure: string;
  isCheck: boolean;
  isCastling: boolean;
};
