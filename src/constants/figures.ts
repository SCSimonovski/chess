import pawnwhite from "../figures/pawn-white.svg";
import pawnblack from "../figures/pawn-black.svg";
import rookwhite from "../figures/rook-white.svg";
import rookblack from "../figures/rook-black.svg";
import knightwhite from "../figures/knight-white.svg";
import knightblack from "../figures/knight-black.svg";
import bishopwhite from "../figures/bishop-white.svg";
import bishopblack from "../figures/bishop-black.svg";
import kingwhite from "../figures/king-white.svg";
import kingblack from "../figures/king-black.svg";
import queenwhite from "../figures/queen-white.svg";
import queenblack from "../figures/queen-black.svg";

export const FIGURES_SVG = {
  pawn: {
    white: pawnwhite,
    black: pawnblack,
  },
  rook: {
    white: rookwhite,
    black: rookblack,
  },
  knight: {
    white: knightwhite,
    black: knightblack,
  },
  bishop: {
    white: bishopwhite,
    black: bishopblack,
  },
  king: {
    white: kingwhite,
    black: kingblack,
  },
  queen: {
    white: queenwhite,
    black: queenblack,
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
