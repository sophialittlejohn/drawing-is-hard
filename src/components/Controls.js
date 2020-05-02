import React, { useEffect, useReducer } from "react";
import { getPrediction } from "../helpers";
import { useCounter } from "../hooks/useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { Rounds } from "./Rounds";
import { Score } from "./Score";
import { Task } from "./Task";

export function Controls({
  theCanvas,
  model,
  labels,
  setPrediction,
  prediction,
  totalRounds = 5,
}) {
  const { startCounter, counter, stopCounter } = useCounter(20);
  const [{ round, task, started, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const clearCanvas = () => {
    const canvas = theCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  const makePrediction = () => {
    getPrediction(theCanvas, model).then((prediction) =>
      setPrediction(labels[prediction[0]])
    );
  };

  const startGame = () => {
    startCounter();
    dispatch({ type: "START_GAME", payload: labels[0] });
  };

  const playGame = () => {
    if (round === totalRounds) {
      stopCounter();
      dispatch({ type: "GAME_OVER" });
    } else if (prediction === task) {
      setPrediction("");
      clearCanvas();
      startCounter();
      dispatch({ type: "WIN_ROUND", payload: labels[round + 1] });
    } else if (counter === 0) {
      clearCanvas();
      startCounter();
      setPrediction("");
      dispatch({ type: "NEW_ROUND", payload: labels[round + 1] });
    }
  };

  useEffect(() => {
    if (started) {
      playGame();
    }
  });

  return (
    <div>
      <Task task={task} time={counter} />
      <Score score={score} />
      <Rounds round={round} totalRounds={totalRounds} />
      <button onClick={clearCanvas}>Clear the canvas.</button>
      <button onClick={makePrediction}>Predict</button>
      <button onClick={startGame}>{started ? "Restart" : "Start"}</button>
    </div>
  );
}
