import { useEffect, useState } from "react";

import { TIME_PER_ROUND } from "../pages/play";

export const useCounter = () => {
  const [counter, setCounter] = useState(null);

  const startCounter = (value) => {
    setCounter(value || TIME_PER_ROUND);
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
