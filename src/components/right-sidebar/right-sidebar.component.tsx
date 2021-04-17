import React, { useState, useContext, useEffect } from "react";

import { GameContext } from "../../context/game.context";
import Buttons from "../buttons/buttons.component";

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

import { FaChessBoard } from "react-icons/fa";
import { useStyles } from "./right-sidebar.styles";

const RightSidebar = () => {
  const classes = useStyles();
  const [moves, setMoves] = useState<any>([]);
  const { playedMoves } = useContext(GameContext);

  const stringifyMove = ({
    isCastling,
    isCheck,
    figureTitle,
    takenFigure,
    to,
  }: any) => {
    if (isCastling) {
      return "O-O-O" + (isCheck ? "+" : "");
    }

    let fl = figureTitle.toUpperCase().split("")[0];
    let str = fl !== "P" ? fl : "";
    str += !!takenFigure ? "x" : "";
    str += to;
    str += isCheck ? "+" : "";

    return str;
  };

  useEffect(() => {
    const arr: any = [];

    const l = playedMoves.length;
    for (let i = 0, j = 0; i < l; i = i + 2, j++) {
      let moveWhite = stringifyMove(playedMoves[i]);
      let moveBlack = "";

      if (i + 1 < l) {
        moveBlack = stringifyMove(playedMoves[i + 1]);
      }

      arr.push(
        <React.Fragment key={j}>
          {j !== 0 && <Divider />}
          <ListItem>
            <ListItemText secondary={`${j}.`} />
            <div className={classes.listTextContainer}>
              <ListItemText
                primary={moveWhite}
                className={classes.listItemText}
              />

              {
                <ListItemText
                  primary={moveBlack}
                  className={classes.listItemText}
                />
              }
            </div>
          </ListItem>
        </React.Fragment>
      );
    }

    setMoves(arr);
  }, [playedMoves, classes.listItemText, classes.listTextContainer]);

  return (
    <div className={classes.root}>
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
        <div className={classes.listFlex}>
          <List
            id="list"
            component="nav"
            aria-label="Active game list"
            className={classes.list}
          >
            {moves}
          </List>
        </div>
      </Paper>
      <Grid container justify="center">
        <Buttons />
      </Grid>
    </div>
  );
};

export default RightSidebar;
