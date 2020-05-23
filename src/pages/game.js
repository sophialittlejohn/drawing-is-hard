import React, { useContext } from "react";
import { Container, Header, Card, Button } from "semantic-ui-react";
import { useControls } from "../hooks/useControls";
import { Score } from "../components/Score";
import { Rounds } from "../components/Rounds";
import { Task } from "../components/Task";
import { Canvas } from "../components/Canvas";
import { useMemo } from "react";

export const TOTAL_ROUNDS = 5;

const GameStateContext = React.createContext();

export const useGameContext = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("This component must be used within a <Game /> component.");
  }
  return context;
};

export const Game = () => {
  const { state, controls } = useControls();

  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <GameStateContext.Provider value={{ ...memoizedStateValue }}>
      <Container style={{ paddingTop: "10%" }}>
        <Card.Group>
          <Card raised style={{ padding: "24px" }}>
            <Header as="h1">Drawing is hard</Header>
            <p>You've got to be fast!</p>
            <div>
              {state.started && <Task />}
              <Score />
              <Rounds />
              <Button.Group vertical labeled icon>
                <Button
                  icon="play"
                  content="Play"
                  onClick={controls.startGame}
                />
                <Button
                  icon="close"
                  content="Clear"
                  onClick={controls.clearCanvas}
                />
                <Button
                  icon="stop"
                  content="Stop"
                  onClick={controls.stopGame}
                />
                <Button
                  icon="search"
                  content="Guess"
                  onClick={controls.guess}
                />
              </Button.Group>
            </div>
          </Card>

          <Card raised>
            <Canvas />
          </Card>
        </Card.Group>
      </Container>
    </GameStateContext.Provider>
  );
};
