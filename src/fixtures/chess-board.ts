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
  position: string;
  figure: ChessFigure | null;
  color: "white" | "black";
};

export const FIGURES = ["pawn", "rook", "knight", "bishop", "king", "queen"];

export const BOARD_MATRIX: Array<Array<ChessField>> = [
  [
    {
      position: "00",
      figure: { title: "rook", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "01",
      figure: { title: "knight", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "02",
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "03",
      figure: { title: "king", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "04",
      figure: { title: "queen", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "05",
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "06",
      figure: { title: "knight", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "07",
      figure: { title: "rook", side: "black", firstMove: true },
      color: "black",
    },
  ],
  [
    {
      position: "10",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "11",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "12",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "13",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "14",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "15",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      position: "16",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      position: "17",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
  ],
  [
    {
      position: "20",
      figure: null,
      color: "white",
    },
    {
      position: "21",
      figure: null,
      color: "black",
    },
    {
      position: "22",
      figure: null,
      color: "white",
    },
    {
      position: "23",
      figure: null,
      color: "black",
    },
    {
      position: "24",
      figure: null,
      color: "white",
    },
    {
      position: "25",
      figure: null,
      color: "black",
    },
    {
      position: "26",
      figure: null,
      color: "white",
    },
    {
      position: "27",
      figure: null,
      color: "black",
    },
  ],

  [
    {
      position: "30",
      figure: null,
      color: "black",
    },
    {
      position: "31",
      figure: null,
      color: "white",
    },
    {
      position: "32",
      figure: null,
      color: "black",
    },
    {
      position: "33",
      figure: null,
      color: "white",
    },
    {
      position: "34",
      figure: null,
      color: "black",
    },
    {
      position: "35",
      figure: null,
      color: "white",
    },
    {
      position: "36",
      figure: null,
      color: "black",
    },
    {
      position: "37",
      figure: null,
      color: "white",
    },
  ],
  [
    {
      position: "40",
      figure: null,
      color: "white",
    },
    {
      position: "41",
      figure: null,
      color: "black",
    },
    {
      position: "42",
      figure: null,
      color: "white",
    },
    {
      position: "43",
      figure: null,
      color: "black",
    },
    {
      position: "44",
      figure: null,
      color: "white",
    },
    {
      position: "45",
      figure: null,
      color: "black",
    },
    {
      position: "46",
      figure: null,
      color: "white",
    },
    {
      position: "47",
      figure: null,
      color: "black",
    },
  ],

  [
    {
      position: "50",
      figure: null,
      color: "black",
    },
    {
      position: "51",
      figure: null,
      color: "white",
    },
    {
      position: "52",
      figure: null,
      color: "black",
    },
    {
      position: "53",
      figure: null,
      color: "white",
    },
    {
      position: "54",
      figure: null,
      color: "black",
    },
    {
      position: "55",
      figure: null,
      color: "white",
    },
    {
      position: "56",
      figure: null,
      color: "black",
    },
    {
      position: "57",
      figure: null,
      color: "white",
    },
  ],
  [
    {
      position: "60",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "61",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "62",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "63",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "64",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "65",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "66",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "67",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
  ],

  [
    {
      position: "70",
      figure: { title: "rook", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "71",
      figure: { title: "knight", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "72",
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "73",
      figure: { title: "king", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "74",
      figure: { title: "queen", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "75",
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "white",
    },
    {
      position: "76",
      figure: { title: "knight", side: "white", firstMove: true },
      color: "black",
    },
    {
      position: "77",
      figure: { title: "rook", side: "white", firstMove: true },
      color: "white",
    },
  ],
];
