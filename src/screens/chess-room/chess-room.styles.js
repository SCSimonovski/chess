import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: (props) => props.size,
    padding: theme.spacing(2),
    overflow: "hidden",
    position: "relative",

    [theme.breakpoints.down(650)]: {
      alignContent: "center",
    },
  },

  leftGrid: {
    marginRight: theme.spacing(6),
  },

  rightGrid: {
    marginLeft: theme.spacing(6),
    flexGrow: 1,
  },

  boardContainer: {
    display: "flex",
    flexDirection: (props) =>
      props.playerBoardSide === "down" ? "column" : "column-reverse",
    justifyContent: "center",
  },

  boardGrid: {
    flexGrow: 1,
    margin: theme.spacing(1, 0),
  },

  appBarLogoGrid: {
    padding: theme.spacing(1),
  },

  logoIcon: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.icons.mobileIcon,
    marginRight: theme.spacing(0.5),
  },

  logoTitle: {
    fontFamily: "EB Garamond",
  },

  buttonsGrid: {
    position: "absolute",
    bottom: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));
