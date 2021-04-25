import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { socket } from "../../App";
import { GameContext } from "../../context/game.context";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { useStyles } from "./create-game.styles";

const CreateGame = () => {
  const context = useContext(GameContext);
  const history = useHistory();
  const classes = useStyles({ size: window.innerHeight });

  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [allowSpectators, setAllowSpectators] = useState(true);
  const [time, setTime] = useState("10");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "room":
        setRoomError("");
        if (value.length > 16) setRoomError("Max 16 letters");
        setRoom(value);
        break;
      case "username":
        setUsernameError("");
        if (value.length > 16) setUsernameError("Max 16 letters");
        setUsername(value);
        break;
      case "code":
        setCode(value);
        break;
      case "allowSpectators":
        setAllowSpectators(e.target.checked);
    }
  };

  const handleTimeChange = (e: any) => {
    setTime(e.target.value);
  };

  const handleCreateGameClick = () => {
    socket.emit(
      "createGame",
      { username, room, code, time, allowSpectators },
      (response: { error: string; code: string; username: string }) => {
        if (response.error) {
          const { error, code } = response;
          if (code === "username") {
            setUsernameError(error);
          } else if (code === "room") {
            setRoomError(error);
          } else {
            console.log(error);
          }
        } else {
          context.handleTime(time);
          context.handleGameInfo({
            room,
            code,
            time,
            player: {
              username: response.username,
              side: "white",
            },
          });

          history.push("/chessroom");
        }
      }
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.root}
        id="create-game"
      >
        <form onChange={handleChange} className={classes.form} noValidate>
          <TextField
            error={!!usernameError}
            helperText={usernameError}
            name="username"
            variant="outlined"
            label="Username"
            fullWidth
            required
            margin="normal"
          />

          <TextField
            error={!!roomError}
            name="room"
            margin="normal"
            label="Room Name"
            variant="outlined"
            helperText={roomError}
            fullWidth
            required
          />

          <TextField
            name="code"
            margin="normal"
            label="Room Code"
            variant="outlined"
            fullWidth
          />

          <Box mt={2}>
            <Grid container alignContent="center">
              <Grid item className={classes.selectTimeGrid}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-time-native-simple">
                    Time
                  </InputLabel>
                  <Select
                    native
                    className={classes.select}
                    value={time}
                    onChange={handleTimeChange}
                    label="Time"
                    inputProps={{
                      name: "time",
                      id: "outlined-time-native-simple",
                    }}
                  >
                    <option value={"30"}>30</option>
                    <option value={"10"}>10</option>
                    <option value={"5"}>5</option>
                    <option value={"5/5"}>5/5</option>
                    <option value={"3/2"}>3/2</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allowSpectators}
                      name="allowSpectators"
                      color="primary"
                    />
                  }
                  label="Allow Spectators"
                />
              </Grid>
            </Grid>
          </Box>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateGameClick}
          >
            Create Game
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default CreateGame;
