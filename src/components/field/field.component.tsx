import Figure from "../figure/figure.component";
import { BOARD_MATRIX, ChessField } from "../../fixtures/chess-board";

import { availableMoves } from "../../utils/moves/moves";
import { isCheck } from "../../utils/moves/is-check";
import { isCheckmate } from "../../utils/board/is-checkmate";
import { moveFigureAt } from "../../utils/move-figure-at";
import { castling, enPassant } from "../../utils/board/castling";

import { AvailableMoves } from "../../utils/types";
import { positionToIndices } from "../../utils/board/position-to-indices";

import "./field.styles.scss";
import { isAllowed } from "../../utils/moves/is-allowed.move";

let board = BOARD_MATRIX;
let sideOnMove = "white";
let pawnColumn = -1;

let moves: AvailableMoves = {
  arr: [],
  castling: undefined,
  enPassant: undefined,
};

let checkArr: Array<string> = [];

const Field = ({ figure, color, position }: ChessField) => {
  const onMouseDown = (e: any) => {
    if (e.currentTarget.firstChild) {
      const divFigure = e.currentTarget.firstChild;
      divFigure.style.position = "absolute";

      const [row, column] = positionToIndices(position);

      const figure = board[row][column].figure!;
      const enemySide = figure.side === "white" ? "black" : "white";

      let elemBelow = e.currentTarget;

      const { pageX, pageY } = e;
      moveFigureAt(pageX, pageY, divFigure, elemBelow);

      //  On Mouse Move /////////////////////////////////////////////
      const onMouseMove = (e: any) => {
        const { pageX, pageY } = e;
        moveFigureAt(pageX, pageY, divFigure, elemBelow);
        elemBelow = document.elementFromPoint(pageX, pageY);
      };
      document.addEventListener("mousemove", onMouseMove);

      // On Mouse Up ////////////////////////////////////////////////
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        divFigure.style.position = "static";

        let [i, j] = positionToIndices(elemBelow.id);
        let enemyFigure = board[i][j].figure;
        let allow = false;

        if (
          figure.side === sideOnMove &&
          elemBelow?.id.length === 2 &&
          elemBelow.id !== position
        ) {
          moves = availableMoves(figure, position, board, pawnColumn);
          allow = isAllowed(
            moves,
            board,
            elemBelow.id,
            position,
            figure,
            enemyFigure,
            enemySide
          );
        }

        if (allow) {
          if (moves.castling?.position === elemBelow.id) {
            board = castling(board, moves.castling!);
          }

          if (moves.enPassant?.pawnIndices === elemBelow.id) {
            board = enPassant(board, moves.enPassant!);
          }

          if (figure.title === "pawn" && figure.firstMove) {
            pawnColumn = j;
          } else {
            pawnColumn = -1;
          }

          checkArr = isCheck(board, enemySide);
          if (checkArr.length !== 0) {
            let checkmate = isCheckmate(board, enemySide, checkArr);

            if (checkmate) {
              console.log("CHECKMATE!!! Game is Over!");
            }
          }

          board[i][j].figure!.firstMove = false;
          sideOnMove = sideOnMove === "white" ? "black" : "white";

          if (elemBelow.firstChild) {
            elemBelow.removeChild(elemBelow.firstChild);
          }
          elemBelow.appendChild(divFigure);
        }
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  return (
    <div
      className={`field ${color}`}
      id={position}
      onMouseDown={onMouseDown}
      draggable="false"
    >
      {figure && <Figure title={figure.title} side={figure.side} />}
    </div>
  );
};

export default Field;
