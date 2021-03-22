import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  image: {
    backgroundImage: "url(./images/gr-stocks-Iq9SaJezkOE-unsplash.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  activeGamesListContainer: {},

  activeGamesList: {
    width: "100%",
    minHeight: 400,
    maxHeight: "60vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    opacity: 0.9,
  },

  listItemIcon: {
    marginRight: theme.spacing(2),
    fontSide: "30px",
  },

  appBar: {
    padding: theme.spacing(6, 0),
  },

  avatar: {
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.typography.logoIcon,
  },

  logoTitle: {
    fontFamily: "EB Garamond",
  },

  formContainer: {
    padding: theme.spacing(0, 4),
    height: "100%",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
  },

  button: {
    margin: theme.spacing(3, 0, 2),
  },

  buttonWatchGame: {
    backgroundColor: theme.palette.error.main,
    marginLeft: theme.spacing(1),
  },
}));
