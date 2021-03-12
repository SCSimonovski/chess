export const positionToIndices = (position: string) => {
  let indices = position.split("");
  let row = parseInt(indices[0]);
  let column = parseInt(indices[1]);

  return [row, column];
};
