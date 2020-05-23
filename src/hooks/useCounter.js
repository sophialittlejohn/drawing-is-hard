import { useEffect, useState } from "react";

export const useCounter = () => {
  const [counter, setCounter] = useState(null);

  const startCounter = (value) => {
    setCounter(value || 20);
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
