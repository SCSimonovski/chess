import React, { useState, useEffect, useContext, useCallback } from "react";

import { socket } from "../../App";

import { GameContext } from "../../context/game.context";

import Paper from "@material-ui/core/Paper";
import Field from "../field/field.component";
import PawnPromotion from "../pawn-promotion/pawn-promotion.component";

import {
  ChessBoard,
  BOARD_MATRIX,
  BOARD_NUMBERS,
  BOARD_LETTERS,
  FigureTitle,
} from "../../fixtures/chess-board";

import "./board.styles.scss";
import { PosPawnPromotion } from "../../utils/types";
import { positionToIndices } from "../../utils/board/position-to-indices";
import { updateBoardOnPawnPromotion } from "../../utils/board/update-board";
import { highlightPlayedMove } from "../../utils/board/highlight-moves";

const Board = () => {
  const {
    gameInfo,
    isGameStarted,
    isGameOver,
    isMyTurn,
    toggleIsMyTurn,
    setIsGameOver,
  } = useContext(GameContext);

  const [board, setBoard] = useState<ChessBoard>(BOARD_MATRIX);
  const [size, setSize] = useState(0);

  const [numbers, setNumbers] = useState<Array<number>>(BOARD_NUMBERS);
  const [letters, setLetters] = useState<Array<string>>(BOARD_LETTERS);

  const [enPassantPosition, setEnPassantPosition] = useState<number>(-1);

  useEffect(() => {
    const grid = document.getElementById("boardGrid");
    setSize(grid!.offsetHeight);

    const boardData = sessionStorage.getItem("boardData");
    if (boardData) {
      setBoard(JSON.parse(boardData));
    }

    socket.on("opponentMove", (data) => {
      toggleIsMyTurn();
      const { updatedBoard, enPassantPos, prevPlayedMove } = data;

      highlightPlayedMove(prevPlayedMove);
      setEnPassantPosition(enPassantPos);
      setBoard(updatedBoard);
    });
  }, [setEnPassantPosition, setBoard, setSize, toggleIsMyTurn]);

  useEffect(() => {
    if (gameInfo.player.side === "black" && board === BOARD_MATRIX) {
      setNumbers([...BOARD_NUMBERS.reverse()]);
      setLetters([...BOARD_LETTERS.reverse()]);
      setBoard([...board.reverse().map((row) => [...row.reverse()])]);
    }
  }, [board, gameInfo, setBoard, setLetters, setNumbers, gameInfo.player.side]);

  useEffect(() => {
    sessionStorage.setItem("boardData", JSON.stringify(board));
  }, [board]);

  const handleSetBoard = (board: ChessBoard) => {
    setBoard(board);
  };

  const sendPlayedMoves = useCallback(
    (
      newBoard: ChessBoard,
      enPassantPos: number,
      prevPlayedMove: { from: string; to: string }
    ) => {
      toggleIsMyTurn();

      let boardCopy = newBoard.map((row) =>
        row.map((column) => ({ ...column }))
      );
      let updatedBoard = boardCopy.reverse().map((row) => row.reverse());

      socket.emit("move", {
        room: gameInfo.room,
        updatedBoard,
        enPassantPos,
        prevPlayedMove,
      });
    },
    [gameInfo.room, toggleIsMyTurn]
  );

  const [openPawnPromotion, setOpenPawnPromotion] = useState(false);
  const [posPawnPromotion, setPosPawnPromotion] = useState<PosPawnPromotion>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fieldPos: "00",
    direction: "column",
  });

  const handleClosePawnPromotion = () => {
    setOpenPawnPromotion(false);
  };
  const handleOpenPawnPromotion = (pos: PosPawnPromotion) => {
    setOpenPawnPromotion(true);
    setPosPawnPromotion(pos);
  };

  const handlePawnPromotion = (fieldPos: string, title: FigureTitle) => {
    const { newBoard, checkmate } = updateBoardOnPawnPromotion(
      board,
      fieldPos,
      title,
      gameInfo.player.side
    );

    if (checkmate) setIsGameOver(gameInfo.player.side);

    setBoard(newBoard);
  };

  return size ? (
    <div id="board" className="board" style={{ width: size }}>
      <div id="numbers" className="numbers">
        {numbers.map((number) => (
          <span key={number} className="number">
            {number}
          </span>
        ))}
      </div>

      <Paper className={`fields ${!isGameStarted || (isGameOver && "")}`}>
        {board.map((row, i) => {
          return (
            <React.Fragment key={i}>
              {row.map((field, j) => {
                return (
                  <Field
                    key={`${i}${j}`}
                    {...field}
                    sendPlayedMoves={sendPlayedMoves}
                    position={`${i}${j}`}
                    board={board}
                    handleSetBoard={handleSetBoard}
                    isMyTurn={isMyTurn}
                    mySide={gameInfo.player?.side}
                    enPassantPosition={enPassantPosition}
                    handleOpenPawnPromotion={handleOpenPawnPromotion}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </Paper>

      <div className="letters" style={{ width: size }}>
        {letters.map((letter) => (
          <span key={letter} className="letter">
            {letter}
          </span>
        ))}
      </div>

      <PawnPromotion
        open={openPawnPromotion}
        handleClose={handleClosePawnPromotion}
        side={gameInfo.player.side}
        position={posPawnPromotion}
        handlePawnPromotion={handlePawnPromotion}
      />
    </div>
  ) : null;
};

export default Board;
