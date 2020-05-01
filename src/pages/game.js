import React from "react";

import * as tf from "@tensorflow/tfjs";
import { Canvas } from "../components/Canvas";
import { Controls } from "../components/Controls";

export const Game = () => {
  const model = tf.loadLayersModel("../../model/model.json");
  const labels = require("./../labels.json");
  let ref = React.createRef();

  return (
    <div>
      <Canvas ref={ref} />
      <Controls theCanvas={ref} model={model} labels={labels} />
    </div>
  );
};
