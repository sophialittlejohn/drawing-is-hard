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
      <h1>Drawing is hard</h1>
      <p>You've got to be fast!</p>
      <StyledGame>
        <Canvas ref={canvasRef} />
        <Controls
          theCanvas={canvasRef}
          model={model}
          labels={labelRef.current}
          setPrediction={setPrediction}
          prediction={prediction}
        />
      </StyledGame>
    </StyledContainer>
  ) : (
    <div>Loading...</div>
  );
};

const StyledContainer = styled.main`
  background: ${({ theme }) => theme.colors.background};
  max-width: 800px;
  height: 100%;
  margin: 100px auto;
  padding: ${({ theme }) => theme.space[4]}px;
`;

const StyledGame = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
