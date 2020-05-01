import React from "react";

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to="/game">Play game</Link>
    </div>
  );
};
