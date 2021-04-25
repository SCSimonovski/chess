import pawnWhite from "../figures/pawn-white.svg";
import pawnBlack from "../figures/pawn-black.svg";
import rookWhite from "../figures/rook-white.svg";
import rookBlack from "../figures/rook-black.svg";
import knightWhite from "../figures/knight-white.svg";
import knightBlack from "../figures/knight-black.svg";
import bishopWhite from "../figures/bishop-white.svg";
import bishopBlack from "../figures/bishop-black.svg";
import kingWhite from "../figures/king-white.svg";
import kingBlack from "../figures/king-black.svg";
import queenWhite from "../figures/queen-white.svg";
import queenBlack from "../figures/queen-black.svg";

export const FIGURES_SVG = {
  pawn: {
    white: pawnWhite,
    black: pawnBlack,
  },
  rook: {
    white: rookWhite,
    black: rookBlack,
  },
  knight: {
    white: knightWhite,
    black: knightBlack,
  },
  bishop: {
    white: bishopWhite,
    black: bishopBlack,
  },
  king: {
    white: kingWhite,
    black: kingBlack,
  },
  queen: {
    white: queenWhite,
    black: queenBlack,
  },
};

export const FIGURES_VALUE = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 10,
  king: 100,
};
