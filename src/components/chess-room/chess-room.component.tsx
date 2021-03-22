import { useContext } from "react";

import { GameContext } from "../../context/game.context";

import Board from "../board/board.component";
import LeftSidebar from "../sidebar/left-sidebar.component";
import RightSidebar from "../sidebar/right-sidebar.component";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { FaChess } from "react-icons/fa";

import { useStyles } from "./chess-room.styles.js";

const ChessRoom = () => {
  const classes = useStyles();
  const { gameInfo } = useContext(GameContext);

  return (
    <>
      <Grid
        className={classes.container}
        container
        // justify="center"
      >
        <Grid item xs={3} className={classes.leftGrid}>
          <LeftSidebar />
        </Grid>

        <Grid
          id="board-cotnainer"
          item
          xs={6}
          className={classes.boardContainer}
        >
          <div className={classes.topGrid}>
            <Paper variant="outlined" className={classes.playerName}>
              <Avatar className={classes.avatar2}>
                <FaChess />
              </Avatar>
              <Typography className={classes.playerTypography} variant="h5">
                {gameInfo.opponent.username
                  ? gameInfo.opponent.username
                  : "Waiting for opponent"}
              </Typography>
            </Paper>
          </div>
          <div id="boardGrid" className={classes.boardGrid}>
            <Board />
          </div>
          <div className={classes.bottomGrid}>
            <Paper variant="outlined" className={classes.playerName}>
              <Avatar className={classes.avatar1}>
                <FaChess />
              </Avatar>
              <Typography className={classes.playerTypography} variant="h5">
                {gameInfo.player.username}
              </Typography>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.rightGrid}>
          <RightSidebar />
        </Grid>
      </Grid>
    </>
  );
};

export default ChessRoom;
