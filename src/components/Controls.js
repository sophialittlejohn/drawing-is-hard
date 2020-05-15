import React, { useEffect, useReducer } from "react";
import { getPrediction, clearCanvas } from "../helpers";
import { useCounter } from "../hooks/useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { Rounds } from "./Rounds";
import { Score } from "./Score";
import { Task } from "./Task";
import { Button } from "semantic-ui-react";

export function Controls({ theCanvas, model, labels, totalRounds = 3 }) {
  const { startCounter, counter, stopCounter } = useCounter(20);
  const [{ round, task, started, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const startGame = () => {
    startCounter();
    dispatch({ type: "START_GAME", payload: labels[0] });
  };

  const playGame = () => {
    if (score === 5) {
      stopCounter();
      dispatch({ type: "WIN_GAME" });
    } else if (round === totalRounds + 1) {
      stopCounter();
      dispatch({ type: "GAME_OVER" });
    } else if (counter === 0) {
      clearCanvas(theCanvas);
      startCounter();
      dispatch({ type: "NEW_ROUND", payload: labels[round + 1] });
    }
  };

  useEffect(() => {
    if (started) {
      playGame();
    }
  });

  useEffect(() => {
    getPrediction(theCanvas, model).then((prediction) => {
      if (labels[prediction[0]] === task) {
        clearCanvas(theCanvas);
        startCounter();
        dispatch({ type: "WIN_ROUND", payload: labels[round + 1] });
      }
    });
  });

  return (
    <div>
      {started && <Task task={task} time={counter} />}
      <Score score={score} />
      <Rounds round={round} totalRounds={totalRounds} />
      <div>
        <Button.Group vertical labeled icon>
          <Button icon="play" content="Play" onClick={startGame} />
          <Button
            icon="close"
            content="Clear"
            onClick={() => clearCanvas(theCanvas)}
          />
          <Button
            icon="stop"
            content="Stop"
            onClick={() => dispatch({ type: "GAME_OVER" })}
          />
        </Button.Group>
      </div>
    </div>
  );
}
