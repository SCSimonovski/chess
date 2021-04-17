// Components
import ActiveGamesList from "../../components/active-games/active-games-list.component";
import CreateGame from "../../components/create-game/create-game.component";

// Material-Ui Components
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GiChessKing } from "react-icons/gi";

import { useStyles } from "./homepage.styles";

const Homepage = () => {
  const classes = useStyles({ size: window.innerHeight });

  const scrollIntoView = (section: string) => {
    document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container component="main" className={classes.mainContainer}>
          <CssBaseline />
          <Grid
            id="top"
            item
            xs={12}
            md={4}
            component={Paper}
            elevation={6}
            square
            className={classes.paper}
          >
            <div className={classes.createGameContainer}>
              <AppBar position="relative" className={classes.appBar}>
                <Grid
                  container
                  direction="column"
                  alignContent="center"
                  justify="center"
                  alignItems="center"
                  className={classes.appBarLogoGrid}
                >
                  <Avatar className={classes.logoIcon}>
                    <GiChessKing />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h3"
                    className={classes.logoTitle}
                  >
                    Chess Master
                  </Typography>
                </Grid>

                <Hidden smUp>
                  <Grid container direction="column">
                    <Hidden smUp>
                      <Grid container justify="center">
                        <ButtonGroup
                          size="large"
                          color="secondary"
                          aria-label="Create and Join game buttons"
                        >
                          <Button onClick={() => scrollIntoView("create-game")}>
                            <ExpandMoreIcon />
                            Create Game
                          </Button>
                          <Button onClick={() => scrollIntoView("join-game")}>
                            Join Game
                            <ExpandMoreIcon />
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Hidden>
              </AppBar>
              <CreateGame />
            </div>
          </Grid>
          <ActiveGamesList />
        </Grid>
      </div>
    </>
  );
};

export default Homepage;
