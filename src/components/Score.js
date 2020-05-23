import React from "react";
import { useGameContext } from "../pages/game";

export const Score = () => {
  const { score } = useGameContext();

  return <div>Your score is: {score}</div>;
};
