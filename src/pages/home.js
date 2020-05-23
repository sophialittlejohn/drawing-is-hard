import React from "react";

import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export const Home = () => {
  return (
    <Container style={{ paddingTop: "10%" }}>
      <Link to="/game">Play game</Link>
    </Container>
  );
};
