import React, { useState, useContext } from "react";
import { socket } from "../../App";

import { GameContext } from "../../context/game.context";

import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// import { GiChessKing } from "react-icons/gi";
import { FaChessBoard } from "react-icons/fa";

import { useStyles } from "./right-sidebar.styles";
import "./sidebar.styles.scss";
import { DefaultMovesPlayed } from "../../utils/types";

type MovesPlayed = Array<{
  white: string;
  black: string;
}>;

const RightSidebar = () => {
  const classes = useStyles();

  const [movesPlayed, setMovesPlayed] = useState<MovesPlayed>(
    DefaultMovesPlayed
  );

  const { gameInfo, isGameStarted, setIsGameStarted } = useContext(GameContext);

  const handleGameStart = () => {
    setIsGameStarted(true);
    socket.emit("startGame", gameInfo.room);
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        alignContent="space-between"
        alignItems="center"
        className={classes.container}
      >
        <Paper className={classes.paperList}>
          <AppBar position="relative">
            <Toolbar>
              <Avatar className={classes.listIcon}>
                <FaChessBoard />
              </Avatar>
              <Typography variant="h6" color="inherit" noWrap>
                Moves Played
              </Typography>
            </Toolbar>
          </AppBar>
          <List id="list" component="nav" aria-label="Active game list">
            {movesPlayed.map(({ white, black }, index) => (
              <React.Fragment key={white + black}>
                {index !== 0 && <Divider />}
                <ListItem>
                  <ListItemText secondary={`${index}.`} />

                  <ListItemText primary={`${white}`} />
                  <ListItemText primary={`${black}`} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={6} className={classes.buttonGrid}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.button}
              onClick={handleGameStart}
              disabled={isGameStarted || !gameInfo.opponent.side}
            >
              Start Game
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.buttonGrid}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.button}
            >
              Rematch
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RightSidebar;
