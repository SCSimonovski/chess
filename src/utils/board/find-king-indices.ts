import { ChessField } from "../../fixtures/chess-board";

export const findKingIndices = (
  board: Array<Array<ChessField>>,
  side: "white" | "black"
) => {
  let field: ChessField | undefined;
  let row = 0;
  let column = 0;

  board.some((r) => {
    field = r.find(
      ({ figure }) => figure?.title === "king" && figure?.side === side
    );

    if (field) {
      let indices = field.position.split("");
      row = parseInt(indices[0]);
      column = parseInt(indices[1]);
    }

    return !!field;
  });

  return [row, column];
};
