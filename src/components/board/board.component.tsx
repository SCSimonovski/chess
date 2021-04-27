import React, { useState, useEffect, useContext, useCallback } from "react";
import { socket } from "../../App";
import { GameContext } from "../../context/game.context";

import Paper from "@material-ui/core/Paper";
import Field from "../field/field.component";
import PawnPromotion from "../pawn-promotion/pawn-promotion.component";

import {
  BOARD_MATRIX,
  BOARD_NUMBERS,
  BOARD_LETTERS,
  BOARD_MATRIX_REVERSED,
} from "../../constants/chess-board";

import {
  highlightPlayedMove,
  removeHighlightedMove,
} from "../../utils/board/highlight-moves";
import { ChessBoard, PlayedMove } from "../../types/types";

import "./board.styles.scss";

const Board = () => {
  const {
    gameInfo,
    isGameStarted,
    isGameOver,
    sideOnMove,
    playerBoardSide,
    flip,
    hasSound,
    board: spectatorsBoard,
    handlePlayedMoves,
  } = useContext(GameContext);

  const [board, setBoard] = useState<ChessBoard>(BOARD_MATRIX);
  const [numbers, setNumbers] = useState<Array<number>>(BOARD_NUMBERS);
  const [letters, setLetters] = useState<Array<string>>(BOARD_LETTERS);

  const [size, setSize] = useState(1);
  const [inlineStyles, setInlineStyles] = useState<any>();
  const [playedMove, setPlayedMove] = useState<PlayedMove | null>(null);
  const [enPassantPosition, setEnPassantPosition] = useState<string>("");

  const TFSound = new Audio("./sound-effects/take-figure.mp3");
  const MFSound = new Audio("./sound-effects/move.mp3");
  MFSound.volume = 0.2;

  ////////////////////////////////////////////

  window.onresize = () => {
    const grid = document.getElementById("boardGrid");
    const width =
      window.innerWidth < 650 ? window.innerWidth + "px" : grid!.offsetHeight;
    const height = width;

    setInlineStyles({ width, height });
    setSize(grid!.offsetHeight);
  };

  ///////////////////////////////////////////////////////////////////////////////
  // FUNCTIONS /////////////////////////////////////////////////////////////////

  const flipBoard = (boardToFlip: any) => {
    setBoard((board) => {
      if (boardToFlip) board = boardToFlip;

      let boardCopy = board.map((row: any) =>
        row.map((column: any) => ({ ...column }))
      );
      return boardCopy.reverse().map((row: any) => row.reverse());
    });
  };

  const handleOpponentsMove = useCallback(() => {
    if (!gameInfo.isSpectator) {
      socket.removeAllListeners("move");
      socket.on("move", (data: any) => {
        let { updatedBoard, enPassantPos, playedMove: opponentsMove } = data;
        setPlayedMove((playedMove: any) => {
          removeHighlightedMove(playedMove);
          return opponentsMove;
        });
        handlePlayedMoves(opponentsMove);
        setEnPassantPosition(enPassantPos);
        setBoard(updatedBoard);
        console.log("has sound is", hasSound);
        if (hasSound) {
          if (!!opponentsMove.takenFigure) {
            TFSound.play();
          } else {
            MFSound.play();
          }
        }
      });
    }
  }, [
    handlePlayedMoves,
    setEnPassantPosition,
    setBoard,
    setPlayedMove,
    gameInfo.isSpectator,
    hasSound,
  ]);

  const handleMoveForSpectators = useCallback(() => {
    if (gameInfo.isSpectator) {
      socket.removeAllListeners("moveForSpectators");
      socket.on(
        "moveForSpectators",
        ({ updatedBoard, enPassantPos, playedMove: opponentsMove }: any) => {
          setPlayedMove((playedMove: any) => {
            removeHighlightedMove(playedMove);
            return opponentsMove;
          });
          handlePlayedMoves(opponentsMove);

          setEnPassantPosition(enPassantPos);
          if (flip) {
            flipBoard(updatedBoard);
          } else {
            setBoard(updatedBoard);
          }

          if (hasSound) {
            if (!!opponentsMove.takenFigure) {
              TFSound.play();
            } else {
              MFSound.play();
            }
          }
        }
      );
    }
  }, [
    flip,
    setEnPassantPosition,
    setBoard,
    setPlayedMove,
    handlePlayedMoves,
    gameInfo.isSpectator,
    hasSound,
  ]);

  const sendPlayedMove = useCallback(
    (newBoard: ChessBoard, enPassantPos: number, move: PlayedMove) => {
      removeHighlightedMove(playedMove);

      setPlayedMove(move);
      handlePlayedMoves(move);
      setBoard(newBoard);

      if (hasSound) {
        if (!!move.takenFigure) {
          TFSound.play();
        } else {
          MFSound.play();
        }
      }

      socket.emit("move", {
        room: gameInfo.room,
        updatedBoard: newBoard,
        enPassantPos,
        playedMove: move,
      });
    },
    [gameInfo.room, playedMove, handlePlayedMoves]
  );

  //////////////////////////////////////////////////////////////////////////
  // USE EFFECTS ///////////////////////////////////////////////////////////

  useEffect(() => {
    const grid = document.getElementById("boardGrid");
    setSize(grid!.offsetHeight);

    const width =
      window.innerWidth < 650 ? window.innerWidth + "px" : grid!.offsetHeight;
    const height = width;

    setInlineStyles({ width, height });
  }, [setSize]);

  useEffect(() => {
    const boardData = sessionStorage.getItem("boardData");
    if (boardData) {
      setBoard(JSON.parse(boardData));
      return;
    }

    if (spectatorsBoard && isGameStarted) {
      setBoard(spectatorsBoard);
      return;
    }

    setPlayedMove(null);

    if (
      (playerBoardSide === "down" && gameInfo.player.side === "white") ||
      (playerBoardSide === "up" && gameInfo.player.side === "black")
    ) {
      setBoard(BOARD_MATRIX);
    } else {
      setBoard(BOARD_MATRIX_REVERSED);
    }
  }, [gameInfo.player.side, isGameStarted, setBoard]);

  useEffect(() => {
    const enPassantPosition = sessionStorage.getItem("enPassantPosition");
    if (enPassantPosition) setEnPassantPosition(JSON.parse(enPassantPosition));

    const playedMove = sessionStorage.getItem("playedMove");
    if (playedMove) {
      setPlayedMove(JSON.parse(playedMove));
    }

    handleOpponentsMove();
  }, [handleOpponentsMove]);

  useEffect(() => {
    sessionStorage.setItem("playedMove", JSON.stringify(playedMove));
  }, [playedMove]);

  useEffect(() => {
    handleMoveForSpectators();
  }, [flip, handleMoveForSpectators]);

  useEffect(() => {
    if (isGameStarted) {
      sessionStorage.setItem("boardData", JSON.stringify(board));
      highlightPlayedMove(playedMove);
    }
  }, [board, isGameStarted, playedMove]);

  useEffect(() => {
    if (isGameStarted)
      sessionStorage.setItem(
        "enPassantPosition",
        JSON.stringify(enPassantPosition)
      );
  }, [isGameStarted, enPassantPosition]);

  useEffect(() => {
    if (typeof flip === "boolean") {
      flipBoard(null);
      setNumbers((numbers) => [...numbers].reverse());
      setLetters((letters) => [...letters].reverse());
      removeHighlightedMove(playedMove);
    }
  }, [flip, setNumbers, setLetters]);

  useEffect(() => {
    socket.on("playRematch", () => {
      flipBoard(null);
      setNumbers((numbers) => [...numbers].reverse());
      setLetters((letters) => [...letters].reverse());
      removeHighlightedMove(playedMove);
    });
  }, []);

  /////////////////////////////////////////////////////////////////////////

  return size ? (
    <div id="board" className="board" style={inlineStyles}>
      <div id="numbers" className="board-numbers">
        {numbers.map((number) => (
          <span key={number} className="number">
            {number}
          </span>
        ))}
      </div>

      <Paper
        className={`board-fields ${
          (!isGameStarted || isGameOver || gameInfo.isSpectator) && "disabled"
        }`}
      >
        {board.map((row, i) => {
          return (
            <React.Fragment key={i}>
              {row.map((field, j) => {
                return (
                  <Field
                    key={`${i}${j}`}
                    {...field}
                    sendPlayedMove={sendPlayedMove}
                    position={`${i}${j}`}
                    board={board}
                    sideOnMove={sideOnMove}
                    playerSide={gameInfo.player.side}
                    enPassantPosition={enPassantPosition}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </Paper>

      <div className="board-letters">
        {letters.map((letter) => (
          <span key={letter} className="letter">
            {letter}
          </span>
        ))}
      </div>

      <PawnPromotion sendPlayedMove={sendPlayedMove} />
    </div>
  ) : null;
};

export default Board;
