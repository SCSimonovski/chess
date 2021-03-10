import { ChessFigure, ChessField } from "../../fixtures/chess-board";

export const findKingIndices = (
  board: Array<Array<ChessField>>,
  kingToFind: string
) => {
  let king: ChessField | undefined;
  let row = 0;
  let column = 0;

  board.some((r) => {
    king = r.find((field) => field.figure === kingToFind);

    if (king) {
      let indices = king.fieldIndices.split("");
      row = parseInt(indices[0]);
      column = parseInt(indices[1]);
    }
  });

  return [row, column];
};
