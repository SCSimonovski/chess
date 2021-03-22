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

export default function Modal() {
  const classes = useStyles();

  const { isGameOver } = useContext(GameContext);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    if (!!isGameOver) {
      let message;

      if (isGameOver === "whiteOnTime") {
        message = `White Won on time`;
        setMessage(message);
      } else if (isGameOver === "blackOnTime") {
        message = `Black Won on time`;
        setMessage(message);
      } else {
        message = `${capitalize(isGameOver)} Won by checkmate`;
        setMessage(message);
      }
      setOpen(true);

      socket.emit("gameOver", isGameOver);
    }
  }, [isGameOver]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Grid item>
          <Avatar className={classes.avatar}>
            <GiChessKing />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h3" variant="h5" className={classes.title}>
            Chess Master
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Typography component="h3" variant="h5" className={classes.message}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container justify="center">
          <Button
            variant="contained"
            onClick={() => {}}
            color="primary"
            fullWidth
          >
            Rematch
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
