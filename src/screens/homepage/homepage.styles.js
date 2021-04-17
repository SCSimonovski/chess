import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },

  mainContainer: {
    height: (props) => props.size,
    overflow: "auto",
  },

  createGameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  paper: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
  },

  appBar: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.down("xs")]: {
      height: (props) => props.size,
    },
  },

  appBarLogoGrid: {
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },

  logoIcon: {
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.icons.logoIcon,
  },

  logoTitle: {
    fontFamily: "EB Garamond",
  },
}));
