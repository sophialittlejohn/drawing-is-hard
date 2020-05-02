import React, { useState, useEffect, useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import { Canvas } from "../components/Canvas";
import { Controls } from "../components/Controls";

export const Game = () => {
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  const [prediction, setPrediction] = useState("");
  const [model, setModel] = useState(false);

  const fetchModels = async () => {
    const model = await tf.loadLayersModel("../../model/model.json");
    const label = require("./../labels.json");
    labelRef.current = label;
    setModel(model);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div>
      {model && (
        <>
          <Canvas ref={canvasRef} />
          <Controls
            theCanvas={canvasRef}
            model={model}
            labels={labelRef.current}
            setPrediction={setPrediction}
            prediction={prediction}
          />
        </>
      )}
    </div>
  );
};
