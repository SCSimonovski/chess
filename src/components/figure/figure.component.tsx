// import pawnBlack from "../../figures/pawn-black.svg";
import pawnwhite from "../../figures/pawn-white.svg";
import pawnblack from "../../figures/pawn-black.svg";
import rookwhite from "../../figures/rook-white.svg";
import rookblack from "../../figures/rook-black.svg";
import knightwhite from "../../figures/knight-white.svg";
import knightblack from "../../figures/knight-black.svg";
import bishopwhite from "../../figures/bishop-white.svg";
import bishopblack from "../../figures/bishop-black.svg";
import kingwhite from "../../figures/king-white.svg";
import kingblack from "../../figures/king-black.svg";
import queenwhite from "../../figures/queen-white.svg";
import queenblack from "../../figures/queen-black.svg";

import { FigureTitle } from "../../fixtures/chess-board";

import "./figure.styles.scss";

type Props = {
  title: FigureTitle;
  side: "white" | "black";
};

const figures = {
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

const Figure = ({ title, side }: Props) => {
  return (
    <div id={title} className="figure" draggable="false">
      <img src={figures[title][side]} className="img" alt="React Logo" />
    </div>
  );
};

export default Figure;
