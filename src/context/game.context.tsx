import React, { useState, useEffect, useCallback } from "react";
import { socket } from "../App";
import { removeHighlightedMove } from "../utils/board/highlight-moves";
import { GameInfo } from "../types/types";
import { GAME_INFO } from "../constants/game-info";

export type GameContextType = {
  gameInfo: GameInfo;
  handleGameInfo: (info: any) => void;
  isGameStarted: boolean;
  setIsGameStarted: (game: boolean) => void;
  isGameOver: string;
  setIsGameOver: (game: string) => void;
  sideOnMove: string;
  playedMoves: any;
  handlePlayedMoves: (move: any) => void;
  time: { white: number; black: number };
  handleTime: (time: any) => void;
  changeTableSides: () => void;
  flip: boolean | undefined;
  board: any;
  playerBoardSide: string;
  setPlayerBoardSide: any;
  pawnPromotionData: any;
  setPawnPromotionData: (data: any) => void;
  hasSound: boolean;
  setHasSound: (sound: any) => void;
  setSideOnMove: (side: any) => void;
};

const context: GameContextType = {
  gameInfo: GAME_INFO,
  handleGameInfo: () => {},
  isGameStarted: false,
  setIsGameStarted: () => {},
  sideOnMove: "white",
  isGameOver: "",
  setIsGameOver: () => {},
  playedMoves: [],
  handlePlayedMoves: () => {},
  time: { white: 0, black: 0 },
  handleTime: () => {},
  changeTableSides: () => {},
  flip: undefined,
  board: null,
  playerBoardSide: "down",
  setPlayerBoardSide: () => {},
  pawnPromotionData: null,
  setPawnPromotionData: () => {},
  hasSound: false,
  setHasSound: (sound: any) => {},
  setSideOnMove: (side: any) => {},
};

export const GameContext = React.createContext<GameContextType>(context);

const GameContextProvider: React.FC = ({ children }) => {
  const [gameInfo, setGameInfo] = useState(GAME_INFO);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [sideOnMove, setSideOnMove] = useState("black");
  const [isGameOver, setIsGameOver] = useState("");
  const [time, setTime] = useState({ white: 0, black: 0, incrementor: 0 });
  const [playedMoves, setPlayedMoves] = useState<any>([]);
  const [flip, setFlip] = useState<boolean | undefined>(undefined);
  const [board, setBoard] = useState<any>(null);
  const [pawnPromotionData, setPawnPromotionData] = useState<any>(null);
  const [playerBoardSide, setPlayerBoardSide] = useState<string>("down");
  const [hasSound, setHasSound] = useState<boolean>(false);

  const startGameSound = new Audio("./sound-effects/modal.mp3");
  const newGameSound = new Audio("./sound-effects/newGame.mp3");

  // Reset the initial values when rematch is called //
  const onRematch = () => {
    sessionStorage.removeItem("boardData");
    setFlip((flip) => !flip);
    setIsGameStarted(false);
    setIsGameOver("");
    setSideOnMove("black");
    setPlayedMoves((moves: any) => {
      removeHighlightedMove(moves.pop());
      return [];
    });
    setGameInfo((info) => ({
      ...info,
      player: { ...info.player, side: info.opponent.side },
      opponent: { ...info.opponent, side: info.player.side },
    }));
  };

  //////////////////////////////////////////////////////

  const handlePlayedMoves = useCallback((move) => {
    setPlayedMoves((moves: any) => [...moves, move]);
  }, []);

  ////////////////////////////////////////////////////////

  const handleGameInfo = (data: any) => {
    setGameInfo((gameInfo) => ({ ...gameInfo, ...data }));
  };

  ////////////////////////////////////////////////////////

  const handleTime = (time: any) => {
    if (typeof time === "string") {
      let t = time.split("/");
      let timeInSeconds = parseInt(t[0]) * 60;
      let incrementor = t[1] ? parseInt(t[1]) : 0;
      setTime({ white: timeInSeconds, black: timeInSeconds, incrementor });
    } else {
      setTime(time);
    }
  };

  ////////////////////////////////////////////////////////

  const changeTableSides = () => {
    setPlayerBoardSide((side) => (side === "down" ? "up" : "down"));
    setFlip((flip) => !flip);
    if (!gameInfo.isSpectator) {
      socket.emit("flip");
    }
  };

  ////////////////////////////////////////////////////////
  // USE EFFECTS /////////////////////////////////////////

  useEffect(() => {
    let data = sessionStorage.getItem("gameData");

    if (data) {
      let {
        gameInfo,
        sideOnMove,
        isGameStarted,
        playerBoardSide,
        playedMoves,
      } = JSON.parse(data);

      setPlayerBoardSide(playerBoardSide);
      setSideOnMove(sideOnMove);
      setGameInfo(gameInfo);
      setIsGameStarted(isGameStarted);
      setPlayedMoves(playedMoves);

      socket.emit(
        "reconnect",
        {
          isSpectator: gameInfo.isSpectator,
          username: gameInfo.player.username,
          room: gameInfo.room,
          code: gameInfo.code,
          time: gameInfo.time,
        },
        ({ message, error }: { message: string; error: string }) => {
          if (message) console.log(message);
          else console.log(error);
        }
      );
    }

    socket.on("startGame", () => {
      setIsGameStarted(true);
    });

    socket.on("gameOver", (message: any) => {
      setIsGameOver(message);
    });

    socket.on("joinOpponent", (data: any) => {
      setGameInfo((info) => ({
        ...info,
        ...data,
      }));
    });

    socket.on("playRematch", () => {
      onRematch();
    });

    socket.on("setTime", (time: any) => {
      setSideOnMove((side) => (side === "white" ? "black" : "white"));
      setTime(time);
    });

    socket.on("setBoardForSpectators", (board: any) => {
      if (board) setBoard(board);
    });
  }, []);

  ////////////////////////////////////////////////////////

  useEffect(() => {
    if (!!isGameOver) {
      socket.emit("gameOver", isGameOver);
    }
  }, [isGameOver]);

  ////////////////////////////////////////////////////////

  useEffect(() => {
    sessionStorage.setItem(
      "gameData",
      JSON.stringify({
        gameInfo: { ...gameInfo },
        sideOnMove,
        isGameStarted,
        flip,
        playerBoardSide,
        playedMoves,
      })
    );
  }, [gameInfo, sideOnMove, isGameStarted, playedMoves, playerBoardSide, flip]);

  useEffect(() => {
    if (hasSound) {
      if (isGameStarted) {
        startGameSound.play();
      } else {
        newGameSound.play();
      }
    }
  }, [isGameStarted]);

  ////////////////////////////////////////////////////////

  return (
    <GameContext.Provider
      value={{
        board,
        gameInfo,
        time,
        playedMoves,
        isGameStarted,
        sideOnMove,
        playerBoardSide,
        flip,
        isGameOver,
        pawnPromotionData,
        hasSound,
        handleGameInfo,
        setIsGameStarted,
        setIsGameOver,
        handlePlayedMoves,
        handleTime,
        changeTableSides,
        setPlayerBoardSide,
        setPawnPromotionData,
        setHasSound,
        setSideOnMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
