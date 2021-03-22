import { createMuiTheme } from "@material-ui/core/styles";

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

  typography: {
    modalIcon: 34,
    logoIcon: 76,
  },
});
