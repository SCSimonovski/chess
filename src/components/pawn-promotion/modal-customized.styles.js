import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((props) => ({
  dialog: {
    margin: 0,

    position: "absolute",
    top: (props) => props.position.y,
    left: (props) => props.position.x,
  },

  gridFigure: {
    width: (props) => props.position.width,
    height: (props) => props.position.height,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: 0,
    cursor: "pointer",
  },

  img: {
    width: "90%",
    height: "90%",
  },
}));
