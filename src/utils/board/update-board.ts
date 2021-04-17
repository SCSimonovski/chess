import { isCheck } from "../moves/is-check";
import { castling, enPassant } from "./castling";
import { isCheckmate } from "./is-checkmate";
import { positionToIndices } from "./position-to-indices";

import {
  AvailableMoves,
  ChessBoard,
  ChessField,
  ChessFigure,
  FigureTitle,
} from "../../types/types";

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
  playerSide: string,
  setPawnPromotionData: (data: any) => void,
  elemBelow: any,
  playerBoardSide: string
) => {
  let newBoard = updateBoard(board, prevElement.id, move, figure);
  let isCastling = false;

  // Updating the board if the move is Castling or EnPassant //
  if (moves.castling?.position === move) {
    isCastling = true;
    newBoard = castling(newBoard, moves.castling!);
  }
  if (moves.enPassant?.pawnToMovePos === move) {
    newBoard = enPassant(newBoard, moves.enPassant!);
  }
  //////////////////////////////////////////////////////////////

  // Setting position for EnPassant move //////////////////////
  let enPassantPos = "";

  const [fromRow] = positionToIndices(prevElement.id);
  const [toRow] = positionToIndices(move);
  if (
    figure.title === "pawn" &&
    figure.firstMove &&
    Math.abs(fromRow - toRow) === 2
  ) {
    enPassantPos = elemBelow.title;
  }

  //////////////////////////////////////////////////////
  // Pawn Promotion ///////////////////////////////////
  if (figure.title === "pawn" && (toRow === 7 || toRow === 0)) {
    let { x, y, width, height } = elemBelow.getBoundingClientRect();

    setPawnPromotionData({
      x,
      y: !toRow ? y : y - 3 * height - 48,
      width,
      height,
      fieldPos: elemBelow.id,
      direction: !toRow ? "column" : "column-reverse",
      board: newBoard,
      playedMove: {
        from: prevElement.title,
        to: elemBelow.title,
        takenFigure: elemBelow.firstChild.id,
      },
    });
    return {
      pawnPromotion: true,
      newBoard: null,
      enPassantPos,
      isCheckmate: false,
      isCheck: false,
      isCastling: false,
    };
  }

  // Checking for checkmate ////////////////////////////
  const pawnsDirection = playerBoardSide === "down" ? 1 : -1;
  let checkArr = isCheck(newBoard, playerSide, pawnsDirection);
  let checkmate = false;
  if (checkArr.length !== 0) {
    checkmate = isCheckmate(newBoard, playerSide, checkArr);
  }
  //////////////////////////////////////////////////////

  return {
    pawnPromotion: false,
    newBoard,
    enPassantPos,
    isCheckmate: checkmate,
    isCheck: !!checkArr.length,
    isCastling,
  };
};

export const updateBoardOnPawnPromotion = (
  board: ChessBoard,
  fieldPos: string,
  title: FigureTitle,
  playerSide: string
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
  let checkArr = isCheck(newBoard, playerSide);
  let checkmate = false;
  if (checkArr.length !== 0) {
    checkmate = isCheckmate(newBoard, playerSide, checkArr);
  }
  //////////////////////////////////////////////////////

  return { newBoard, isCheckmate: checkmate, isCheck: !!checkArr.length };
};
