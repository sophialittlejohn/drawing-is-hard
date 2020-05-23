import * as tf from "@tensorflow/tfjs";
import { useEffect, useReducer, useRef } from "react";
import { useCounter } from "./useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { getPrediction } from "../helpers";
import { TOTAL_ROUNDS } from "../pages/game";

export const useControls = (totalRounds = TOTAL_ROUNDS) => {
  const labelRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);

  const fetchModels = async () => {
    const model = await tf.loadLayersModel("../../model/model.json");
    const label = require("./../labels.json");

    labelRef.current = label;
    modelRef.current = model;
    canvasRef.current = document.getElementById("myCanvas");
  };

  const { startCounter, counter, stopCounter } = useCounter(20);
  const [{ round, task, started, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const startGame = () => {
    startCounter();
    dispatch({ type: "START_GAME", payload: labelRef.current[0] });
  };

  const stopGame = () => {
    stopCounter();
    dispatch({ type: "GAME_OVER" });
  };

  const playGame = () => {
    console.log("playing");
    if (score === totalRounds) {
      stopCounter();
      dispatch({ type: "WIN_GAME" });
    } else if (round === totalRounds + 1) {
      stopCounter();
      dispatch({ type: "GAME_OVER" });
    } else if (counter === 0) {
      clearCanvas(canvasRef);
      startCounter();
      dispatch({ type: "NEW_ROUND", payload: labelRef.current[round + 1] });
    } else {
      return;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  const guess = async () => {
    console.log("guessing", canvasRef);
    if (modelRef && modelRef.current && canvasRef && canvasRef.current) {
      const prediction = await getPrediction(canvasRef, modelRef.current);
      console.log(">", labelRef.current[prediction[0]]);
      if (prediction && labelRef.current[prediction[0]] === task) {
        clearCanvas(canvasRef);
        startCounter();
        dispatch({ type: "WIN_ROUND", payload: labelRef.current[round + 1] });
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    console.log("usingEffect");
    if (started) {
      playGame();
    }
  });

  useEffect(() => {
    console.log("usingGuess");
    if (started) {
      guess();
    }
  });

  return {
    controls: {
      startGame,
      stopGame,
      clearCanvas,
      guess,
    },
    state: {
      started,
      task,
      counter,
      round,
      score,
    },
  };
};
