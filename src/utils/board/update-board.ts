import {
  ChessBoard,
  ChessField,
  ChessFigure,
  FigureTitle,
} from "../../fixtures/chess-board";
import { isCheck } from "../moves/is-check";
import { AvailableMoves, PosPawnPromotion } from "../types";
import { castling, enPassant } from "./castling";
import { isCheckmate } from "./is-checkmate";
import { positionToIndices } from "./position-to-indices";

export const updateBoard = (
  board: Array<Array<ChessField>>,
  positionFrom: string,
  positionTo: string,
  figure: ChessFigure | null
) => {
  let updatedBoard = board.map((row, i) => {
    return row.map((column, j) => {
      if (`${i}${j}` === positionFrom) {
        return { ...column, figure: null };
      } else if (`${i}${j}` === positionTo) {
        return { ...column, figure: { ...figure!, firstMove: false } };
      }
      return { ...column };
    });
  });

  return updatedBoard;
};

///////////////////////////////////////////////////////////////////////////////

export const boardFinalVersion = (
  board: Array<Array<ChessField>>,
  figure: ChessFigure,
  moves: AvailableMoves,
  move: string,
  prevElement: any,
  mySide: string,
  handleOpenPawnPromotion: (pos: PosPawnPromotion) => void,
  elemBelow: any
) => {
  let newBoard = updateBoard(board, prevElement.id, move, figure);

  // Updating the board if the move is Castling or EnPassant //
  if (moves.castling?.position === move) {
    newBoard = castling(newBoard, moves.castling!);
  }
  if (moves.enPassant?.pawnToMovePos === move) {
    newBoard = enPassant(newBoard, moves.enPassant!);
  }
  //////////////////////////////////////////////////////////////

  // Setting position for EnPassant move //////////////////////
  let enPassantPos = -1;

  const [fromRow] = positionToIndices(prevElement.id);
  const [toRow, toColumn] = positionToIndices(move);
  if (
    figure.title === "pawn" &&
    figure.firstMove &&
    Math.abs(fromRow - toRow) === 2
  ) {
    enPassantPos = toColumn;
  }
  //////////////////////////////////////////////////////
  // Pawn Promotion ///////////////////////////////////
  if (figure.title === "pawn" && (toRow === 7 || toRow === 0)) {
    let { x, y, width, height } = elemBelow.getBoundingClientRect();
    handleOpenPawnPromotion({
      x,
      y: !toRow ? y : y - 3 * height - 48,
      width,
      height,
      fieldPos: elemBelow.id,
      direction: !toRow ? "column" : "column-reverse",
    });
  }

  // Checking for checkmate ////////////////////////////
  let checkArr = isCheck(newBoard, mySide);
  let checkmate = false;
  if (checkArr.length !== 0) {
    checkmate = isCheckmate(newBoard, mySide, checkArr);
  }
  //////////////////////////////////////////////////////

  return { newBoard, enPassantPos, checkmate };
};

export const updateBoardOnPawnPromotion = (
  board: ChessBoard,
  fieldPos: string,
  title: FigureTitle,
  mySide: string
) => {
  const newBoard = board.map((row, i) => {
    return row.map((column, j) => {
      if (`${i}${j}` === fieldPos) {
        return { ...column, figure: { ...column.figure!, title } };
      }
      return { ...column };
    });
  });

  // Checking for checkmate ////////////////////////////
  let checkArr = isCheck(newBoard, mySide);
  let checkmate = false;
  if (checkArr.length !== 0) {
    checkmate = isCheckmate(newBoard, mySide, checkArr);
  }
  //////////////////////////////////////////////////////

  return { newBoard, checkmate };
};
