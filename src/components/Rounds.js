import React from "react";

import { useGameContext } from "../hooks/useGameContext";

export const Rounds = () => {
  const { round, totalRounds } = useGameContext();
  return (
    <div>
      Round {round} of {totalRounds}
    </div>
  );
};
