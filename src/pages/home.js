import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Header, Card, Button } from "semantic-ui-react";

export const Home = () => {
  const { push } = useHistory();

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
          <Grid.Column>
            <Button onClick={() => push("/game")} size="massive" primary fluid>
              Play
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
