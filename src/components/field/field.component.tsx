import { useContext } from "react";
import { GameContext } from "../../context/game.context";

import Figure from "../figure/figure.component";

import { availableMoves } from "../../utils/moves/moves";
import { moveFigureAt } from "../../utils/move-figure-at";

import {
  AvailableMoves,
  ChessBoard,
  ChessFigure,
  PlayedMove,
} from "../../types/types";
import { positionToIndices } from "../../utils/board/position-to-indices";

import "./field.styles.scss";
import { boardFinalVersion } from "../../utils/board/update-board";
import {
  markAvailableMoves,
  removeMarkedMoves,
} from "../../utils/board/highlight-moves";
import { detectMob } from "../../utils/detect-mobile-browser";

let moves: AvailableMoves = {
  arr: [],
  castling: undefined,
  enPassant: undefined,
};

type Props = {
  position: string;
  title: string;
  figure: ChessFigure | null;
  color: "white" | "black";
  sendPlayedMove: any;
  board: ChessBoard;
  sideOnMove: string;
  playerSide: string;
  enPassantPosition: string;
};

let fieldsToMark: {
  selectedEl: any;
  moves: Array<string>;
} | null = null;

let prevClickedFieldEl: any;

let playedMove: PlayedMove | null = null;

const isMobile = detectMob();

const Field = ({
  title,
  figure,
  color,
  position,
  sendPlayedMove,
  board,
  sideOnMove,
  playerSide,
  enPassantPosition,
}: Props) => {
  const { setIsGameOver, playerBoardSide, setPawnPromotionData } = useContext(
    GameContext
  );

  const handleOnClick = (e: any) => {
    let elemBelow = e.currentTarget;
    if (
      prevClickedFieldEl?.firstChild?.firstChild &&
      sideOnMove === playerSide
    ) {
      let [row, column] = positionToIndices(prevClickedFieldEl.id);
      const figure = board[row][column].figure!;
      /////////////////////////////////////////////////////
      [row, column] = positionToIndices(elemBelow.id);
      const figureBelow = board[row][column].figure;
      if (figureBelow?.side === playerSide) {
        prevClickedFieldEl = elemBelow;
        return;
      }
      /////////////////////////////////////////////////////
      if (figure.side === playerSide) {
        moves = availableMoves(
          figure,
          prevClickedFieldEl.id,
          board,
          playerBoardSide,
          enPassantPosition
        );
        let move = moves.arr.find((move) => move === elemBelow.id);
        if (move) {
          const {
            pawnPromotion,
            newBoard,
            enPassantPos,
            isCheckmate,
            isCheck,
            isCastling,
          } = boardFinalVersion(
            board,
            figure,
            moves,
            move,
            prevClickedFieldEl,
            playerSide,
            setPawnPromotionData,
            elemBelow,
            playerBoardSide
          );
          if (!pawnPromotion) {
            if (isCheckmate) setIsGameOver(`${playerSide} Won by checkmate`);
            playedMove = {
              from: prevClickedFieldEl.title,
              to: elemBelow.title,
              figureTitle: figure.title,
              takenFigure: elemBelow.firstChild.id,
              isCheck,
              isCastling,
            };
            sendPlayedMove(newBoard, enPassantPos, playedMove);
          }

          if (fieldsToMark) removeMarkedMoves(fieldsToMark);
          fieldsToMark = null;
        }
        prevClickedFieldEl = null;
      }
    } else {
      prevClickedFieldEl = elemBelow;
    }
  };

  const handleStart = (e: any) => {
    if (fieldsToMark) removeMarkedMoves(fieldsToMark);

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
      if (sideOnMove === playerSide && figure.side === playerSide) {
        prevClickedFieldEl = selectedFieldEl;
        moves = availableMoves(
          figure,
          position,
          board,
          playerBoardSide,
          enPassantPosition
        );
      } else {
        moves.arr = [];
      }

      /////////////////////////////////////////////////////////////////
      fieldsToMark = {
        selectedEl: selectedFieldEl,
        moves: moves.arr,
      };
      markAvailableMoves(fieldsToMark);
      //////////////////////////////////////////////////////////////

      let x, y: number;
      if (!isMobile) {
        x = e.pageX;
        y = e.pageY;
        moveFigureAt(x, y, figureEl, boardEl);
      }

      //  On Move /////////////////////////////////////////////
      let prevElemBelow = e.currentTarget;
      prevElemBelow.classList.add("field-border");
      const onMove = (e: any) => {
        if (isMobile) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY - 50;
        } else {
          x = e.pageX;
          y = e.pageY;
        }

        moveFigureAt(x, y, figureEl, boardEl);
        elemBelow = document.elementFromPoint(x, y);
        if (elemBelow?.title === "empty") elemBelow = elemBelow.parentElement;

        if (elemBelow?.id?.length === 2 && elemBelow !== prevElemBelow) {
          prevElemBelow.classList.remove("field-border");
          elemBelow?.classList.add("field-border");
          prevElemBelow = elemBelow;
        }
      };
      document.addEventListener(isMobile ? "touchmove" : "mousemove", onMove);

      ///////////////////////////////////////////////////////////////
      // On End ////////////////////////////////////////////////
      const onEnd = () => {
        document.removeEventListener(
          isMobile ? "touchmove" : "mousemove",
          onMove
        );

        figureImgEl.style.width = "90%";
        figureImgEl.style.height = "90%";
        figureEl.style.position = "static";

        let move: string | undefined;
        move = moves.arr.find((move) => move === elemBelow?.id);
        if (move) {
          prevClickedFieldEl = null;
          const {
            pawnPromotion,
            newBoard,
            enPassantPos,
            isCheckmate,
            isCheck,
            isCastling,
          } = boardFinalVersion(
            board,
            figure,
            moves,
            move,
            selectedFieldEl,
            playerSide,
            setPawnPromotionData,
            elemBelow,
            playerBoardSide
          );

          if (fieldsToMark) removeMarkedMoves(fieldsToMark);
          fieldsToMark = null;

          if (!pawnPromotion) {
            if (isCheckmate) setIsGameOver(playerSide);

            playedMove = {
              from: selectedFieldEl.title,
              to: elemBelow.title,
              figureTitle: figure.title,
              takenFigure: elemBelow.firstChild.id,
              isCheck,
              isCastling,
            };

            sendPlayedMove(newBoard, enPassantPos, playedMove);
          }
        }

        prevElemBelow.classList.remove("field-border");
        document.removeEventListener(isMobile ? "touchend" : "mouseup", onEnd);
      };
      document.addEventListener(isMobile ? "touchend" : "mouseup", onEnd);
    }
  };

  return (
    <div
      color={color}
      className={`field ${color}`}
      id={position}
      title={title}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
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
