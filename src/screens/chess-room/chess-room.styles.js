import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: (props) => props.size,
    padding: theme.spacing(2),

    [theme.breakpoints.down(960)]: {
      padding: theme.spacing(0),
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

    [theme.breakpoints.down(960)]: {
      padding: theme.spacing(2, 0),
    },
  },

  boardGrid: {
    flexGrow: 1,
    margin: theme.spacing(1, 0),
  },

  appBarLogoGrid: {
    padding: theme.spacing(1),
    position: "relative",
  },

  soundIconContainer: {
    position: "absolute",
    top: 0,
    left: 5,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },

  logoIcon: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: theme.icons.mobileIcon,
    marginRight: theme.spacing(0.5),
  },

  logoTitle: {
    fontFamily: "EB Garamond",
  },

  buttonsGrid: {
    padding: theme.spacing(0, 1),

    [theme.breakpoints.down(960)]: {
      paddingBottom: theme.spacing(1),
    },
  },
}));
