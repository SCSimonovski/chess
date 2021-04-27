import { useState, useEffect, useContext } from "react";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

import { GameContext } from "../../context/game.context";

import rookwhite from "../../figures/rook-white.svg";
import rookblack from "../../figures/rook-black.svg";
import knightwhite from "../../figures/knight-white.svg";
import knightblack from "../../figures/knight-black.svg";
import bishopwhite from "../../figures/bishop-white.svg";
import bishopblack from "../../figures/bishop-black.svg";
import queenwhite from "../../figures/queen-white.svg";
import queenblack from "../../figures/queen-black.svg";

import { useStyles } from "./modal-customized.styles";
import { Divider } from "@material-ui/core";
import { updateBoardOnPawnPromotion } from "../../utils/board/update-board";

export default function Modal({ sendPlayedMove }) {
  const {
    pawnPromotionData,
    setIsGameOver,
    gameInfo,
    playerBoardSide,
  } = useContext(GameContext);
  const classes = useStyles({ position: pawnPromotionData });

  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    const title = e.currentTarget.firstChild.name;

    const { newBoard, isCheckmate, isCheck } = updateBoardOnPawnPromotion(
      pawnPromotionData.board,
      pawnPromotionData.fieldPos,
      title,
      gameInfo.player.side,
      playerBoardSide
    );

    if (isCheckmate) setIsGameOver(`${gameInfo.player.side} Won by checkmate`);

    const playedMove = {
      ...pawnPromotionData.playedMove,
      figureTitle: title,
      isCheck,
      isCastling: false,
    };
    sendPlayedMove(newBoard, "", playedMove);

    setOpen(false);
  };

  useEffect(() => {
    if (pawnPromotionData) {
      setOpen(true);
    }
  }, [pawnPromotionData]);

  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="pick-figure"
      open={open}
      classes={{
        paper: classes.dialog,
      }}
    >
      <Grid
        container
        direction={pawnPromotionData?.direction || "column"}
        className={classes.figuresContainer}
      >
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="queen"
            src={gameInfo.player.side === "white" ? queenwhite : queenblack}
            className={classes.img}
            alt="Queen figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="rook"
            src={gameInfo.player.side === "white" ? rookwhite : rookblack}
            className={classes.img}
            alt="Rook figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="bishop"
            src={gameInfo.player.side === "white" ? bishopwhite : bishopblack}
            className={classes.img}
            alt="Bishop figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="knight"
            src={gameInfo.player.side === "white" ? knightwhite : knightblack}
            className={classes.img}
            alt="Knight figure"
          />
        </Grid>

        <Divider />

        <Grid container justify="center" item className={classes.button}>
          <IconButton aria-label="clear" onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}
