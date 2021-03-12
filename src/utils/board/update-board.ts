import { ChessField, ChessFigure } from "../../fixtures/chess-board";
import { positionToIndices } from "./position-to-indices";

export const updateBoard = (
  board: Array<Array<ChessField>>,
  indicesFrom: string,
  indicesTo: string,
  figureFrom: ChessFigure | null,
  figureTo: ChessFigure | null
) => {
  let [row, column] = positionToIndices(indicesFrom);
  board[row][column].figure = figureFrom;

  [row, column] = positionToIndices(indicesTo);
  board[row][column].figure = figureTo;

  return board;
};
