import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { socket } from "../../App";
import { GameContext } from "../../context/game.context";

import { DefaultActiveGames, GameInfo } from "../../utils/types";

import Modal from "../modal/modal.component.jsx";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { GiChessKing } from "react-icons/gi";
import { FaChess } from "react-icons/fa";

import { useStyles } from "./homepage.styles";
import "./homepage.styles.scss";

type ActiveGames = Array<{
  room: string;
  isPlaying: boolean;
}>;

const Homepage = () => {
  const context = useContext(GameContext);
  const classes = useStyles();

  const [activeGames, setActiveGames] = useState<ActiveGames>(
    DefaultActiveGames
  );

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [code, setCode] = useState("");
  const [allowSpectators, setAllowSpectators] = useState(false);

  const history = useHistory();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "room":
        setRoom(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "code":
        setCode(value);
        break;
      case "allowSpectators":
        setAllowSpectators(e.target.checked);
    }
  };

  const handleCreateGameClick = () => {
    context.setGameInfo({
      ...context.gameInfo,
      room,
      code,
      player: {
        username,
        side: "white",
      },
    });

    socket.emit(
      "createGame",
      { username, room, code },
      (response: { error: string }) => {
        if (response) {
          console.log("ERROR: ", response.error);
        } else {
          history.push("/chessroom");
        }
      }
    );
  };

  const handleJoinClick = () => {
    socket.emit(
      "joinGame",
      { username, room, code },
      ({ data, error }: { data: GameInfo; error: string }) => {
        if (data) {
          context.setGameInfo(data);
          context.toggleIsMyTurn();
          history.push("/chessroom");
        } else {
          console.log(error);
        }
      }
    );
  };

  useEffect(() => {
    socket.on("activeGames", (activeGames: any) => {
      setActiveGames(activeGames.concat(DefaultActiveGames));
    });

    socket.on("createdGame", (game) => {
      setActiveGames((games) => {
        games.unshift({ room: game.room, isPlaying: false });
        return [...games];
      });
    });

    socket.on("gameIsStarting", ({ room }) => {
      setActiveGames((games) =>
        games.map((game) =>
          game.room === room ? { room, isPlaying: true } : { ...game }
        )
      );
    });
  }, []);

  // HANDLE MODAL //////////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = (e: any) => {
    setRoom(e.currentTarget.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  ///////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <AppBar position="relative" className={classes.appBar}>
              <Grid
                container
                direction="column"
                alignContent="center"
                alignItems="center"
              >
                <Avatar className={classes.avatar}>
                  <GiChessKing />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h3"
                  className={classes.logoTitle}
                >
                  Chess Master
                </Typography>
              </Grid>
            </AppBar>
            <Grid
              container
              direction="column"
              justify="center"
              alignContent="center"
              alignItems="center"
              className={classes.formContainer}
            >
              <form onChange={handleChange} className={classes.form} noValidate>
                <TextField
                  name="username"
                  variant="outlined"
                  label="Username"
                  fullWidth
                  required
                  margin="normal"
                  autoFocus
                />

                <TextField
                  name="room"
                  margin="normal"
                  label="Room Name"
                  variant="outlined"
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
          </div>
        </Grid>

        <Grid
          container
          item
          justify="center"
          alignContent="center"
          xs={false}
          sm={4}
          md={8}
          className={classes.image}
        >
          <Container maxWidth="sm" className={classes.activeGamesListContainer}>
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  Active Games
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.activeGamesList}>
              <List id="list" component="nav" aria-label="Active game list">
                {activeGames.map(({ isPlaying, room }, index) => (
                  <React.Fragment key={room}>
                    {index !== 0 && <Divider />}
                    <ListItem>
                      <Avatar className={classes.listItemIcon}>
                        <FaChess />
                      </Avatar>
                      <ListItemText primary={`Room name - ${room}`} />
                      <Button
                        disabled={isPlaying}
                        variant="contained"
                        color="secondary"
                        name={room}
                        onClick={handleOpenModal}
                      >
                        {isPlaying ? "Playing..." : "Join"}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttonWatchGame}
                        name={room}
                        onClick={handleOpenModal}
                      >
                        Watch
                      </Button>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </div>
          </Container>
        </Grid>
      </Grid>

      <Modal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleJoinClick={handleJoinClick}
      />
    </>
  );
};

export default Homepage;
