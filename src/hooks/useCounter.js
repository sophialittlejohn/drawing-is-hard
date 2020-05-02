import { useEffect, useState } from "react";

export const useCounter = (value = 20) => {
  const [counter, setCounter] = useState(0);

  const startCounter = () => {
    setCounter(value);
  };

  const stopCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  });

  return { counter, startCounter, stopCounter };
};
