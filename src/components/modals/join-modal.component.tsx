import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import { GiChessKing } from "react-icons/gi";

import {
  useStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "./modal-customized.styles";
import { socket } from "../../App";
import { GameContext } from "../../context/game.context";

type Props = {
  open: boolean;
  handleClose: () => void;
  room: string;
  hasCode: boolean;
};

export default function JoinModal({ open, handleClose, room, hasCode }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(GameContext);

  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsernameError("");
        if (value.length > 16) setUsernameError("Max 16 letters");
        setUsername(value);
        break;
      case "code":
        setCodeError("");
        setCode(value);
        break;
    }
  };

  const handleJoinClick = () => {
    socket.emit(
      "joinGame",
      { username, room, code },
      ({ data, error }: { data: any; error: string }) => {
        if (data) {
          context.handleTime(data.time);
          context.handleGameInfo({
            ...data,
            room,
          });
          history.push("/chessroom");
        } else {
          setCodeError(error);
        }
      }
    );
  };

  const handleCloseModal = () => {
    setCodeError("");
    handleClose();
  };

  return (
    <Dialog
      onClose={handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
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
        <TextField
          name="username"
          margin="normal"
          label="Pick Username"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
          error={!!usernameError}
          helperText={usernameError}
        />
        {hasCode && (
          <TextField
            name="code"
            margin="normal"
            label="Room Code"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            error={!!codeError}
            helperText={codeError}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleJoinClick}
          color="primary"
          fullWidth
          variant="contained"
        >
          Join Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}
