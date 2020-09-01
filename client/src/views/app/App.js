import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

import "rsuite/dist/styles/rsuite-default.css";

import Champions from "../champions";
import Champion from "../champion";
import Home from "../home";
import Items from "../items";
import Leaderboard from "../leaderboard";
import Statistics from "../statistics";
import Summoner from "../summoner";
import Multi from "../multi";

function App() {
  const [region, setRegion] = useState(Cookies.get("Region"));
  const [language, setLanguage] = useState(Cookies.get("Language"));

  useEffect(() => {
    if (region === undefined) {
      Cookies.set("Region", "euw");
      setRegion("euw");
    }
    if (language === undefined) {
      Cookies.set("Language", "en");
      setLanguage("en");
    }
  }, [region, language]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/:lang/:region" component={Home} />
          <Route
            path="/:lang/:region/summoner/:username?"
            component={Summoner}
          />
          <Route path="/:lang/:region/multi/:query?" component={Multi} />
          <Route path="/:lang/:region/statistics" component={Statistics} />
          <Route path="/:lang/:region/leaderboard" component={Leaderboard} />
          <Route path="/:lang/:region/champions" component={Champions} />
          <Route
            path="/:lang/:region/champion/:champion?"
            component={Champion}
          />
          <Route path="/:lang/:region/items" component={Items} />
          <Route path="/:lang/:region/profile-icons" component={Home} />
          <Route path="/:lang/:region/runes" component={Home} />
          <Redirect to={`/${language}/${region}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
