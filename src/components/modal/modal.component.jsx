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

export default function Modal({
  open,
  handleClose,
  handleChange,
  handleJoinClick,
}) {
  const classes = useStyles();
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
        <TextField
          name="username"
          margin="normal"
          label="Pick Username"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          name="code"
          margin="normal"
          label="Room Code"
          variant="outlined"
          fullWidth
          required
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleJoinClick} color="primary">
          Join Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}
