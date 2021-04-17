import { ChessField } from "../../types/types";

export const findKingIndices = (
  board: Array<Array<ChessField>>,
  side: "white" | "black"
) => {
  let field: ChessField | undefined;
  let row = 0;
  let column = 0;

  board.some((r, i) => {
    let j = r.findIndex(
      ({ figure }, j) => figure?.title === "king" && figure?.side === side
    );

    if (j !== -1) {
      row = i;
      column = j;
    }

    return !!field;
  });

  return [row, column];
};
