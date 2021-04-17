import { useState, useEffect, useContext } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import { GiChessKing } from "react-icons/gi";

import {
  useStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "./modal-customized.styles";
import { GameContext } from "../../context/game.context";
import { socket } from "../../App";
import { ButtonGroup } from "@material-ui/core";

export default function Modal() {
  const classes = useStyles();

  const { isGameOver, setIsGameOver, gameInfo } = useContext(GameContext);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [btnText, setBtnText] = useState("rematch");

  const handleClose = () => {
    setOpen(false);
  };

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    if (!!isGameOver) {
      setMessage(capitalize(isGameOver));

      setBtnText("rematch");
      setOpen(true);
    }
  }, [isGameOver]);

  useEffect(() => {
    socket.on("playRematch", () => {
      setOpen(false);
    });

    if (gameInfo.isSpectator) return;

    socket.on("rematch", () => {
      setOpen(true);
      setMessage("Accept rematch?");
      setBtnText("accept");
    });
    socket.on("rematchDeclined", () => {
      setOpen(true);
      setMessage("The challange was declined");
      setBtnText("close");
    });

    socket.on("draw", () => {
      setOpen(true);
      setMessage("Accept draw?");
      setBtnText("accept");
    });
  }, [gameInfo.isSpectator]);

  const handleRematchClick = () => {
    if (message === "Accept draw?") {
      socket.emit("gameOver", "Draw by Agreement");
      setIsGameOver("Draw by Agreement");
    } else if (btnText === "rematch") {
      socket.emit("rematch");
    } else if (btnText === "accept") {
      socket.emit("rematch", true);
    }

    setOpen(false);
  };

  const handleDeclineClick = () => {
    if (message !== "Accept draw?") socket.emit("rematch", false);
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Grid item>
          <Avatar className={classes.avatar}>
            <GiChessKing />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Chess Master
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h4" className={classes.message}>
          {message}
        </Typography>
      </DialogContent>
      {!gameInfo.isSpectator && (
        <DialogActions>
          <Grid container justify="center">
            <ButtonGroup fullWidth variant="contained" color="primary">
              {btnText === "accept" && (
                <Button
                  className={classes.declineBtn}
                  onClick={handleDeclineClick}
                >
                  Decline
                </Button>
              )}
              <Button onClick={handleRematchClick}>{btnText}</Button>
            </ButtonGroup>
          </Grid>
        </DialogActions>
      )}
    </Dialog>
  );
}
