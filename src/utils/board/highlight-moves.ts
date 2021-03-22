export const highlightMoves = (highlightMoves: any) => {
  let color = highlightMoves.selectedEl.getAttribute("color");
  highlightMoves.selectedEl.classList.add(`selected-${color}`);

  highlightMoves.moves.forEach((move: string) => {
    let field = document.getElementById(move)!.firstChild as HTMLElement;
    if (field.firstChild) {
      field.classList.add("available-figure");
    } else {
      field.classList.add("available");
    }
  });
};

export const removeHighlightedMoves = (highlightedMoves: any) => {
  highlightedMoves.selectedEl.classList.remove("selected-white");
  highlightedMoves.selectedEl.classList.remove("selected-black");

  highlightedMoves.moves.forEach((move: string) => {
    let field = document.getElementById(move)!.firstChild as HTMLElement;
    field.classList.remove("available");
    field.classList.remove("available-figure");
  });
};

export const highlightPlayedMove = (move: any) => {
  const fromEl = document.getElementById(move.from)!;
  let color = fromEl.getAttribute("color");
  fromEl.classList.add(`selected-${color}`);

  const toEl = document.getElementById(move.to)!;
  color = toEl.getAttribute("color");
  toEl.classList.add(`selected-${color}`);
};

export const removePrevMoveHighlight = (move: any) => {
  const fromEl = document.getElementById(move.from)!;
  let color = fromEl.getAttribute("color");
  fromEl.classList.remove(`selected-${color}`);

  const toEl = document.getElementById(move.to)!;
  color = toEl.getAttribute("color");
  toEl.classList.remove(`selected-${color}`);
};
