import React, { useEffect, useMemo } from "react";
import { Container, Header, Card, Button, Grid, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { useControls } from "../hooks/useControls";
import { Rounds } from "../components/Rounds";
import { Task } from "../components/Task";
import { Canvas } from "../components/Canvas";
import { GameStateContext } from "../hooks/useGameContext";

export const TOTAL_ROUNDS = 10;
export const TIME_PER_ROUND = 20;

export const Game = () => {
  const { replace } = useHistory();
  const { state, controls } = useControls();

  useEffect(() => {
    if (state.inProgress === false) {
      replace("game-over", { score: state.score });
    }
  });

  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <GameStateContext.Provider value={{ ...memoizedStateValue }}>
      <Container style={{ paddingTop: "10%" }} text>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Card fluid color="olive">
                <Card.Content>
                  <Header as="h2">
                    {" "}
                    <Rounds />
                  </Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Card fluid raised>
                <Card.Content style={{ fontSize: "20px" }}>
                  <Grid columns="equal">
                    <Grid.Row>
                      <Grid.Column>
                        <Canvas />
                      </Grid.Column>
                      <Grid.Column>
                        <Task startCounter={controls.startCounter} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="14">
              <Button
                onClick={controls.clearCanvas}
                size="massive"
                color="olive"
                fluid
              >
                Clear Canvas
              </Button>
            </Grid.Column>
            <Grid.Column width="two">
              <Button
                onClick={() => replace("/")}
                size="massive"
                fluid
                icon
                basic
                color="olive"
              >
                <Icon name="home" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </GameStateContext.Provider>
  );
};
