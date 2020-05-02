import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

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

  return model ? (
    <StyledContainer>
      <Canvas ref={canvasRef} />
      <Controls
        theCanvas={canvasRef}
        model={model}
        labels={labelRef.current}
        setPrediction={setPrediction}
        prediction={prediction}
      />
    </StyledContainer>
  ) : (
    <div>Loading...</div>
  );
};

const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;
