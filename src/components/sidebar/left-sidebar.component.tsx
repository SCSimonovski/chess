import { useState, useEffect, useContext, useCallback } from "react";

import { GameContext } from "../../context/game.context";

import Modal from "../modal/gameover-modal.component.jsx";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { GiChessKing } from "react-icons/gi";
// import { FaChess } from "react-icons/fa";
import { MdTimer } from "react-icons/md";

import { useStyles } from "./left-sidebar.styles";
import "./sidebar.styles.scss";

type TimeType = {
  timeInSeconds: number;
  minutes: any;
  seconds: any;
};

let timer: any;

const LeftSidebar = () => {
  const classes = useStyles();
  const {
    gameInfo,
    isMyTurn,
    isGameStarted,
    isGameOver,
    setIsGameOver,
  } = useContext(GameContext);

  const [opponentsTime, setOpponentsTime] = useState<TimeType>({
    timeInSeconds: 10 * 60,
    minutes: "10",
    seconds: "00",
  });

  const [myTime, setMyTime] = useState<TimeType>({
    timeInSeconds: 10 * 60,
    minutes: "10",
    seconds: "00",
  });

  const setTimer = useCallback(() => {
    if (isMyTurn) {
      return () => {
        setMyTime((t) => {
          let timeInSeconds = t.timeInSeconds - 1;
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
        });
      };
    } else {
      return () => {
        setOpponentsTime((t) => {
          let timeInSeconds = t.timeInSeconds - 1;
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
        });
      };
    }
  }, [isMyTurn]);

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let data = sessionStorage.getItem("opponentTime");
    if (data) {
      setOpponentsTime(JSON.parse(data));
    }
    data = sessionStorage.getItem("myTime");
    if (data) {
      setMyTime(JSON.parse(data));
    }
  }, [setMyTime, setOpponentsTime]);

  useEffect(() => {
    if (myTime.timeInSeconds <= 0) {
      clearInterval(timer);
      setIsGameOver(`${gameInfo.opponent.side}OnTime`);
    }

    sessionStorage.setItem("myTime", JSON.stringify(myTime));
  }, [myTime, gameInfo.opponent.username, isGameOver, setIsGameOver]);

  useEffect(() => {
    if (opponentsTime.timeInSeconds <= 0) {
      clearInterval(timer);
      setIsGameOver(`${gameInfo.player.side}OnTime`);
    }

    sessionStorage.setItem("opponentTime", JSON.stringify(opponentsTime));
  }, [opponentsTime, gameInfo.player.username, isGameOver, setIsGameOver]);

  useEffect(() => {
    clearInterval(timer);
    if (isGameStarted && !isGameOver) {
      timer = setInterval(setTimer(), 1000);
    }
  }, [isMyTurn, isGameStarted, isGameOver, setTimer]);

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid className={classes.paperGrid} container alignItems="center">
          <Grid
            className={classes.timeGrid}
            container
            item
            direction="column"
            alignContent="center"
            alignItems="center"
          >
            <Paper className={classes.timePaper}>
              <Box className={classes.timerIconContainer}>
                <Box className={classes.timerIcon}>
                  <MdTimer />
                </Box>
              </Box>
              <Typography variant="h5">{`${opponentsTime.minutes} : ${opponentsTime.seconds}`}</Typography>
            </Paper>
          </Grid>
          <Grid
            container
            item
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
          <Grid
            className={classes.timeGrid}
            container
            item
            direction="column"
            alignContent="center"
            alignItems="center"
          >
            <Paper className={classes.timePaper}>
              <Box className={classes.timerIconContainer}>
                <Box className={classes.timerIcon}>
                  <MdTimer />
                </Box>
              </Box>
              <Typography variant="h5">{`${myTime.minutes} : ${myTime.seconds}`}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Modal />
    </Grid>
  );
};

export default LeftSidebar;
