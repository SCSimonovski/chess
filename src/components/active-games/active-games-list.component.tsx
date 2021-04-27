import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { socket } from "../../App";
import { GameContext } from "../../context/game.context";

import { ACTIVE_GAMES } from "../../fixtures/active-games";

import JoinModal from "../modals/join-modal.component";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import { GiChessKing } from "react-icons/gi";
import { FaChess } from "react-icons/fa";

import { useStyles } from "./active-games-list.styles.js";

type ActiveGames = Array<{
  room: string;
  isPlaying: boolean;
  isFull: boolean;
  isAllowedSpectators: boolean;
  host: string;
  code: boolean;
}>;

const ActiveGamesList = () => {
  const context = useContext(GameContext);
  const classes = useStyles({ size: window.innerHeight });
  const history = useHistory();

  const [activeGames, setActiveGames] = useState<ActiveGames>(ACTIVE_GAMES);

  const [hasCode, setHasCode] = useState(true);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("activeGames", (activeGames: any) => {
      setActiveGames(activeGames.concat(ACTIVE_GAMES));
    });

    socket.on("activeGames", (activeGames: any) => {
      setActiveGames(activeGames.concat(ACTIVE_GAMES));
    });

    socket.on("createdGame", (game: any) => {
      setActiveGames((games) => {
        return [game, ...games];
      });
    });

    socket.on("gameIsStarting", ({ room }: any) => {
      setActiveGames((games) =>
        games.map((game) =>
          game.room === room ? { ...game, isPlaying: true } : { ...game }
        )
      );
    });

    socket.on("roomIsFull", ({ room, isFull }: any) => {
      setActiveGames((games) =>
        games.map((game) =>
          game.room === room ? { ...game, isFull } : { ...game }
        )
      );
    });
  }, []);

  // HANDLE MODAL //////////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleJoinClick = (e: any) => {
    const code = e.currentTarget.getAttribute("data-code");
    setHasCode(code === "true" ? true : false);
    setRoom(e.currentTarget.name);
    setOpen(true);
  };

  const handleWatchClick = (e: any) => {
    socket.emit(
      "spectator",
      { room: e.currentTarget.name },
      (response: any) => {
        if (response.error) {
          console.log("Error: ", response.error);
          return;
        }

        const { isPlaying, sideOnMove, ...gameInfo } = response;

        context.setIsGameStarted(isPlaying);
        context.setSideOnMove(sideOnMove);
        context.handleTime(gameInfo.time);
        context.handleGameInfo({
          ...gameInfo,
          isSpectator: true,
        });

        history.push("/chessroom");
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  ///////////////////////////////////////////////////////////////////////////

  const scrollIntoView = (section: string) => {
    document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Grid
        id="join-game"
        container
        item
        justify="center"
        alignContent="center"
        xs={false}
        sm={12}
        md={8}
        className={classes.root}
      >
        <Container maxWidth="sm">
          <AppBar position="relative">
            <Toolbar>
              <Hidden smUp>
                <Avatar className={classes.activeGamesIcon}>
                  <GiChessKing />
                </Avatar>
              </Hidden>
              <Typography variant="h6" color="inherit" noWrap>
                Active Games
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.activeGamesList}>
            <List id="list" component="nav" aria-label="Active game list">
              {activeGames.map(
                (
                  { isPlaying, isFull, room, code, host, isAllowedSpectators },
                  index
                ) => (
                  <React.Fragment key={room}>
                    {index !== 0 && <Divider />}
                    <ListItem>
                      <Grid item container wrap="nowrap">
                        <Grid
                          item
                          container
                          className={classes.listItemContentGrid}
                          wrap="nowrap"
                          xs={6}
                          sm={8}
                        >
                          <Hidden xsDown>
                            <Avatar className={classes.listItemIcon}>
                              <FaChess />
                            </Avatar>
                          </Hidden>

                          <Grid
                            className={classes.listItemTextGrid}
                            item
                            container
                            wrap="nowrap"
                            direction="column"
                            justify="center"
                          >
                            <Typography
                              className={classes.listItemText}
                              variant="body1"
                              title={room}
                            >
                              {`${room}`}
                            </Typography>

                            <Typography
                              variant="caption"
                              className={classes.listItemText}
                              title={room}
                            >
                              {`(Host) ${host}`}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          container
                          justify="flex-end"
                          alignItems="center"
                          wrap="nowrap"
                          className={classes.listButtonsGrid}
                          xs={6}
                          sm={4}
                        >
                          <Button
                            size="small"
                            disabled={isPlaying || isFull}
                            variant="contained"
                            color="secondary"
                            name={room}
                            onClick={handleJoinClick}
                            data-code={code.toString()}
                          >
                            {isPlaying && "Playing..."}
                            {isFull && !isPlaying && "Full"}
                            {!isFull && !isPlaying && "Join"}
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            disabled={!isAllowedSpectators}
                            onClick={handleWatchClick}
                            className={classes.buttonWatchGame}
                            name={room}
                            data-code={code.toString()}
                          >
                            Watch
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </React.Fragment>
                )
              )}
            </List>
          </div>
        </Container>
        <Hidden mdUp>
          <Button
            className={classes.goToTopButton}
            onClick={() => scrollIntoView("top")}
            variant="outlined"
            color="secondary"
          >
            Go to Top
            <ExpandLessIcon />
          </Button>
        </Hidden>
      </Grid>

      <JoinModal
        open={open}
        handleClose={handleClose}
        room={room}
        hasCode={hasCode}
      />
    </>
  );
};

export default ActiveGamesList;
