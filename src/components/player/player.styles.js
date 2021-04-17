import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  player: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(1, 2),
    overflow: "hidden",
  },

  //////////////////////////////////////////////////

  iconGrid: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),

    backgroundColor: (props) =>
      props.side === "white"
        ? theme.palette.grey[600]
        : theme.palette.grey[300],

    color: (props) => props.side,
    fontSize: 30,
  },

  username: {
    marginRight: theme.spacing(3),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  figureImg: {
    marginRight: -9,
    width: theme.spacing(1.8),
    height: theme.spacing(1.8),

    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(1.6),
      height: theme.spacing(1.6),
    },
  },

  advantage: {
    fontSize: 12,
    color: theme.palette.grey[600],
  },

  /////////////////////////////////////////////////

  timePaper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],

    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  },

  timeIcon: {
    marginRight: theme.spacing(0.5),
  },
}));
