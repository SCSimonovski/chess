import React, { useState, useEffect, useCallback } from "react";
import { socket } from "../App";
import { GameInfo, GameInfoDefault } from "../utils/types";

export type GameContextType = {
  gameInfo: GameInfo;
  setGameInfo: (info: GameInfo) => void;
  isGameStarted: boolean;
  setIsGameStarted: (game: boolean) => void;
  isMyTurn: boolean;
  toggleIsMyTurn: () => void;

  isGameOver: string;
  setIsGameOver: (game: string) => void;
};

const context: GameContextType = {
  gameInfo: GameInfoDefault,
  setGameInfo: () => {},
  isGameStarted: false,
  setIsGameStarted: () => {},
  isMyTurn: true,
  toggleIsMyTurn: () => {},
  isGameOver: "",
  setIsGameOver: () => {},
};

export const GameContext = React.createContext<GameContextType>(context);

const GameContextProvider: React.FC = ({ children }) => {
  const [gameInfo, setGameInfo] = useState(GameInfoDefault);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState("");

  const toggleIsMyTurn = useCallback(() => {
    setIsMyTurn((myTurn) => !myTurn);
  }, []);

  useEffect(() => {
    let data = sessionStorage.getItem("gameData");

    if (data) {
      let { gameInfo, isMyTurn, isGameStarted } = JSON.parse(data);

      setIsMyTurn(isMyTurn);
      setGameInfo(gameInfo);
      setIsGameStarted(isGameStarted);
      socket.emit(
        "reconnect",
        {
          code: gameInfo.code,
          username: gameInfo.player.username,
          room: gameInfo.room,
        },
        ({ message, error }: { message: string; error: string }) => {
          if (message) console.log(message);
          else console.log(error);
        }
      );
    } else {
      setGameInfo(context.gameInfo);
    }

    socket.on("startGame", () => {
      setIsGameStarted(true);
    });

    socket.on("gameOver", (isGameOver) => {
      setIsGameOver(isGameOver);
    });

    socket.on("joinOpponent", (opponent) => {
      setGameInfo((info) => ({
        ...info,
        opponent,
      }));
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "gameData",
      JSON.stringify({
        gameInfo: { ...gameInfo },
        isMyTurn,
        isGameStarted,
      })
    );
  }, [gameInfo, isMyTurn, isGameStarted]);

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        isGameStarted,
        setIsGameStarted,
        isMyTurn,
        toggleIsMyTurn,
        isGameOver,
        setIsGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
