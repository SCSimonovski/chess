import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url(./images/gr-stocks-Iq9SaJezkOE-unsplash.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      height: (props) => props.size,
    },
  },

  activeGamesIcon: {
    backgroundColor: theme.palette.secondary.dark,
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: theme.icons.listItemIcon,
    marginRight: theme.spacing(1),
  },

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
    fontSize: theme.icons.listItemIcon,
  },

  listItemContentGrid: {
    width: "100%",
    flexGrow: 1,

    overflow: "hidden",
    marginRight: theme.spacing(1),
  },

  listItemTextGrid: {
    width: "100%",
    flexGrow: 1,

    overflow: "hidden",
    marginRight: theme.spacing(1),
  },

  listItemText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  listButtonsGrid: {
    flexGrow: 0,
  },

  buttonWatchGame: {
    backgroundColor: theme.palette.error.main,
    marginLeft: theme.spacing(1),

    "&.Mui-disabled": {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText,
    },

    "&.MuiButton-root:hover": {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.error.contrastText,
    },
  },

  goToTopButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
