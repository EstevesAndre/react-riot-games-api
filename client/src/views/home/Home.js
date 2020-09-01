import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import cookiesApi from "../../api/cookies";
import api from "../../api";
// import Loader from "react-loader-spinner";
import "whatwg-fetch";

import BaseNavbar from "../../components/navbar";
import Footer from "../../components/footer";
import FreeChampRotation from "../../components/freeChampRotation";
import SearchSummonerForm from "../../components/searchSummonerForm";

import bannerBackground from "../../assets/home_bg.png";

import "./Home.css";

const bannerImg = {
  padding: "0",
  background: `url(${bannerBackground}) no-repeat center center `,
  backgroundSize: "cover",
};

const Home = (props) => {
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

    if (UID) {
      fetchData();
    } else {
      const responseUID = cookiesApi.createNewUser();
      setUID(responseUID);
    }

    testRequestToRiotAPI();
  }, [UID]);

  return (
    <div>
      <BaseNavbar {...props} noSearch />
      <div className="one-page-plus-minus-nav-minus-footer">
        <div className="half-page" style={bannerImg}>
          <div className="middle">
            <h2 className="pb-4">OP.GG</h2>
            <SearchSummonerForm {...props} />
          </div>
        </div>
        {/* <Loader
          className="my-5"
          type="ThreeDots"
          color="#00BFFF"
          height={200}
          width={200}
          timeout={3000} //3 secs
        /> */}
        <h1 className=""> HOME </h1>
        <div> {userInfo !== null && userInfo.favorites} </div>
        <div> {UID} </div>
        <div>{searchInfo !== null && searchInfo.summonerLevel}</div>
        <FreeChampRotation />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
