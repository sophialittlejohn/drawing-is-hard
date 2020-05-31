import { useReducer } from "react";
import { cleanup } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { renderHook } from "@testing-library/react-hooks";

import { useCounter } from "../../hooks/useCounter";
import { initialGameState, gameReducer } from "../../reducers/gameReducer";
const { act } = TestRenderer;

afterEach(cleanup);

const roundOneState = {
  inProgress: true,
  round: 1,
  score: 0,
  task: "bird",
};

const roundTwoState = {
  inProgress: true,
  round: 2,
  score: 0,
  task: "book",
};

const roundThreeState = {
  inProgress: true,
  round: 3,
  score: 1,
  task: "car",
};

test("should use counter", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.counter).toBe(null);
  expect(typeof result.current.startCounter).toBe("function");

  act(() => {
    result.current.startCounter();
  });

  expect(result.current.counter).toBe(20);

  act(() => {
    result.current.stopCounter();
  });

  expect(result.current.counter).toBe(null);
});

test("should handle test gameReducer hook", () => {
  const { result } = renderHook(() =>
    useReducer(gameReducer, initialGameState)
  );

  const [initialState, dispatch] = result.current;

  act(() => {
    dispatch({ type: "START_GAME", payload: "bird" });
  });

  expect(result.current[0]).toStrictEqual(roundOneState);

  act(() => {
    dispatch({ type: "NEW_ROUND", payload: "book" });
  });

  expect(result.current[0]).toStrictEqual(roundTwoState);

  act(() => {
    dispatch({ type: "WIN_ROUND", payload: "car" });
  });

  expect(result.current[0]).toStrictEqual(roundThreeState);

  act(() => {
    dispatch({ type: "GAME_OVER" });
  });

  expect(result.current[0]).toStrictEqual(initialState);
});
