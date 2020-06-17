import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "./pages/home";
import { Play } from "./pages/play";
import { GameOver } from "./pages/game-over";

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/game-over">
          <GameOver />
        </Route>
      </Switch>
    </Router>
  );
};
