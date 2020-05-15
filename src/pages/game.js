import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

import { Canvas } from "../components/Canvas";
import { Controls } from "../components/Controls";
import { Container, Header, Card, Placeholder } from "semantic-ui-react";

export const Game = () => {
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  // add typed.js
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
    <Container style={{ paddingTop: "10%" }}>
      <Card.Group>
        {model ? (
          <Card raised style={{ padding: "24px" }}>
            <Header as="h1">Drawing is hard</Header>
            <p>You've got to be fast!</p>
            <Controls
              theCanvas={canvasRef}
              model={model}
              labels={labelRef.current}
            />
          </Card>
        ) : (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        )}
        <Card raised>
          {model ? (
            <Canvas ref={canvasRef} />
          ) : (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          )}
        </Card>
      </Card.Group>
    </Container>
  );
};
