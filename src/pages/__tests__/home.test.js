import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from "../home";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it("checks that play button exists", () => {
  const { getByText } = render(<Home />);
  const playButton = getByText("Play");
  expect(playButton).toBeInTheDocument();

  fireEvent.click(playButton);
  try {
    waitForElementToBeRemoved(() => playButton);
  } catch (er) {
    console.warn(er);
  }
});

it("should take a snapshot", () => {
  const { asFragment } = render(<Home />);

  expect(asFragment(<Home />)).toMatchSnapshot();
});
