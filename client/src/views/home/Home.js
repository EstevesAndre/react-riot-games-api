import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import api from "../../api";
import BaseNavbar from "../../components/navbar";
import "whatwg-fetch";

import logo from "./logo.svg";

const Home = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [UID, setUID] = useState(Cookies.get("UID"));
  const [searchInfo, setSearchInfo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then((response) => response.json())
      .then((state) => setGreeting(state.greeting));
  };

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
    async function createCookie() {
      const res = await api.insertUser();
      console.log(res.data);

      if (res.data.success) {
        console.log(res.data.message);
        Cookies.set("UID", res.data.id.toString());
        setUID(res.data.id.toString());
      }
    }

    async function fetchData() {
      const response = await api.getUserById(UID);
      console.log(response.data.data);
      setUserInfo(response.data.data);
    }

    UID ? fetchData() : createCookie();

    testRequestToRiotAPI();
  }, []);

  return (
    <div>
      <BaseNavbar />
      <div className="one-page">
        <h1 className=""> OLA </h1>
        <div> {userInfo !== null && userInfo.favorites} </div>
        <div> {UID} </div>
        <div>{searchInfo !== null && searchInfo.summonerLevel}</div>
      </div>
    </div>
  );
};

export default Home;
