import { BrowserRouter as Router, Route } from "react-router-dom";
import { io } from "socket.io-client";

import { ThemeProvider } from "@material-ui/styles";
import GameContextProvider from "./context/game.context";

import Homepage from "./components/homepage/homepage.component";
import ChessRoom from "./components/chess-room/chess-room.component";

import "./app.styles.scss";
import { theme } from "./styles/theme.styles";
import { useEffect } from "react";

export const socket = io("http://localhost:5000");

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
