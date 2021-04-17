import { ChessBoard } from "../types/types";

export const BOARD_NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];
export const BOARD_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const BOARD_LETTERS_REVERSED = [...BOARD_LETTERS].reverse();
export const BOARD_NUMBERS_REVERSED = [...BOARD_NUMBERS].reverse();

export const BOARD_MATRIX: ChessBoard = [
  [
    {
      title: "a8",
      figure: { title: "rook", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "b8",
      figure: { title: "knight", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "c8",
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "d8",
      figure: { title: "queen", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "e8",
      figure: { title: "king", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "f8",
      figure: { title: "bishop", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "g8",
      figure: { title: "knight", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "h8",
      figure: { title: "rook", side: "black", firstMove: true },
      color: "black",
    },
  ],
  [
    {
      title: "a7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "b7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "c7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "d7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "e7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "f7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
    {
      title: "g7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "black",
    },
    {
      title: "h7",
      figure: { title: "pawn", side: "black", firstMove: true },
      color: "white",
    },
  ],
  [
    {
      title: "a6",
      figure: null,
      color: "white",
    },
    {
      title: "b6",
      figure: null,
      color: "black",
    },
    {
      title: "c6",
      figure: null,
      color: "white",
    },
    {
      title: "d6",
      figure: null,
      color: "black",
    },
    {
      title: "e6",
      figure: null,
      color: "white",
    },
    {
      title: "f6",
      figure: null,
      color: "black",
    },
    {
      title: "g6",
      figure: null,
      color: "white",
    },
    {
      title: "h6",
      figure: null,
      color: "black",
    },
  ],

  [
    {
      title: "a5",
      figure: null,
      color: "black",
    },
    {
      title: "b5",
      figure: null,
      color: "white",
    },
    {
      title: "c5",
      figure: null,
      color: "black",
    },
    {
      title: "d5",
      figure: null,
      color: "white",
    },
    {
      title: "e5",
      figure: null,
      color: "black",
    },
    {
      title: "f5",
      figure: null,
      color: "white",
    },
    {
      title: "g5",
      figure: null,
      color: "black",
    },
    {
      title: "h5",
      figure: null,
      color: "white",
    },
  ],
  [
    {
      title: "a4",
      figure: null,
      color: "white",
    },
    {
      title: "b4",
      figure: null,
      color: "black",
    },
    {
      title: "c4",
      figure: null,
      color: "white",
    },
    {
      title: "d4",
      figure: null,
      color: "black",
    },
    {
      title: "e4",
      figure: null,
      color: "white",
    },
    {
      title: "f4",
      figure: null,
      color: "black",
    },
    {
      title: "g4",
      figure: null,
      color: "white",
    },
    {
      title: "h4",
      figure: null,
      color: "black",
    },
  ],

  [
    {
      title: "a3",
      figure: null,
      color: "black",
    },
    {
      title: "b3",
      figure: null,
      color: "white",
    },
    {
      title: "c3",
      figure: null,
      color: "black",
    },
    {
      title: "d3",
      figure: null,
      color: "white",
    },
    {
      title: "e3",
      figure: null,
      color: "black",
    },
    {
      title: "f3",
      figure: null,
      color: "white",
    },
    {
      title: "g3",
      figure: null,
      color: "black",
    },
    {
      title: "h3",
      figure: null,
      color: "white",
    },
  ],
  [
    {
      title: "a2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "b2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "c2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "d2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "e2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "f2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "g2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "h2",
      figure: { title: "pawn", side: "white", firstMove: true },
      color: "black",
    },
  ],

  [
    {
      title: "a1",
      figure: { title: "rook", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "b1",
      figure: { title: "knight", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "c1",
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "d1",
      figure: { title: "queen", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "e1",
      figure: { title: "king", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "f1",
      figure: { title: "bishop", side: "white", firstMove: true },
      color: "white",
    },
    {
      title: "g1",
      figure: { title: "knight", side: "white", firstMove: true },
      color: "black",
    },
    {
      title: "h1",
      figure: { title: "rook", side: "white", firstMove: true },
      color: "white",
    },
  ],
];

let boardCopy = BOARD_MATRIX.map((row) => row.map((column) => ({ ...column })));

export const BOARD_MATRIX_REVERSED = [
  ...boardCopy.reverse().map((row) => [...row.reverse()]),
];
