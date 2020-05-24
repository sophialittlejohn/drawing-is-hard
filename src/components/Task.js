import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import "../styles/typewriter.css";

import { usePrevious } from "../hooks/usePrevious";
import { useGameContext } from "../hooks/useGameContext";
import { TIME_PER_ROUND, TOTAL_ROUNDS } from "../pages/game";

const typewriterOptions = {
  delay: 50,
  cursor: " ",
  wrapperClassName: "wrapper",
};

export const Task = ({ startCounter }) => {
  const [partOne, setPartOne] = useState(null);
  const [partTwo, setPartTwo] = useState(null);
  const [partThree, setPartThree] = useState(null);

  const { counter, task, score, inProgress, round } = useGameContext();
  const previousTask = usePrevious(task);
  const previousScore = usePrevious(score);

  const unmountTypewriter = () => {
    setPartOne(null);
    setPartTwo(null);
    setPartThree(null);
  };

  useEffect(() => {
    if (counter === 0) {
      unmountTypewriter();
    }
    if (score && previousScore !== score) {
      unmountTypewriter();
      window.setTimeout(() => setPartOne("Nice sketch! You have"));
    } else if (
      inProgress &&
      task &&
      previousTask !== task &&
      round < TOTAL_ROUNDS + 1
    ) {
      let initialString = "Close... you have ";
      if (round === 1) {
        initialString = "Let's get started, you have ";
      }
      window.setTimeout(() => setPartOne(initialString));
    }
  }, [counter, inProgress, previousTask, task, score, previousScore, round]);

  const initType = (typewriter, strings, callback) => {
    typewriter.typeString(strings).callFunction(callback).start();
  };

  return (
    <>
      <div className="wrapper">
        {partOne && (
          <Typewriter
            key={partOne}
            options={typewriterOptions}
            onInit={(typewriter) =>
              initType(typewriter, partOne, () =>
                setPartTwo("seconds to draw a")
              )
            }
          />
        )}
        {partTwo && (
          <>
            <span className="whitespace">{counter || TIME_PER_ROUND}</span>
            <Typewriter
              key={partTwo}
              options={typewriterOptions}
              onInit={(typewriter) =>
                initType(typewriter, partTwo, () =>
                  setPartThree("in the box to the left.")
                )
              }
            />
          </>
        )}
        {partThree && (
          <>
            <span className="whitespace">{task}</span>
            <Typewriter
              key={partThree}
              options={typewriterOptions}
              onInit={(typewriter) =>
                initType(typewriter, partThree, () => startCounter())
              }
            />
          </>
        )}
      </div>
    </>
  );
};
