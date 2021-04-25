import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 4),
    height: "100%",

    [theme.breakpoints.down("xs")]: {
      height: (props) => props.size,
    },
  },

  form: {
    width: "100%", // Fix IE 11 issue.
  },

  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: "100%",
  },

  selectTimeGrid: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },

  checkbox: {
    display: "flex",
    alignContent: "center",
  },

  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));
