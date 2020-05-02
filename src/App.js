import React from "react";
import { ThemeProvider } from "emotion-theming";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Global } from "@emotion/core";

import { Home } from "./pages/home";
import { Game } from "./pages/game";
import { theme, globalStyles } from "./theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
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
    </ThemeProvider>
  );
};
