import * as tf from "@tensorflow/tfjs";
import { useEffect, useReducer, useRef } from "react";
import { useCounter } from "./useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { getPrediction } from "../helpers";
import { CANVAS_ID } from "../components/Canvas";
import { shuffle } from "../lib/shuffle";

export const useControls = (totalRounds, timePerRound) => {
  const labelRef = useRef(null);
  const taskRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);

  const { startCounter, counter, stopCounter } = useCounter(timePerRound);
  const [{ round, task, inProgress, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  useEffect(() => {
    const fetchModels = async () => {
      const model = await tf.loadLayersModel("./model/model.json");
      const label = require("./../labels.json");

      labelRef.current = [...label];
      taskRef.current = shuffle([...label]);
      modelRef.current = model;
      canvasRef.current = document.getElementById(CANVAS_ID);
      startGame();
    };
    fetchModels();
  }, []);

  const startGame = () => {
    dispatch({ type: "START_GAME", payload: taskRef.current[0] });
  };

  const stopGame = () => {
    stopCounter();
    dispatch({ type: "GAME_OVER" });
  };

  const playGame = () => {
    if (score === totalRounds) {
      stopCounter();
      dispatch({ type: "WIN_GAME" });
    } else if (round === totalRounds + 1) {
      stopCounter();
      dispatch({ type: "GAME_OVER" });
    } else if (counter === 0) {
      clearCanvas(canvasRef);
      stopCounter();
      dispatch({ type: "NEW_ROUND", payload: taskRef.current[round] });
    }
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  const guess = async () => {
    if (modelRef && modelRef.current && canvasRef && canvasRef.current) {
      const prediction = await getPrediction(canvasRef, modelRef.current);
      if (prediction && labelRef.current[prediction[0]] === task) {
        clearCanvas(canvasRef);
        stopCounter();
        dispatch({ type: "WIN_ROUND", payload: taskRef.current[round] });
      }
    }
  };

  useEffect(() => {
    if (inProgress) {
      playGame();
    }
  });

  return {
    controls: {
      startGame,
      stopGame,
      clearCanvas,
      guess,
      startCounter,
    },
    state: {
      inProgress,
      task,
      counter,
      round,
      score,
      totalRounds,
      timePerRound,
    },
  };
};
