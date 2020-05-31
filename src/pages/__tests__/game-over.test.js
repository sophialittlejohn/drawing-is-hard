import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { GameOver } from "../game-over";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: { score: 10 },
  }),
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

it("should take a snapshot", () => {
  const { asFragment } = render(<GameOver />);

  expect(asFragment(<GameOver />)).toMatchSnapshot();
});

it("the final score should be in the DOM", () => {
  const { getByText } = render(<GameOver />);

  expect(getByText("10")).toBeInTheDocument();
});

it("Play again button should be in the DOM", () => {
  const { getByText } = render(<GameOver />);

  expect(getByText(/Play again/i)).toBeInTheDocument();
  fireEvent.click(getByText(/Play again/i));
});

it("Home button should be in the DOM", () => {
  const { getByRole } = render(<GameOver />);

  expect(getByRole("button", { name: /home/i })).toBeInTheDocument();
  fireEvent.click(getByRole("button", { name: /home/i }));
});
