import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import "../styles/typewriter.css";

import { usePrevious } from "../hooks/usePrevious";
import { useGameContext } from "../hooks/useGameContext";
import { TIME_PER_ROUND, TOTAL_ROUNDS } from "../pages/game";

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
    if (counter === 0) {
      unmountTypewriter();
    }
    if (previousScore !== score) {
      unmountTypewriter();
    }
    if (
      inProgress &&
      task &&
      previousTask !== task &&
      round < TOTAL_ROUNDS + 1
    ) {
      // re-mount typed
      window.setTimeout(() => setPartOne(true), 500);
    }
  }, [counter, inProgress, previousTask, task, score, previousScore, round]);

  const typewriterOptions = {
    delay: 50,
    cursor: " ",
    wrapperClassName: "wrapper",
  };

  return (
    <>
      <div className="wrapper">
        {partOne && (
          <Typewriter
            key={partOne}
            options={typewriterOptions}
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
            <span className="whitespace">{counter || TIME_PER_ROUND}</span>
            <Typewriter
              key={partTwo}
              options={typewriterOptions}
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
            <span className="whitespace">{task}</span>
            <Typewriter
              key={partThree}
              options={typewriterOptions}
              onInit={(typewriter) => {
                typewriter
                  .typeString("in the box to the left.")
                  .callFunction(() => {
                    // setPartThree(true);
                    startCounter();
                  })
                  .start();
              }}
            />
          </>
        )}
      </div>
    </>
  );
};
