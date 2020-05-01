import React from "react";
import { Canvas } from "./components/Canvas.js";
import { Controls } from "./components/Controls.js";
import * as tf from "@tensorflow/tfjs";

export const App = () => {
  const model = tf.loadLayersModel("./model/model.json");
  const labels = require("./labels.json");
  let ref = React.createRef();

  return (
    <div>
      <Canvas ref={ref} />
      <Controls theCanvas={ref} model={model} labels={labels} />
    </div>
  );
};
