import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { Home } from "./pages/home";
import { Game } from "./pages/game";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
};
