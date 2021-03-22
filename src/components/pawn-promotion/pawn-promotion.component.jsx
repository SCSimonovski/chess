import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

import { GiChessKing } from "react-icons/gi";

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

export default function Modal({
  open,
  handleClose,
  side,
  position,
  handlePawnPromotion,
}) {
  const classes = useStyles({ position });

  const handleClick = (e) => {
    const name = e.currentTarget.firstChild.name;
    handlePawnPromotion(position.fieldPos, name);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="pick-figure"
      open={open}
      classes={{
        paper: classes.dialog,
      }}
    >
      <Grid
        container
        direction={position.direction}
        className={classes.figuresContainer}
      >
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="queen"
            src={side === "white" ? queenwhite : queenblack}
            className={classes.img}
            alt="Queen figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="rook"
            src={side === "white" ? rookwhite : rookblack}
            className={classes.img}
            alt="Rook figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="bishop"
            src={side === "white" ? bishopwhite : bishopblack}
            className={classes.img}
            alt="Bishop figure"
          />
        </Grid>
        <Grid onClick={handleClick} item className={classes.gridFigure}>
          <img
            name="knight"
            src={side === "white" ? knightwhite : knightblack}
            className={classes.img}
            alt="Knight figure"
          />
        </Grid>

        <Divider />

        <Grid container justify="center" item className={classes.button}>
          <IconButton aria-label="clear" onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}
