import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import cookiesApi from "../../api/cookies";
import api from "../../api";

import BaseNavbar from "../../components/navbar";
import "whatwg-fetch";

const Home = (props) => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [UID, setUID] = useState(Cookies.get("UID"));
  const [searchInfo, setSearchInfo] = useState(null);

  const testRequestToRiotAPI = () => {
    fetch(`/api/riot/summoner/${encodeURI("ßandlε Guηnεr")}`)
      .then((response) => response.json())
      .then((text) => {
        setSearchInfo(text);
        console.log(text);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.getUserById(UID);
      console.log(response.data.data);
      setUserInfo(response.data.data);
    }

    UID ? fetchData() : cookiesApi.createNewUser();

    testRequestToRiotAPI();
  }, []);

  return (
    <div>
      <BaseNavbar {...props} />
      <div className="one-page">
        <h1 className=""> HOME </h1>
        <div> {userInfo !== null && userInfo.favorites} </div>
        <div> {UID} </div>
        <div>{searchInfo !== null && searchInfo.summonerLevel}</div>
      </div>
    </div>
  );
};

export default Home;
