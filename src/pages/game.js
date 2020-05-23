import React, { useContext, useEffect } from "react";
import { Container, Header, Card, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { useControls } from "../hooks/useControls";
import { Score } from "../components/Score";
import { Rounds } from "../components/Rounds";
import { Task } from "../components/Task";
import { Canvas } from "../components/Canvas";
import { useMemo } from "react";

export const TOTAL_ROUNDS = 2;

const GameStateContext = React.createContext();

export const useGameContext = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("This component must be used within a <Game /> component.");
  }
  return context;
};

export const Game = () => {
  const { replace } = useHistory();
  const { state, controls } = useControls();

  // useEffect(() => {
  //   if (state.inProgress === false) {
  //     replace("game-over", { score: state.score });
  //   }
  // });

  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <GameStateContext.Provider value={{ ...memoizedStateValue }}>
      <Container
        style={{
          paddingTop: "10%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            display: "flex",
            justifyContent: "space-bewteen",
            flexDirection: "column",
          }}
        >
          <Header as="p">
            <div>
              <Task startCounter={controls.startCounter} />
            </div>
            <Score />
            <Rounds />
            <Button.Group vertical labeled icon>
              <Button
                icon="close"
                content="Clear"
                onClick={controls.clearCanvas}
              />
              <Button icon="stop" content="Stop" onClick={controls.stopGame} />
            </Button.Group>
          </Header>
        </div>

        <Card raised>
          <Canvas />
        </Card>
      </Container>
    </GameStateContext.Provider>
  );
};
