import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  dialog: {
    margin: 0,

    position: "absolute",
    top: (props) => props.position?.y || 0,
    left: (props) => props.position?.x || 0,
  },

  gridFigure: {
    width: (props) => props.position?.width || 0,
    height: (props) => props.position?.height || 0,

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
