export const moveFigureAt = (
  pageX: number,
  pageY: number,
  divFigure: any,
  boardElem: any
) => {
  const { x, y, width, height } = boardElem.getBoundingClientRect();

  if (pageX > x && pageX < x + width) {
    divFigure.style.left = pageX - divFigure.offsetWidth / 2 + "px";
  }
  if (pageY > y && pageY < y + height) {
    divFigure.style.top = pageY - divFigure.offsetHeight / 2 + "px";
  }
};
