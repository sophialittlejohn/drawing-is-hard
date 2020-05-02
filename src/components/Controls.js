import React, { useState, useEffect } from "react";
import { getPrediction } from "../helpers";
import { useCounter } from "../hooks/useCounter";

export function Controls({
  theCanvas,
  model,
  labels,
  setPrediction,
  prediction,
}) {
  const { startCounter, counter, stopCounter } = useCounter(20);

  const [started, setStarted] = useState(false);
  const [task, setTask] = useState(null);
  const [round, setRound] = useState(null);
  const [score, setScore] = useState(null);

  const startNewRound = () => {
    const currentRound = round;
    setTask(labels[currentRound + 1]);
    setRound(currentRound + 1);
    clearCanvas();
    startCounter();
  };

  const winRound = () => {
    setPrediction("");
    setScore(score + 1);
    startNewRound();
  };

  const outOfTime = () => {
    startNewRound();
  };

  const gameOver = () => {
    setStarted(false);
    stopCounter();
    setTask(null);
  };

  const startGame = () => {
    setRound(1);
    setScore(0);
    startCounter();
    setStarted(true);
    setTask(labels[0]);
  };

  const clearCanvas = () => {
    const canvas = theCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  useEffect(() => {
    if (started && prediction === task) {
      winRound();
    }
  });

  useEffect(() => {
    if (started) {
      if (round === 3) {
        gameOver();
      } else if (counter === 0) {
        outOfTime();
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
