import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
  },

  paperGrid: {
    height: "100%",
    backgroundColor: theme.palette.secondary.main,

    padding: theme.spacing(2),
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,

    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.icons.logoIcon,
  },

  logoTitle: {
    fontFamily: "EB Garamond",
    color: theme.palette.primary.contrastText,
  },

  timeGrid: {},
  timerIconContainer: {
    position: "relative",
    width: "30px",
  },

  timerIcon: {
    position: "absolute",
    top: -35,
    left: -2,

    borderRadius: "100%",
    padding: "5px",
    backgroundColor: "#fff",

    fontSize: "25px",
  },

  timePaper: {
    padding: theme.spacing(2, 4, 1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
