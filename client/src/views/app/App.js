import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Home from "../home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/summoner/:username?" component={Home} />
          <Route exact path="/" component={Home} />
          <Route path="/statistics" component={Home} />
          <Route path="/leaderboard" component={Home} />
          <Route path="/champions" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
