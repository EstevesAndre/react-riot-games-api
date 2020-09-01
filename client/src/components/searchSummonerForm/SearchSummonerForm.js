import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

// reactstrap components
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Button,
} from "reactstrap";

import cookiesApi from "../../api/cookies";

import Logo from "../../assets/league_logo.svg";
// import LogoB from "../../assets/league_logo_black.svg";

import "./SearchSummonerForm.css";

const SearchSummonerForm = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [summonerInput, setSummonerInput] = useState("ßandlε Guηnεr");
  const [region, setRegion] = useState(props.match.params.region || "EUW");
  const regions = [
    {
      img: Logo,
      id: "euw",
      name: "Europe West",
    },
    {
      img: Logo,
      id: "kr",
      name: "Korea",
    },
    {
      img: Logo,
      id: "jp",
      name: "Japan",
    },
    {
      img: Logo,
      id: "na",
      name: "North America",
    },
    {
      img: Logo,
      id: "eune",
      name: "Europe Nordic & East",
    },
    {
      img: Logo,
      id: "oce",
      name: "Oceania",
    },
    {
      img: Logo,
      id: "br",
      name: "Brazil",
    },
    {
      img: Logo,
      id: "las",
      name: "LAS",
    },
    {
      img: Logo,
      id: "lan",
      name: "LAN",
    },
    {
      img: Logo,
      id: "ru",
      name: "Russia",
    },
    {
      img: Logo,
      id: "tr",
      name: "Turkey",
    },
  ];
  const [language, setLanguage] = useState(props.match.params.lang || "en");

  const summonerSearchSubmit = (e) => {
    e.preventDefault();

    var requestText = summonerInput;
    setSummonerInput("");

    requestText = requestText.replace(/joined the room,/gi, ",");
    requestText = requestText.replace(/joined the room./gi, ",");
    requestText = requestText.replace(/\s,/g, ",");
    requestText = requestText.replace(/,\s/g, ",");

    if (requestText.endsWith(","))
      requestText = requestText.substring(0, requestText.length - 2);

    if (requestText.includes(",")) {
      requestText = requestText.replace(/,/g, "%2C");

      console.log("Search for list of summoners: " + requestText);
      console.log("Region: " + region);

      props.history.push(
        `/${language}/${region}/multi/query=${encodeURI(requestText)}`
      );
    } else {
      console.log("Search for summoner: " + requestText);
      console.log("Region: " + region);

      props.history.push(
        `/${language}/${region}/summoner/username=${encodeURI(requestText)}`
      );
    }
  };

  const handleChange = (e) => {
    setSummonerInput(e.target.value);
  };

  useEffect(() => {
    const response = cookiesApi.updateHeaderCookies(
      props.match.params.lang,
      props.match.params.region
    );

    if (!response.status) {
      setRegion(response.region);
      setLanguage(response.lang);
      props.page
        ? props.history.push(
            `/${response.lang}/${response.region}/${props.page}`
          )
        : props.history.push(`/${response.lang}/${response.region}`);
    }

    if (region !== props.match.params.region) {
      setRegion(props.match.params.region);
    }

    if (language !== props.match.params.lang) {
      setLanguage(props.match.params.lang);
    }
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      console.log("LANG: " + language);
      console.log("REGION: " + region);
      Cookies.set("Language", language);
      Cookies.set("Region", region);
      props.page
        ? props.history.push(`/${language}/${region}/${props.page}`)
        : props.history.push(`/${language}/${region}`);
    } else {
      setFirstLoad(false);
    }
  }, [language, region]);

  return (
    <div className="search-container">
      <UncontrolledDropdown inNavbar>
        <DropdownToggle caret>{region}</DropdownToggle>
        <DropdownMenu color="inherit" right className="menu-dropdown">
          {regions.map((region) => (
            <DropdownItem key={region.id} onClick={() => setRegion(region.id)}>
              <img src={region.img} alt="Logo" />
              <span>{region.name}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
      <Form onSubmit={summonerSearchSubmit}>
        <Input
          required
          placeholder="Name1, Name2, ..."
          type="text"
          value={summonerInput}
          onChange={handleChange}
        />
        <Button>Goat</Button>
      </Form>
    </div>
  );
};

export default SearchSummonerForm;
