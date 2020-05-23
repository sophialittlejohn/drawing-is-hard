import React from "react";
import { useGameContext } from "../pages/game";

export const Task = () => {
  const { counter, task } = useGameContext();
  return (
    <p>
      Please draw a: {task}
      <br />
      You have {counter} left...
    </p>
  );
};
