import { createMuiTheme } from "@material-ui/core/styles";

const t = createMuiTheme();

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#60ad5e",
      main: "#2e7d32",
      dark: "#005005",
      contrastText: "#fff",
    },
    secondary: {
      light: "#484848",
      main: "#212121",
      dark: "#0f0f0f",
      contrastText: "#fff",
    },
  },

  icons: {
    listItemIcon: 26,
    mobileIcon: 28,
    modalIcon: 34,
    logoIcon: 76,
  },

  typography: {
    body1: {
      fontSize: "1rem",

      [t.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },

    h4: {
      [t.breakpoints.down("sm")]: {
        fontSize: "1.4rem",
      },
    },
  },
});
