import { BrowserRouter as Router, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { ThemeProvider } from "@material-ui/styles";
import GameContextProvider from "./context/game.context";

import Homepage from "./screens/homepage/homepage.component";
import ChessRoom from "./screens/chess-room/chess-room.component";

import "./app.styles.scss";
import { theme } from "./styles/theme.styles";

export const socket: any = io(process.env.REACT_APP_SERVER_URL!);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameContextProvider>
        <Router>
          <Route exact path="/" component={Homepage} />
          <Route path="/chessroom" component={ChessRoom} />
        </Router>
      </GameContextProvider>
    </ThemeProvider>
  );
}
