import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

import { useGameContext } from "../pages/game";
import { useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const Task = ({ startCounter }) => {
  const [partOne, setPartOne] = useState(false);
  const [partTwo, setPartTwo] = useState(false);
  const [partThree, setPartThree] = useState(false);

  const { counter, task, score, started, round } = useGameContext();
  const previousTask = usePrevious(task);
  const previousScore = usePrevious(score);

  const unmountTypewriter = () => {
    setPartOne(false);
    setPartTwo(false);
    setPartThree(false);
  };

  useEffect(() => {
    unmountTypewriter();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      // unmount typed components
      unmountTypewriter();
    }
    if (previousScore !== score) {
      unmountTypewriter();
    }
    if (started && task && previousTask !== task && round < 3) {
      // re-mount typed
      window.setTimeout(() => setPartOne(true), 1000);
    }
  }, [counter, started, previousTask, task, score, previousScore, round]);

  return (
    <>
      <span>
        {partOne && (
          <Typewriter
            // target child div to for inline layout
            key={partOne}
            onInit={(typewriter) => {
              typewriter
                .typeString("Hello, you have ")
                .callFunction(() => {
                  setPartTwo(true);
                  console.log("PartOne typed out!");
                })
                .start();
            }}
          />
        )}
        {partTwo && (
          <>
            {counter || 20}
            <Typewriter
              key={partTwo}
              onInit={(typewriter) => {
                typewriter
                  .typeString("to show off your best drawing of a ")
                  .callFunction(() => {
                    setPartThree(true);
                    console.log("PartTwo typed out!");
                  })
                  .start();
              }}
            />
          </>
        )}
        {partThree && (
          <>
            {task}
            <Typewriter
              key={partThree}
              onInit={(typewriter) => {
                typewriter
                  .typeString("in the box to the right.")
                  .callFunction(() => {
                    setPartThree(true);
                    console.log("PartThree typed out!");
                    startCounter();
                  })
                  .start();
              }}
            />
          </>
        )}
      </span>
    </>
  );
};
