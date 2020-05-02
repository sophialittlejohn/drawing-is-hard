import React, { useEffect, useReducer } from "react";
import { getPrediction } from "../helpers";
import { useCounter } from "../hooks/useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";

export function Controls({
  theCanvas,
  model,
  labels,
  setPrediction,
  prediction,
}) {
  const { startCounter, counter, stopCounter } = useCounter(20);
  const [{ round, task, started, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const startGame = () => {
    startCounter();
    dispatch({ type: "START_GAME", payload: labels[0] });
  };

  const clearCanvas = () => {
    const canvas = theCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  useEffect(() => {
    if (started) {
      if (round === 3) {
        stopCounter();
        dispatch({ type: "GAME_OVER" });
      } else if (started && prediction === task) {
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
    }
  });

  return (
    <div>
      <p>Draw a {task}</p>
      <button onClick={clearCanvas}>Clear the canvas.</button>
      <button
        onClick={() =>
          getPrediction(theCanvas, model).then((prediction) =>
            setPrediction(labels[prediction[0]])
          )
        }
      >
        Predict the drawing.
      </button>
      <div>Score: {score}</div>
      <div>Round: {round}</div>
      <div>Time remaining: {counter}</div>
      <button onClick={startGame}>Start</button>
    </div>
  );
}
