import React from "react";

export const Task = ({ task, time }) => {
  return (
    <div>
      Please draw a: {task}
      You have {time} left...
    </div>
  );
};
