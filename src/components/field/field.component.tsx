import Figure from "../figure/figure.component";
import {
  BLACK_FIGURES,
  BOARD_MATRIX,
  ChessFigure,
  WHITE_FIGURES,
} from "../../fixtures/chess-board";

import { allowedMoves } from "../../utils/moves/moves";
import { isCheck } from "../../utils/moves/is-check";
import { isCheckmate } from "../../utils/board/is-checkmate";
import { updateBoard } from "../../utils/board/update-board";
import { castling, enPassant } from "../../utils/board/castling";

import { AllowedMoves, EnPassant, PrevMove } from "../../utils/types";

import "./field.styles.scss";

type FieldProps = {
  title: string;
  figure: ChessFigure;
  color: string;
  fieldIndices: string;
};

let whiteOnMove = true;

let prevMove: PrevMove;

let board = BOARD_MATRIX;

const Field = ({ figure, color, fieldIndices }: FieldProps) => {
  // const [board, setBoard] = useState(BOARD_MATRIX);

  const onMouseDown = (e: any) => {
    if (e.currentTarget.firstChild) {
      const divFigure = e.currentTarget.firstChild;
      divFigure.style.position = "absolute";

      const fields = fieldIndices.split("");
      let row = parseInt(fields[0]);
      let column = parseInt(fields[1]);

      const figureInfo = board[row][column];
      const figure = figureInfo.figure;

      let movesToPlay: AllowedMoves = {
        arr: [],
        castling: undefined,
        enPassant: undefined,
      };
      let checkArr: Array<string> = [];

      if (figure.includes("White") && whiteOnMove) {
        movesToPlay = allowedMoves(divFigure.id, fieldIndices, board, prevMove);
      } else if (figure.includes("Black") && !whiteOnMove) {
        movesToPlay = allowedMoves(divFigure.id, fieldIndices, board, prevMove);
      }

      let elemBelow = e.currentTarget;
      let boardElem = elemBelow.parentElement.parentElement;
      let { x, y, width, height } = boardElem.getBoundingClientRect();

      const { pageX, pageY } = e;
      const moveAt = (pageX: number, pageY: number) => {
        if (pageX > x && pageX < x + width) {
          divFigure.style.left = pageX - divFigure.offsetWidth / 2 + "px";
        }
        if (pageY > y && pageY < y + height) {
          divFigure.style.top = pageY - divFigure.offsetHeight / 2 + "px";
        }
      };
      moveAt(pageX, pageY);

      //  On Mouse Move ///////////////////////////////
      const onMouseMove = (e: any) => {
        moveAt(e.pageX, e.pageY);
        elemBelow = document.elementFromPoint(e.pageX, e.pageY);
      };
      document.addEventListener("mousemove", onMouseMove);

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        divFigure.style.position = "static";

        if (elemBelow?.id.length === 2 && elemBelow.id !== fieldIndices) {
          let allow = movesToPlay.arr.some((move) => {
            return elemBelow.id === move;
          });

          board = updateBoard(
            board,
            elemBelow.id,
            fieldIndices,
            figure,
            "empty"
          );

          if (allow && whiteOnMove) {
            checkArr = isCheck(board, BLACK_FIGURES, "kingWhite");
          } else if (allow) {
            checkArr = isCheck(board, WHITE_FIGURES, "kingBlack");
          }

          if (allow && checkArr.length === 0) {
            if (elemBelow.firstChild) {
              elemBelow.removeChild(elemBelow.firstChild);
            }

            if (
              movesToPlay.castling &&
              movesToPlay.castling.position === elemBelow.id
            ) {
              board = castling(board, movesToPlay.castling);
            }

            if (
              movesToPlay.enPassant &&
              movesToPlay.enPassant.pawnIndices === elemBelow.id
            ) {
              board = enPassant(board, movesToPlay.enPassant);
            }

            if (
              ["kingBlack", "kingWhite", "rookWhite", "rookBlack"].includes(
                figure
              )
            ) {
              board[row][column].firstMove = false;
            }

            if (["pawnBlack", "pawnWhite"].includes(figure)) {
              const toField = elemBelow.id.split("");
              let toRow = parseInt(toField[0]);
              let toColumn = parseInt(toField[1]);
              prevMove = {
                title: "pawn",
                from: {
                  row: row,
                  column: column,
                },
                to: {
                  row: toRow,
                  column: toColumn,
                },
              };
            } else {
              prevMove = {
                title: "",
                from: {
                  row: 0,
                  column: 0,
                },
                to: {
                  row: 0,
                  column: 0,
                },
              };
            }

            elemBelow.appendChild(divFigure);

            if (whiteOnMove) {
              checkArr = isCheck(board, WHITE_FIGURES, "kingBlack");
              if (checkArr.length !== 0) {
                let checkmate = isCheckmate(
                  board,
                  WHITE_FIGURES,
                  BLACK_FIGURES,
                  "kingBlack",
                  checkArr
                );

                if (checkmate) {
                  console.log("CHECKMATE!!! Game is Over!");
                }
              }
            } else if (figure.includes("Black") && !whiteOnMove) {
              checkArr = isCheck(board, BLACK_FIGURES, "kingWhite");
              if (checkArr.length !== 0) {
                let checkmate = isCheckmate(
                  board,
                  BLACK_FIGURES,
                  WHITE_FIGURES,
                  "kingWhite",
                  checkArr
                );

                if (checkmate) {
                  console.log("CHECKMATE!!! Game is Over!");
                }
              }
            }

            whiteOnMove = !whiteOnMove;
          } else {
            board = updateBoard(
              board,
              fieldIndices,
              elemBelow.id,
              figure,
              elemBelow.firstChild?.id || "empty"
            );
          }
        }
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  return (
    <div
      className={`field ${color}`}
      id={fieldIndices}
      onMouseDown={onMouseDown}
      draggable="false"
    >
      {figure !== "empty" && <Figure figure={figure} />}
    </div>
  );
};

export default Field;
