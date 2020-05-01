import React, { useState, useEffect } from "react";
import { getPrediction } from "../helpers";

export function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

  useEffect(() => {
    console.log(prediction);
  });

  return (
    <div>
      <button
        onClick={() => {
          const canvas = theCanvas.current;
          const ctx = canvas.getContext("2d");
          ctx.fillRect(0, 0, canvas.height, canvas.width);
        }}
      >
        Clear the canvas.
      </button>
      <button
        onClick={() =>
          getPrediction(theCanvas, model).then((prediction) =>
            setPrediction(labels[prediction[0]])
          )
        }
      >
        Predict the drawing.
      </button>
    </div>
  );
}
