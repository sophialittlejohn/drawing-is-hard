import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Header, Card, Button } from "semantic-ui-react";
import { useState } from "react";

export const Settings = () => {
  const { push } = useHistory();
  const [rounds, setRounds] = useState(10);
  const [seconds, setSeconds] = useState(20);

  return (
    <Container style={{ paddingTop: "10%" }} text>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card fluid color="orange">
              <Card.Content>
                <Header as="h1">Settings</Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card fluid raised>
              <Card.Content
                style={{
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <label htmlFor="rounds">Number of rounds</label>
                  <input
                    type="range"
                    id="rounds"
                    name="rounds"
                    min="1"
                    max="10"
                    step="1"
                    value={rounds}
                    onChange={(e) => setRounds(parseInt(e.target.value))}
                  />
                  {rounds}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label htmlFor="rounds">Seconds per round</label>
                  <input
                    type="range"
                    id="rounds"
                    name="rounds"
                    min="5"
                    max="30"
                    step="5"
                    value={seconds}
                    onChange={(e) => setSeconds(parseInt(e.target.value))}
                  />
                  {seconds}
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              onClick={() => push("/", { rounds, seconds })}
              size="massive"
              color="orange"
              fluid
            >
              Save and go back
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
