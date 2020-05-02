import React from "react";

export const Task = ({ task, time }) => {
  return (
    <p>
      Please draw a: {task}
      <br />
      You have {time} left...
    </p>
  );
};
