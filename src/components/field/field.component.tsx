import { useContext } from "react";
import { GameContext } from "../../context/game.context";

import Figure from "../figure/figure.component";

import { ChessBoard, ChessFigure } from "../../fixtures/chess-board";

import { availableMoves } from "../../utils/moves/moves";
import { moveFigureAt } from "../../utils/move-figure-at";

import { AvailableMoves, PosPawnPromotion } from "../../utils/types";
import { positionToIndices } from "../../utils/board/position-to-indices";

import "./field.styles.scss";
import { boardFinalVersion } from "../../utils/board/update-board";
import {
  highlightMoves,
  removeHighlightedMoves,
  highlightPlayedMove,
  removePrevMoveHighlight,
} from "../../utils/board/highlight-moves";

let moves: AvailableMoves = {
  arr: [],
  castling: undefined,
  enPassant: undefined,
};

type Props = {
  position: string;
  figure: ChessFigure | null;
  color: "white" | "black";
  sendPlayedMoves: any;
  board: ChessBoard;
  handleSetBoard: any;
  isMyTurn: boolean;
  mySide: string;
  enPassantPosition: number;
  handleOpenPawnPromotion: (pos: PosPawnPromotion) => void;
};

let prevPlayedMove: {
  from: string;
  to: string;
} | null = null;

let highlightedMoves: {
  selectedEl: any;
  moves: Array<string>;
} | null = null;

let prevClickedFieldEl: any;

const Field = ({
  figure,
  color,
  position,
  sendPlayedMoves,
  board,
  handleSetBoard,
  isMyTurn,
  mySide,
  enPassantPosition,
  handleOpenPawnPromotion,
}: Props) => {
  const { setIsGameOver } = useContext(GameContext);
  const handleOnClick = (e: any) => {
    let elemBelow = e.currentTarget;

    if (prevClickedFieldEl?.firstChild?.firstChild && (isMyTurn || true)) {
      let [row, column] = positionToIndices(prevClickedFieldEl.id);
      const figure = board[row][column].figure!;

      /////////////////////////////////////////////////////
      [row, column] = positionToIndices(elemBelow.id);
      const figureBelow = board[row][column].figure;
      if (figureBelow?.side === mySide) {
        prevClickedFieldEl = elemBelow;
        return;
      }
      /////////////////////////////////////////////////////

      if (figure.side === mySide) {
        moves = availableMoves(
          figure,
          prevClickedFieldEl.id,
          board,
          enPassantPosition
        );
        let move = moves.arr.find((move) => move === elemBelow.id);

        if (move) {
          const { newBoard, enPassantPos, checkmate } = boardFinalVersion(
            board,
            figure,
            moves,
            move,
            prevClickedFieldEl,
            mySide,
            handleOpenPawnPromotion,
            elemBelow
          );

          if (checkmate) setIsGameOver(mySide);

          prevPlayedMove = {
            from: prevClickedFieldEl.id,
            to: elemBelow.id,
          };

          highlightPlayedMove(prevPlayedMove);

          handleSetBoard(newBoard);
          sendPlayedMoves(newBoard, enPassantPos);
        }
        prevClickedFieldEl = null;
      }
    } else {
      prevClickedFieldEl = elemBelow;
    }
  };

  const onMouseDown = (e: any) => {
    if (highlightedMoves) removeHighlightedMoves(highlightedMoves);
    if (prevPlayedMove) removePrevMoveHighlight(prevPlayedMove);

    if (e.currentTarget.firstChild.firstChild) {
      let elemBelow = e.currentTarget;
      const selectedFieldEl = elemBelow;
      const boardEl = elemBelow.parentElement.parentElement;
      const figureEl = e.currentTarget.firstChild;

      /*Setting the width and the height of the picked figure
            to not expand more than its original size when position is absolute */
      const figureImgEl = figureEl.firstChild;
      const { width, height } = figureImgEl.getBoundingClientRect();
      figureImgEl.style.width = width + "px";
      figureImgEl.style.height = height + "px";
      figureEl.style.position = "absolute";
      ////////////////////////////////////////////////////////////////

      const [row, column] = positionToIndices(position);
      const figure = board[row][column].figure!;
      if ((isMyTurn || true) && figure.side === mySide) {
        prevClickedFieldEl = selectedFieldEl;
        moves = availableMoves(figure, position, board, enPassantPosition);
      } else {
        moves.arr = [];
      }

      /////////////////////////////////////////////////////////////////
      highlightedMoves = {
        selectedEl: selectedFieldEl,
        moves: moves.arr,
      };
      highlightMoves(highlightedMoves);
      //////////////////////////////////////////////////////////////

      const { pageX, pageY } = e;
      moveFigureAt(pageX, pageY, figureEl, elemBelow);

      //  On Mouse Move /////////////////////////////////////////////
      let prevElemBelow = e.currentTarget;
      prevElemBelow.classList.add("field-border");
      const onMouseMove = (e: any) => {
        const { pageX, pageY } = e;
        moveFigureAt(pageX, pageY, figureEl, boardEl);
        elemBelow = document.elementFromPoint(pageX, pageY);
        if (elemBelow?.title === "empty") elemBelow = elemBelow.parentElement;

        if (elemBelow?.id?.length === 2 && elemBelow !== prevElemBelow) {
          prevElemBelow.classList.remove("field-border");
          elemBelow?.classList.add("field-border");
          prevElemBelow = elemBelow;
        }
      };
      document.addEventListener("mousemove", onMouseMove);

      ///////////////////////////////////////////////////////////////
      // On Mouse Up ////////////////////////////////////////////////
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);

        figureImgEl.style.width = "90%";
        figureImgEl.style.height = "90%";
        figureEl.style.position = "static";

        let move: string | undefined;
        move = moves.arr.find((move) => move === elemBelow?.id);
        if (move) {
          prevClickedFieldEl = null;
          const { newBoard, enPassantPos, checkmate } = boardFinalVersion(
            board,
            figure,
            moves,
            move,
            selectedFieldEl,
            mySide,
            handleOpenPawnPromotion,
            elemBelow
          );

          if (checkmate) setIsGameOver(mySide);

          prevPlayedMove = {
            from: selectedFieldEl.id,
            to: elemBelow.id,
          };

          if (highlightedMoves) removeHighlightedMoves(highlightedMoves);
          highlightedMoves = null;

          highlightPlayedMove(prevPlayedMove);

          handleSetBoard(newBoard);
          sendPlayedMoves(newBoard, enPassantPos, prevPlayedMove);
        }

        prevElemBelow.classList.remove("field-border");
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  return (
    <div
      color={color}
      className={`field ${color}`}
      id={position}
      onMouseDown={onMouseDown}
      onClick={handleOnClick}
      draggable="false"
    >
      {figure ? (
        <Figure title={figure.title} side={figure.side} />
      ) : (
        <div title="empty" className="field-empty"></div>
      )}
    </div>
  );
};

export default Field;
