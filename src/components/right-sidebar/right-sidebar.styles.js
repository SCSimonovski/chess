import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  paperList: {
    flexGrow: 1,
    position: "relative",
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },

  listFlex: {
    flexGrow: 1,
    position: "relative",
  },

  list: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "auto",
  },

  listTextContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "32px",
  },

  listItemText: {
    flexGrow: 1,
    width: "50%",
  },

  listIcon: {
    marginRight: theme.spacing(1),
  },

  appBar: {
    padding: theme.spacing(6, 0),
    flexGrow: 0,
  },

  avatar: {
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.typography.logoIcon,
  },
}));
