import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Header, Grid, Card, Button, Icon } from "semantic-ui-react";

export const GameOver = () => {
  const { replace } = useHistory();
  const { state } = useLocation();

  return (
    <Container style={{ paddingTop: "10%" }} text>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card fluid color="blue">
              <Card.Content>
                <Header as="h1">Drawing Is Hard</Header>
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
                  You scored <strong>{state ? state.score : 0}</strong> points.
                </p>
                <p>Try harder next time!</p>
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
            >
              <Icon name="home" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
