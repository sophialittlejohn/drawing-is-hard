import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import "../styles/typewriter.css";

import { usePrevious } from "../hooks/usePrevious";
import { useGameContext } from "../hooks/useGameContext";

const typewriterOptions = {
  delay: 30,
  cursor: " ",
  wrapperClassName: "wrapper",
};

export const Task = ({ startCounter }) => {
  const [partOne, setPartOne] = useState(null);
  const [partTwo, setPartTwo] = useState(null);
  const [partThree, setPartThree] = useState(null);

  const {
    counter,
    task,
    score,
    inProgress,
    round,
    totalRounds,
    timePerRound,
  } = useGameContext();
  const previousTask = usePrevious(task);
  const previousScore = usePrevious(score);

  const unmountTypewriter = () => {
    setPartOne(null);
    setPartTwo(null);
    setPartThree(null);
  };

  function counterDidUpdate() {
    if (counter === 0) {
      unmountTypewriter();
    }
  }

  useEffect(counterDidUpdate, [counter]);

  useEffect(() => {
    if (score && previousScore !== score) {
      unmountTypewriter();
      window.setTimeout(() => setPartOne("Nice sketch! You have"));
    } else if (
      inProgress &&
      task &&
      previousTask !== task &&
      round < totalRounds + 1
    ) {
      let initialString = "Close... you have ";
      if (round === 1) {
        initialString = "Let's get started, you have ";
      }
      window.setTimeout(() => setPartOne(initialString));
    }
  }, [inProgress, previousTask, task, score, previousScore, round]);

  const initType = (typewriter, strings, callback) => {
    typewriter.typeString(strings).callFunction(callback).start();
  };

  const renderTypewriter = (key, message, callback) => (
    <>
      {message}
      <Typewriter
        key={key}
        options={typewriterOptions}
        onInit={(typewriter) => initType(typewriter, key, callback)}
      />
    </>
  );

  const one =
    partOne &&
    renderTypewriter(partOne, null, () => setPartTwo("seconds to draw a"));
  const two =
    partTwo &&
    renderTypewriter(
      partTwo,
      <span className="whitespace">{counter || timePerRound}</span>,
      () => setPartThree("in the box to the left.")
    );
  const three =
    partThree &&
    renderTypewriter(
      partThree,
      <span className="whitespace">{task}</span>,
      () => startCounter()
    );

  return (
    <div className="wrapper">
      {one}
      {two}
      {three}
    </div>
  );
};
