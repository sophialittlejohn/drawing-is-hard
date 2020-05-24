import React from "react";
import { useGameContext } from "../hooks/useGameContext";

export const Score = () => {
  const { score } = useGameContext();

  return <div>Your score is: {score}</div>;
};
