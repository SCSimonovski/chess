import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    padding: theme.spacing(2),
  },

  leftGrid: {
    // backgroundColor: "green",
  },

  rightGrid: {
    // backgroundColor: "green",
  },

  topGrid: {
    // backgroundColor: "red",
    // width: "100%",
  },

  bottomGrid: {
    // backgroundColor: "red",
  },

  boardContainer: {
    // height: "100%",
    // width: "100%",
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  boardGrid: {
    // height: "100%",
    flexGrow: 1,
    // backgroundColor: "black",
    margin: theme.spacing(1, 0),
  },

  playerName: {
    // width: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 2),
  },

  playerTypography: {
    // margin: 10,
    // padding: 0,
    // display: "block",
    width: "100%",
    fontSize: "18px",
  },

  avatar1: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.grey[600],

    fontSize: "18px",
  },

  avatar2: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.grey[300],
    color: "black",

    fontSize: "18px",
  },
}));
