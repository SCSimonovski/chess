import { ChessFigure } from "../fixtures/chess-board";

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

  player: {
    username: string;
    side: string;
  };

  opponent: {
    username: string;
    side: string;
  };
};

export const GameInfoDefault = {
  room: "",
  code: "",
  player: {
    username: "",
    side: "",
  },

  opponent: {
    username: "",
    side: "",
  },
};

export const DefaultActiveGames = [
  {
    room: "IAgainstI",
    isPlaying: false,
  },
  {
    room: "UndeAverage",
    isPlaying: true,
  },
  {
    room: "GlobalDomination",
    isPlaying: true,
  },
  {
    room: "BobyFisher",
    isPlaying: false,
  },
];

export type MovesPlayed = {
  white: string;
  black: string;
};

export const DefaultMovesPlayed = [
  {
    white: "e4",
    black: "b3",
  },
  {
    white: "Nc5",
    black: "Qe7",
  },
  {
    white: "O-O-O",
    black: "c5",
  },
  {
    white: "bxc5",
    black: "Rxf8+",
  },
];

export type PosPawnPromotion = {
  x: number;
  y: number;
  width: number;
  height: number;
  fieldPos: string;
  direction: string;
};
