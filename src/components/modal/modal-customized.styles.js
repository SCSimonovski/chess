import { withStyles, makeStyles } from "@material-ui/core/styles";

import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: theme.typography.modalIcon,
  },

  title: {
    fontFamily: "EB Garamond",
    color: theme.palette.secondary.contrastText,
  },

  message: {
    textAlign: "center",
    padding: theme.spacing(1, 4),
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.dark,
  },
  closeButton: {
    color: theme.palette.secondary.contrastText,
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Grid container alignItems="center" justify="center">
        <Grid container item xs={10} spacing={1} alignItems="center">
          {children}
        </Grid>
        <Grid container item xs={2} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
