import React from "react";
import "semantic-ui-css/semantic.min.css";
import { HashRouter, Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "./pages/home";
import { Game } from "./pages/game";
import { GameOver } from "./pages/game-over";

export const App = () => {
  return (
    <Router>
      <HashRouter basename="/">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/game-over">
          <GameOver />
        </Route>
      </HashRouter>
    </Router>
  );
};
