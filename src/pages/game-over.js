import React from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

export const GameOver = () => {
  const { state } = useLocation();

  return (
    <Container style={{ paddingTop: "10%" }}>
      <Header>You only scored {state.score} point</Header>
      <Link to="/">Play again</Link>
    </Container>
  );
};
