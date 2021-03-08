import { ChessFigure, ChessField } from "../../fixtures/chessBoard";
import { updateBoard } from "./update-board";

import { Castling } from "../../utils/types";

// export const castling = (
//   board: Array<Array<ChessField>>,
//   figure: ChessFigure,
//   currentField: string,
//   nextField: string
// ) => {
//   if (figure === "kingWhite") {
//     if (currentField === "03") {
//       if (nextField === "05") {
//         const field1 = document.getElementById("07")!;
//         const field2 = document.getElementById("04")!;

//         field2.appendChild(field1.firstChild!);
//         board[0][3].firstMove = false;
//         board = updateBoard(board, "04", "07", "rookWhite", "empty");
//       }
//       if (nextField === "01") {
//         const field1 = document.getElementById("00")!;
//         const field2 = document.getElementById("02")!;

//         field2.appendChild(field1.firstChild!);
//         board[0][3].firstMove = false;
//         board = updateBoard(board, "02", "00", "rookWhite", "empty");
//       }
//     }
//   } else {
//     if (currentField === "73") {
//       if (nextField === "75") {
//         const field1 = document.getElementById("77")!;
//         const field2 = document.getElementById("74")!;

//         field2.appendChild(field1.firstChild!);
//         board[7][3].firstMove = false;
//         board = updateBoard(board, "74", "77", "rookBlack", "empty");
//       }
//       if (nextField === "71") {
//         const field1 = document.getElementById("70")!;
//         const field2 = document.getElementById("72")!;

//         field2.appendChild(field1.firstChild!);
//         board[7][3].firstMove = false;
//         board = updateBoard(board, "72", "70", "rookBlack", "empty");
//       }
//     }
//   }

//   return board;
// };

export const castling = (
  board: Array<Array<ChessField>>,
  castlingInfo: Castling
) => {
  let { indicesFrom, indicesTo, kingIndices, rookSide } = castlingInfo;
  const field1 = document.getElementById(indicesFrom)!;
  const field2 = document.getElementById(indicesTo)!;

  console.log(field1);
  console.log(field2);

  field2.appendChild(field1.firstChild!);
  board[kingIndices.row][kingIndices.column].firstMove = false;
  board = updateBoard(board, indicesFrom, indicesTo, "empty", rookSide);

  return board;
};
