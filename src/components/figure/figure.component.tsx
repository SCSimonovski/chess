import pawnBlack from "../../figures/pawn-black.svg";
import pawnWhite from "../../figures/pawn-white.svg";
import rookBlack from "../../figures/rook-black.svg";
import rookWhite from "../../figures/rook-white.svg";
import knightBlack from "../../figures/knight-black.svg";
import knightWhite from "../../figures/knight-white.svg";
import bishopBlack from "../../figures/bishop-black.svg";
import bishopWhite from "../../figures/bishop-white.svg";
import kingBlack from "../../figures/king-black.svg";
import kingWhite from "../../figures/king-white.svg";
import queenBlack from "../../figures/queen-black.svg";
import queenWhite from "../../figures/queen-white.svg";

import { ChessFigure } from "../../fixtures/chess-board";

import "./figure.styles.scss";

const figures = {
  pawnBlack,
  pawnWhite,
  rookBlack,
  rookWhite,
  knightBlack,
  knightWhite,
  bishopBlack,
  bishopWhite,
  kingBlack,
  kingWhite,
  queenBlack,
  queenWhite,
  empty: "asd",
};

type FigureProps = {
  figure: ChessFigure;
};

const Figure = ({ figure }: FigureProps) => {
  return (
    <div id={figure} className="figure" draggable="false">
      <img src={figures[figure]} className="img" alt="React Logo" />
    </div>
  );
};

export default Figure;
