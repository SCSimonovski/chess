import { BOARD_MATRIX } from "../../fixtures/chessBoard";

import Field from "../field/field.component";

import "./board.styles.scss";

const Board = () => {
  return (
    <div id="board" className="board">
      <div className="letters">
        {/* <div className="letter">a</div>
        <div className="letter">b</div>
        <div className="letter">c</div>
        <div className="letter">d</div>
        <div className="letter">e</div>
        <div className="letter">f</div>
        <div className="letter">g</div>
        <div className="letter">h</div> */}
        <div className="letter">0</div>
        <div className="letter">1</div>
        <div className="letter">2</div>
        <div className="letter">3</div>
        <div className="letter">4</div>
        <div className="letter">5</div>
        <div className="letter">6</div>
        <div className="letter">7</div>
      </div>
      <div className="fields-container">
        <div className="numbers">
          {/* <div className="number">8</div>
          <div className="number">7</div>
          <div className="number">6</div>
          <div className="number">5</div>
          <div className="number">4</div>
          <div className="number">3</div>
          <div className="number">2</div>
          <div className="number">1</div> */}
          <div className="number">0</div>
          <div className="number">1</div>
          <div className="number">2</div>
          <div className="number">3</div>
          <div className="number">4</div>
          <div className="number">5</div>
          <div className="number">6</div>
          <div className="number">7</div>
        </div>
        <div className="fields">
          {BOARD_MATRIX.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((field, columnIndex) => {
                  field.fieldIndices = `${rowIndex}${columnIndex}`;
                  return (
                    <Field
                      key={field.title}
                      title={field.title}
                      figure={field.figure}
                      color={field.color}
                      fieldIndices={`${rowIndex}${columnIndex}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="letters">
        <div className="letter">a</div>
        <div className="letter">b</div>
        <div className="letter">c</div>
        <div className="letter">d</div>
        <div className="letter">e</div>
        <div className="letter">f</div>
        <div className="letter">g</div>
        <div className="letter">h</div>
      </div> */}
    </div>
  );
};

export default Board;
