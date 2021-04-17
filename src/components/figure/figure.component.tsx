import { FIGURES_SVG } from "../../constants/figures";
import { FigureTitle } from "../../types/types";

import "./figure.styles.scss";

type Props = {
  title: FigureTitle;
  side: "white" | "black";
};

const Figure = ({ title, side }: Props) => {
  return (
    <div id={title} className="figure" draggable="false">
      <img src={FIGURES_SVG[title][side]} className="img" alt="React Logo" />
    </div>
  );
};

export default Figure;
