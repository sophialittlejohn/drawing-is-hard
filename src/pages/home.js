import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Grid, Header, Card, Button, Icon } from "semantic-ui-react";

export const Home = () => {
  const { push } = useHistory();
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
                <p>
                  This game has been modeled off Google's{" "}
                  <a href="https://quickdraw.withgoogle.com/">Quick, Draw!</a>{" "}
                  game and uses a sampling from the Quick, Draw! dataset.
                </p>
                <p>
                  It was developed in the context of my capstone project at{" "}
                  <a href="https://www.extensionschool.ch/">
                    EPFL Extension School
                  </a>
                  .
                </p>
                <p>
                  Check out the source code in my{" "}
                  <a href="https://github.com/sophialittlejohn/drawing-is-hard">
                    GitHub repo
                  </a>
                  .
                </p>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="14">
            <Button
              onClick={() => push("/play", state)}
              size="massive"
              primary
              fluid
            >
              Play
            </Button>
          </Grid.Column>
          <Grid.Column width="2">
            <Button
              icon
              size="massive"
              fluid
              icon
              basic
              onClick={() => push("/settings")}
            >
              <Icon name="settings" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
