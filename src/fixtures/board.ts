export type chessFigure =
  | "pawnBlack"
  | "pawnWhite"
  | "rookBlack"
  | "rookWhite"
  | "knightBlack"
  | "knightWhite"
  | "bishopBlack"
  | "bishopWhite"
  | "kingBlack"
  | "kingWhite"
  | "queenBlack"
  | "queenWhite"
  | "empty";

export const boardMatrix = [
  [
    {
      title: "a8",
      figure: "rookWhite",
      value: "",
      color: "white",
    },
    {
      title: "b8",
      figure: "knightWhite",
      value: "",
      color: "black",
    },
    {
      title: "c8",
      figure: "bishopWhite",
      value: "",
      color: "white",
    },
    {
      title: "d8",
      figure: "kingWhite",
      value: "",
      color: "black",
    },
    {
      title: "e8",
      figure: "queenWhite",
      value: "",
      color: "white",
    },
    {
      title: "f8",
      figure: "bishopWhite",
      value: "",
      color: "black",
    },
    {
      title: "g8",
      figure: "knightWhite",
      value: "",
      color: "white",
    },
    {
      title: "h8",
      figure: "rookWhite",
      value: "",
      color: "black",
    },
  ],
  [
    {
      title: "a7",
      figure: "pawnWhite",
      value: "",
      color: "black",
    },
    {
      title: "b7",
      figure: "pawnWhite",
      value: "",
      color: "white",
    },
    {
      title: "c7",
      figure: "pawnWhite",
      value: "",
      color: "black",
    },
    {
      title: "d7",
      figure: "pawnWhite",
      value: "",
      color: "white",
    },
    {
      title: "e7",
      figure: "pawnWhite",
      value: "",
      color: "black",
    },
    {
      title: "f7",
      figure: "pawnWhite",
      value: "",
      color: "white",
    },
    {
      title: "g7",
      figure: "pawnWhite",
      value: "",
      color: "black",
    },
    {
      title: "h7",
      figure: "pawnWhite",
      value: "",
      color: "white",
    },
  ],
  [
    {
      title: "a6",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "b6",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "c6",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "d6",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "e6",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "f6",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "g6",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "h6",
      figure: "empty",
      value: "",
      color: "black",
    },
  ],

  [
    {
      title: "a5",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "b5",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "c5",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "d5",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "e5",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "f5",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "g5",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "h5",
      figure: "empty",
      value: "",
      color: "white",
    },
  ],
  [
    {
      title: "a4",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "b4",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "c4",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "d4",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "e4",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "f4",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "g4",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "h4",
      figure: "empty",
      value: "",
      color: "black",
    },
  ],

  [
    {
      title: "a3",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "b3",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "c3",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "d3",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "e3",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "f3",
      figure: "empty",
      value: "",
      color: "white",
    },
    {
      title: "g3",
      figure: "empty",
      value: "",
      color: "black",
    },
    {
      title: "h3",
      figure: "empty",
      value: "",
      color: "white",
    },
  ],
  [
    {
      title: "a2",
      figure: "pawnBlack",
      value: "",
      color: "white",
    },
    {
      title: "b2",
      figure: "pawnBlack",
      value: "",
      color: "black",
    },
    {
      title: "c2",
      figure: "pawnBlack",
      value: "",
      color: "white",
    },
    {
      title: "d2",
      figure: "pawnBlack",
      value: "",
      color: "black",
    },
    {
      title: "e2",
      figure: "pawnBlack",
      value: "",
      color: "white",
    },
    {
      title: "f2",
      figure: "pawnBlack",
      value: "",
      color: "black",
    },
    {
      title: "g2",
      figure: "pawnBlack",
      value: "",
      color: "white",
    },
    {
      title: "h2",
      figure: "pawnBlack",
      value: "",
      color: "black",
    },
  ],

  [
    {
      title: "a1",
      figure: "rookBlack",
      value: "",
      color: "black",
    },
    {
      title: "b1",
      figure: "knightBlack",
      value: "",
      color: "white",
    },
    {
      title: "c1",
      figure: "bishopBlack",
      value: "",
      color: "black",
    },
    {
      title: "d1",
      figure: "queenBlack",
      value: "",
      color: "white",
    },
    {
      title: "e1",
      figure: "kingBlack",
      value: "",
      color: "black",
    },
    {
      title: "f1",
      figure: "bishopBlack",
      value: "",
      color: "white",
    },
    {
      title: "g1",
      figure: "knightBlack",
      value: "",
      color: "black",
    },
    {
      title: "h1",
      figure: "rookBlack",
      value: "",
      color: "white",
    },
  ],
];
