import React from "react";
import { useGameContext, TOTAL_ROUNDS } from "../pages/game";

export const Rounds = () => {
  const round = useGameContext();
  return (
    <div>
      Round: {round.round} of {TOTAL_ROUNDS}
    </div>
  );
};
