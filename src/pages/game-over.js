import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Header, Grid, Card, Button, Icon } from "semantic-ui-react";

const gameOverCopy = {
  low: "Hmmm, you can probably do better than that!",
  mid: "Not so shabby. Bet you can beat that in the next round!",
  high: "Wow, impressive! You deserve a margarita at the beach 🍸🌴",
};

export const GameOver = () => {
  const { replace } = useHistory();
  const { state } = useLocation();

  const score = state ? state.score : 0;

  const copy =
    score >= 9
      ? gameOverCopy.high
      : score >= 5
      ? gameOverCopy.mid
      : gameOverCopy.low;

  return (
    <Container style={{ paddingTop: "10%" }} text>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card fluid color="blue">
              <Card.Content>
                <Header as="h1">Drawing is hard - Final score {score}</Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card fluid raised>
              <Card.Content style={{ fontSize: "20px" }}>
                <p>GAME OVER!</p>
                <p>
                  You scored <strong>{score}</strong> points.
                </p>
                <p>{copy}</p>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="14">
            <Button
              onClick={() => replace("/game")}
              size="massive"
              color="blue"
              fluid
            >
              Play again
            </Button>
          </Grid.Column>
          <Grid.Column width="two">
            <Button
              onClick={() => replace("/")}
              size="massive"
              fluid
              icon
              basic
              color="blue"
              aria-label="home"
            >
              <Icon name="home" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
