import React, { useContext } from "react";

export const GameStateContext = React.createContext();

export const useGameContext = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("This component must be used within a <Game /> component.");
  }
  return context;
};
