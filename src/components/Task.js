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

  const { counter, task, score, inProgress, round } = useGameContext();
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
    if (inProgress && task && previousTask !== task && round < 3) {
      // re-mount typed
      window.setTimeout(() => setPartOne(true), 1000);
    }
  }, [counter, inProgress, previousTask, task, score, previousScore, round]);

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
