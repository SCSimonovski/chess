export const markAvailableMoves = (fieldsToMark: any) => {
  let color = fieldsToMark.selectedEl.getAttribute("color");
  fieldsToMark.selectedEl.classList.add(`select-${color}`);

  fieldsToMark.moves.forEach((move: string) => {
    let field = document.getElementById(move)!.firstChild as HTMLElement;
    if (field.firstChild) {
      field.classList.add("available-figure");
    } else {
      field.classList.add("available");
    }
  });
};

export const removeMarkedMoves = (removeMark: any) => {
  removeMark.selectedEl.classList.remove("select-white");
  removeMark.selectedEl.classList.remove("select-black");

  removeMark.moves.forEach((move: string) => {
    let field = document.getElementById(move)!.firstChild as HTMLElement;
    field.classList.remove("available");
    field.classList.remove("available-figure");
  });
};

export const highlightPlayedMove = (move: any) => {
  if (move) {
    const fromEl = document.querySelector(`[title=${move.from}]`)!;
    let color = fromEl.getAttribute("color");
    fromEl.classList.add(`highlight-${color}`);

    const toEl = document.querySelector(`[title=${move.to}]`)!;
    color = toEl.getAttribute("color");
    toEl.classList.add(`highlight-${color}`);
  }
};

export const removeHighlightedMove = (move: any) => {
  if (move) {
    const fromEl = document.querySelector(`[title=${move.from}]`)!;
    let color = fromEl.getAttribute("color");
    fromEl.classList.remove(`highlight-${color}`);

    const toEl = document.querySelector(`[title=${move.to}]`)!;
    color = toEl.getAttribute("color");
    toEl.classList.remove(`highlight-${color}`);
  }
};
