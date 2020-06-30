import { useEffect, useState } from "react";

export const useCounter = (timePerRound) => {
  const [counter, setCounter] = useState(null);

  const startCounter = () => {
    setCounter(timePerRound);
  };

  const stopCounter = () => {
    setCounter(null);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  });

  return {
    counter,
    startCounter,
    stopCounter,
  };
};
