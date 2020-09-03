import React, { useState, useEffect } from "react";

import cookiesApi from "../../api/cookies";

import BaseNavbar from "../../components/navbar";

const Summoner = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      console.log(props);
    } else {
      setFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    console.log(props);
    const username = props.match.params.username;
    if (username !== undefined) cookiesApi.addSummonerSearch(username);
  }, [props.match.params.username]);

  return (
    <div>
      <BaseNavbar {...props} page="summoner" />
      <div className="one-page">
        <h1 className=""> SUMMONER </h1>
      </div>
    </div>
  );
};

export default Summoner;
