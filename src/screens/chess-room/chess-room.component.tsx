import { useEffect, useContext } from "react";

import { GameContext } from "../../context/game.context";

import Board from "../../components/board/board.component";
import LeftSidebar from "../../components/left-sidebar/left-sidebar.component";
import RightSidebar from "../../components/right-sidebar/right-sidebar.component";
import Buttons from "../../components/buttons/buttons.component";
import Modal from "../../components/modals/gameover-modal.component";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

import { GiChessKing } from "react-icons/gi";

import { useStyles } from "./chess-room.styles.js";
import Player from "../../components/player/player.component";
import SoundIcon from "../../components/sound-icon/sound-icon.component";
import { socket } from "../../App";

const ChessRoom = () => {
  const { gameInfo, playerBoardSide } = useContext(GameContext);
  const classes = useStyles({ size: window.innerHeight, playerBoardSide });

  useEffect(() => {
    window.onpopstate = (e: any) => {
      //your code...
      socket.emit("leaveRoom");
      sessionStorage.clear();
    };
  }, []);

  return (
    <>
      <Grid id="chess-room" className={classes.root} container justify="center">
        <Hidden smUp>
          <AppBar position="fixed" color="secondary">
            <SoundIcon />
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.appBarLogoGrid}
            >
              <Grid item>
                <Avatar className={classes.logoIcon}>
                  <GiChessKing />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  component="h3"
                  variant="h6"
                  className={classes.logoTitle}
                >
                  Chess Master
                </Typography>
              </Grid>
            </Grid>
          </AppBar>
        </Hidden>
        <Hidden mdDown>
          <Grid item xs={3} className={classes.leftGrid}>
            <LeftSidebar />
          </Grid>
        </Hidden>

        <Grid id="board-cotnainer" item className={classes.boardContainer}>
          <div>
            <Player player={gameInfo.opponent} />
          </div>
          <div id="boardGrid" className={classes.boardGrid}>
            <Board />
          </div>
          <div>
            <Player player={gameInfo.player} />
          </div>
        </Grid>

        <Hidden smUp>
          <Grid container className={classes.buttonsGrid}>
            <Buttons />
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid item className={classes.rightGrid}>
            <RightSidebar />
          </Grid>
        </Hidden>
      </Grid>

      <Modal />
    </>
  );
};

export default ChessRoom;
