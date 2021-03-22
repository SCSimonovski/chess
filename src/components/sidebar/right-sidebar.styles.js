import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },

  container: {},

  listIcon: {
    marginRight: theme.spacing(1),
  },

  paperList: {
    width: "100%",
    height: "80vh",

    overflow: "auto",
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

  buttonGrid: {},
  button: {},
}));
