import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { GameContext } from "../../context/game.context";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { FaChess } from "react-icons/fa";
import { MdTimer } from "react-icons/md";

import { FigureTitle, Time } from "../../types/types";
import { FIGURES_SVG, FIGURES_VALUE } from "../../constants/figures";
import { useStyles } from "./player.styles.js";
import { socket } from "../../App";

const TAKEN_FIGURES = {
  pawn: [],
  knight: [],
  bishop: [],
  rook: [],
  queen: [],
};

const Player: React.FC<{
  player: { username: string; side: string };
}> = ({ player }) => {
  const timer = useRef<any>(null);
  const classes = useStyles({ side: player.side });

  const [takenFigures, setTakenFigures] = useState<any>(TAKEN_FIGURES);
  const [advantage, setAdvantage] = useState<number>(0);

  const {
    time,
    isGameStarted,
    isGameOver,
    sideOnMove,
    playedMoves,
  } = useContext(GameContext);

  const [playerTime, setPlayerTime] = useState<Time>({
    timeInSeconds: 0,
    minutes: "00",
    seconds: "00",
  });

  const handleTime = (timeInSeconds: number) => {
    let minutes: any = Math.floor(timeInSeconds / 60);
    let seconds: any = timeInSeconds - minutes * 60;

    if (seconds <= 9) {
      seconds = `0${seconds}`;
    }

    if (minutes <= 9) {
      minutes = `0${minutes}`;
    }

    return {
      timeInSeconds,
      minutes,
      seconds,
    };
  };

  const setTimer = useCallback(() => {
    return () => {
      setPlayerTime((t) => {
        return handleTime(t.timeInSeconds - 1);
      });
    };
  }, [setPlayerTime]);

  ///////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (playerTime.timeInSeconds <= 0) {
      clearInterval(timer.current);
    }
  }, [playerTime]);

  useEffect(() => {
    clearInterval(timer.current);

    if (player.side !== "black" && player.side !== "white") return;

    if (isGameStarted && !isGameOver) {
      setPlayerTime(handleTime(time[player.side]));

      if (player.side === sideOnMove) {
        timer.current = setInterval(setTimer(), 1000);
      }
    } else if (!isGameStarted) {
      setPlayerTime(handleTime(time[player.side]));
    }
  }, [time, isGameStarted, isGameOver, player.side, setTimer, sideOnMove]);

  useEffect(() => {
    socket.on("time", (time: any) => {
      clearInterval(timer.current);
      setPlayerTime(handleTime(time[player.side]));
      if (player.side === sideOnMove) {
        timer.current = setInterval(setTimer(), 1000);
      }
    });
  }, [player.side, setTimer, sideOnMove]);

  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let arr: any = {
      pawn: [],
      knight: [],
      bishop: [],
      rook: [],
      queen: [],
    };
    let sumWhite = 0;
    let sumBlack = 0;

    for (let i = playedMoves.length - 1; i >= 0; i--) {
      let takenFigure: FigureTitle = playedMoves[i].takenFigure;

      if (!(i % 2) && !!takenFigure) {
        sumWhite += FIGURES_VALUE[takenFigure];

        player.side === "white" &&
          arr[takenFigure].push(
            <img
              key={i + takenFigure}
              src={FIGURES_SVG[takenFigure]["black"]}
              className={classes.figureImg}
              alt="React Logo"
            />
          );
      } else if (!!(i % 2) && !!takenFigure) {
        sumBlack += FIGURES_VALUE[takenFigure];

        player.side === "black" &&
          arr[takenFigure].push(
            <img
              key={i + takenFigure}
              src={FIGURES_SVG[takenFigure]["white"]}
              className={classes.figureImg}
              alt="React Logo"
            />
          );
      }
    }

    if (player.side === "white") {
      setAdvantage(sumWhite - sumBlack);
    } else {
      setAdvantage(sumBlack - sumWhite);
    }

    setTakenFigures({ ...arr });
  }, [playedMoves, player.side, classes.figureImg]);

  return (
    <>
      <Grid
        component={Paper}
        container
        wrap="nowrap"
        variant="outlined"
        className={classes.player}
      >
        <Grid item xs={9}>
          <Grid container alignItems="flex-start">
            <Grid item>
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.iconGrid}
              >
                <FaChess />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.username} variant="body1">
                    {player.username ? player.username : "Waiting for opponent"}
                  </Typography>
                </Grid>
                <Grid id="figuresContainer" item container>
                  {takenFigures.pawn.length !== 0 && (
                    <Box mr={1}>{takenFigures.pawn}</Box>
                  )}
                  {takenFigures.knight.length !== 0 && (
                    <Box mr={1}>{takenFigures.knight}</Box>
                  )}
                  {takenFigures.bishop.length !== 0 && (
                    <Box mr={1}>{takenFigures.bishop}</Box>
                  )}
                  {takenFigures.rook.length !== 0 && (
                    <Box mr={1}>{takenFigures.rooks}</Box>
                  )}
                  {takenFigures.queen.length !== 0 && (
                    <Box mr={1}>{takenFigures.queen}</Box>
                  )}
                  {advantage !== 0 && (
                    <Box component="span" ml={1} className={classes.advantage}>
                      {advantage > 0 ? `+${advantage}` : advantage}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={3}
          container
          alignItems="center"
          justify="flex-end"
          wrap="nowrap"
        >
          <Paper variant="outlined" className={classes.timePaper}>
            <MdTimer className={classes.timeIcon} />
            <Typography
              noWrap
              variant="body1"
            >{`${playerTime.minutes} : ${playerTime.seconds}`}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Player;
