export type ChessFigure =
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

export type ChessField = {
  title: string;
  fieldIndices: string;
  figure: ChessFigure;
  firstMove: boolean;
  color: "white" | "black";
};

export const WHITE_FIGURES = [
  "pawnWhite",
  "rookWhite",
  "knightWhite",
  "bishopWhite",
  "kingWhite",
  "queenWhite",
];

export const BLACK_FIGURES = [
  "pawnBlack",
  "rookBlack",
  "knightBlack",
  "bishopBlack",
  "kingBlack",
  "queenBlack",
];

export class Board {
  fields: Array<Array<Field>>;
  constructor(fields: Array<Array<Field>>) {
    this.fields = fields;
  }
}

class Field {
  position: string;
  color: "black" | "white";
  figure: Figure | undefined;

  constructor(
    position: string,
    color: "black" | "white",
    figure: Figure | undefined
  ) {
    this.position = position;
    this.color = color;
    this.figure = figure;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
  }
}

class Figure {
  title: string;
  position: string;
  side: "black" | "white";
  firstMove: boolean;

  constructor(title: string, side: "black" | "white", position: string) {
    this.title = title;
    this.side = side;
    this.position = position;
    this.firstMove = false;
  }
}

let arr: Array<Array<Field>> = [];
let white = true;

for (let i = 0; i < 8; i++) {
  arr.push([]);
  for (let j = 0; j < 8; j++) {
    if (white) {
      const field = new Field(`${i}${j}`, "white", undefined);
      arr[i].push(field);
    } else {
      const field = new Field(`${i}${j}`, "black", undefined);
      arr[i].push(field);
    }
    white = !white;
  }
  white = !white;
}

const board = new Board(arr);
const titles = [
  "rook",
  "knight",
  "bishop",
  "king",
  "queen",
  "rook",
  "knight",
  "bishop",
];

board.fields[1].forEach((field, index) => {
  field.setFigure(new Figure("pawn", "white", `${1}${index}`));
});
board.fields[0].forEach((field, index) => {
  field.setFigure(new Figure(titles[index], "white", `${1}${index}`));
});

board.fields[6].forEach((field, index) => {
  field.setFigure(new Figure("pawn", "black", `${1}${index}`));
});
board.fields[7].forEach((field, index) => {
  field.setFigure(new Figure(titles[index], "white", `${1}${index}`));
});

console.log(board);

export const BOARD_MATRIX: Array<Array<ChessField>> = [
  [
    {
      title: "a7",
      fieldIndices: "07",
      figure: "rookWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "17",
      fieldIndices: "17",
      figure: "knightWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "c7",
      fieldIndices: "27",
      figure: "bishopWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "d7",
      fieldIndices: "37",
      figure: "kingWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "e7",
      fieldIndices: "47",
      figure: "queenWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "f7",
      fieldIndices: "57",
      figure: "bishopWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "g7",
      fieldIndices: "67",
      figure: "knightWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "h7",
      fieldIndices: "77",
      figure: "rookWhite",
      firstMove: true,
      color: "black",
    },
  ],
  [
    {
      title: "a6",
      fieldIndices: "06",
      figure: "pawnWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "16",
      fieldIndices: "16",
      figure: "pawnWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "c6",
      fieldIndices: "26",
      figure: "pawnWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "d6",
      fieldIndices: "36",
      figure: "pawnWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "e6",
      fieldIndices: "46",
      figure: "pawnWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "f6",
      fieldIndices: "56",
      figure: "pawnWhite",
      firstMove: true,
      color: "white",
    },
    {
      title: "g6",
      fieldIndices: "66",
      figure: "pawnWhite",
      firstMove: true,
      color: "black",
    },
    {
      title: "h6",
      fieldIndices: "76",
      figure: "pawnWhite",
      firstMove: true,
      color: "white",
    },
  ],
  [
    {
      title: "a5",
      fieldIndices: "05",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "15",
      fieldIndices: "15",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "c5",
      fieldIndices: "25",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "d5",
      fieldIndices: "35",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "e5",
      fieldIndices: "45",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "f5",
      fieldIndices: "55",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "g5",
      fieldIndices: "65",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "h5",
      fieldIndices: "75",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
  ],

  [
    {
      title: "a4",
      fieldIndices: "04",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "14",
      fieldIndices: "14",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "c4",
      fieldIndices: "24",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "d4",
      fieldIndices: "34",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "e4",
      fieldIndices: "44",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "f4",
      fieldIndices: "54",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "g4",
      fieldIndices: "64",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "h4",
      fieldIndices: "74",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
  ],
  [
    {
      title: "a3",
      fieldIndices: "03",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "13",
      fieldIndices: "13",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "c3",
      fieldIndices: "23",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "d3",
      fieldIndices: "33",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "e3",
      fieldIndices: "43",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "f3",
      fieldIndices: "53",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "g3",
      fieldIndices: "63",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "h3",
      fieldIndices: "73",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
  ],

  [
    {
      title: "a2",
      fieldIndices: "02",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "12",
      fieldIndices: "12",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "c2",
      fieldIndices: "22",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "d2",
      fieldIndices: "32",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "e2",
      fieldIndices: "42",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "f2",
      fieldIndices: "52",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
    {
      title: "g2",
      fieldIndices: "62",
      figure: "empty",
      firstMove: true,
      color: "black",
    },
    {
      title: "h2",
      fieldIndices: "72",
      figure: "empty",
      firstMove: true,
      color: "white",
    },
  ],
  [
    {
      title: "a1",
      fieldIndices: "01",
      figure: "pawnBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "b1",
      fieldIndices: "11",
      figure: "pawnBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "c1",
      fieldIndices: "21",
      figure: "pawnBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "d1",
      fieldIndices: "31",
      figure: "pawnBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "e1",
      fieldIndices: "41",
      figure: "pawnBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "f1",
      fieldIndices: "51",
      figure: "pawnBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "g1",
      fieldIndices: "61",
      figure: "pawnBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "h1",
      fieldIndices: "71",
      figure: "pawnBlack",
      firstMove: true,
      color: "black",
    },
  ],

  [
    {
      title: "a0",
      fieldIndices: "00",
      figure: "rookBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "10",
      fieldIndices: "10",
      figure: "knightBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "c0",
      fieldIndices: "20",
      figure: "bishopBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "d0",
      fieldIndices: "30",
      figure: "kingBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "e0",
      fieldIndices: "40",
      figure: "queenBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "f0",
      fieldIndices: "50",
      figure: "bishopBlack",
      firstMove: true,
      color: "white",
    },
    {
      title: "g0",
      fieldIndices: "60",
      figure: "knightBlack",
      firstMove: true,
      color: "black",
    },
    {
      title: "h0",
      fieldIndices: "70",
      figure: "rookBlack",
      firstMove: true,
      color: "white",
    },
  ],
];
