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
  figure: ChessFigure | null;
  color: "white" | "black";
};

export type ChessBoard = Array<Array<ChessField>>;

export const FIGURES = ["pawn", "rook", "knight", "bishop", "king", "queen"];

export const BOARD_NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];
export const BOARD_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const BOARD_MATRIX: ChessBoard = [
  [
    {
      figure: { title: "rook", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "knight", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "queen", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "king", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "knight", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "rook", side: "black", firstMove: true },
      color: "black",
    },
  ],
  [
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
  ],
  [
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
  ],

  [
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
  ],
  [
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
  ],

  [
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
    {
      figure: null,
      color: "black",
    },
    {
      figure: null,
      color: "white",
    },
  ],
  [
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
  ],

  [
    {
      figure: { title: "rook", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "knight", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "queen", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "king", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "white",
    },
    {
      figure: { title: "knight", side: "white", firstMove: true },
      color: "black",
    },
    {
      figure: { title: "rook", side: "white", firstMove: true },
      color: "white",
    },
  ],
];
