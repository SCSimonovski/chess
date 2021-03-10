import { ChessFigure, ChessField } from "../../fixtures/chess-board";

export const updateBoard = (
  board: Array<Array<ChessField>>,
  indicesFrom: string,
  indicesTo: string,
  figureFrom: ChessFigure,
  figureTo: ChessFigure
) => {
  let indices = indicesFrom.split("");
  let row = parseInt(indices[0]);
  let column = parseInt(indices[1]);
  board[row][column] = { ...board[row][column], figure: figureFrom };

  indices = indicesTo.split("");
  row = parseInt(indices[0]);
  column = parseInt(indices[1]);
  board[row][column] = { ...board[row][column], figure: figureTo };

  return board;
};
