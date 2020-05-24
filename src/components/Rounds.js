import React from "react";
import { TOTAL_ROUNDS } from "../pages/game";
import { useGameContext } from "../hooks/useGameContext";

export const Rounds = () => {
  const round = useGameContext();
  return (
    <div>
      Round {round.round} of {TOTAL_ROUNDS}
    </div>
  );
};
