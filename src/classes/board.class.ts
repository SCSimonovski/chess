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
