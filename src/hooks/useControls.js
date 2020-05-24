import * as tf from "@tensorflow/tfjs";
import { useEffect, useReducer, useRef } from "react";
import { useCounter } from "./useCounter";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { getPrediction } from "../helpers";
import { TOTAL_ROUNDS } from "../pages/game";
import { CANVAS_ID } from "../components/Canvas";

export const useControls = (totalRounds = TOTAL_ROUNDS) => {
  const labelRef = useRef(null);
  const modelRef = useRef(null);
  const canvasRef = useRef(null);

  const { startCounter, counter, stopCounter } = useCounter();
  const [{ round, task, inProgress, score }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const fetchModels = async () => {
    const model = await tf.loadLayersModel("../../model/model.json");
    const label = require("./../labels.json");

    labelRef.current = label;
    modelRef.current = model;
    canvasRef.current = document.getElementById(CANVAS_ID);
    startGame();
  };

  const startGame = () => {
    dispatch({ type: "START_GAME", payload: labelRef.current[0] });
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
      dispatch({ type: "NEW_ROUND", payload: labelRef.current[round] });
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
    if (modelRef && modelRef.current && canvasRef && canvasRef.current) {
      const prediction = await getPrediction(canvasRef, modelRef.current);

      if (prediction && labelRef.current[prediction[0]] === task) {
        clearCanvas(canvasRef);
        stopCounter();
        dispatch({ type: "WIN_ROUND", payload: labelRef.current[round] });
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (inProgress) {
      playGame();
    }
  });

  useEffect(() => {
    if (inProgress && counter && counter < 18) {
      guess();
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
    },
  };
};
