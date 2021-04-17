import { useContext } from "react";

import { GameContext } from "../../context/game.context";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { useStyles } from "./buttons.styles";
import { socket } from "../../App";

const Buttons = () => {
  const classes = useStyles();
  const {
    gameInfo,
    isGameStarted,
    isGameOver,
    setIsGameStarted,
    setIsGameOver,
    changeTableSides,
  } = useContext(GameContext);

  const handleGameStart = () => {
    setIsGameStarted(true);
    socket.emit("startGame", gameInfo.room);
  };

  const handleRematch = () => {
    if (isGameOver || true) {
      socket.emit("rematch");
    }
  };

  const handleResign = () => {
    setIsGameOver(`${gameInfo.opponent.side} Won by resigning`);
  };

  const handleDraw = () => {
    if (isGameOver || true) {
      socket.emit("draw");
    }
  };

  const handleFlipBoard = () => {
    changeTableSides();
  };

  return (
    <Grid container direction="column" item className={classes.root}>
      <Hidden smUp>
        <ButtonGroup
          fullWidth
          size="small"
          color="secondary"
          variant="contained"
        >
          {!gameInfo.isSpectator && !isGameStarted && (
            <Button
              disabled={!gameInfo.opponent.username}
              onClick={handleGameStart}
            >
              Start Game
            </Button>
          )}

          {isGameStarted && !isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleResign}>Resign</Button>
          )}

          {isGameStarted && !isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleDraw}>Draw</Button>
          )}

          {isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleRematch}>Rematch</Button>
          )}

          <Button onClick={handleFlipBoard}>Flip Board</Button>
        </ButtonGroup>
      </Hidden>

      <Hidden only="xs">
        <ButtonGroup fullWidth color="secondary" variant="contained">
          {!gameInfo.isSpectator && !isGameStarted && (
            <Button
              disabled={!gameInfo.opponent.username}
              onClick={handleGameStart}
            >
              Start Game
            </Button>
          )}

          {isGameStarted && !isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleResign}>Resign</Button>
          )}

          {isGameStarted && !isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleDraw}>Draw</Button>
          )}

          {isGameOver && !gameInfo.isSpectator && (
            <Button onClick={handleRematch}>Rematch</Button>
          )}
        </ButtonGroup>
        <Box mt={1}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleFlipBoard}
          >
            Flip Board
          </Button>
        </Box>
      </Hidden>
    </Grid>
  );
};

export default Buttons;
