import React from "react";

import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export const GameOver = () => {
  return (
    <Container style={{ paddingTop: "10%" }}>
      <Link to="/">Play again</Link>
    </Container>
  );
};
