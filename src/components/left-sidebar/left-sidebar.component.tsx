import { useContext } from "react";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SoundIcon from "../sound-icon/sound-icon.component";

import { GiChessKing } from "react-icons/gi";
import { useStyles } from "./left-sidebar.styles";

const LeftSidebar = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        component={Paper}
        className={classes.paperGrid}
        container
        alignItems="center"
      >
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
          <Typography component="h1" variant="h3" className={classes.logoTitle}>
            Chess Master
          </Typography>
          <SoundIcon />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeftSidebar;
