import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";

import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useGameContext } from "../hooks/useGameContext";
import { TIME_PER_ROUND } from "../pages/game";

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
            options={{ delay: 10 }}
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
            {counter || TIME_PER_ROUND}
            <Typewriter
              key={partTwo}
              options={{ delay: 10 }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("seconds to draw a ")
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
              options={{ delay: 10 }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("in in the box to the right.")
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
