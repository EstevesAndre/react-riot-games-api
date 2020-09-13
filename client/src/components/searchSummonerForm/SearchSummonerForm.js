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
  TabContent,
  TabPane,
} from "reactstrap";

import { Button as Button2, ButtonGroup, Icon } from "rsuite";

import cookiesApi from "../../api/cookies";

import Logo from "../../assets/league_logo.svg";
// import LogoB from "../../assets/league_logo_black.svg";

import "./SearchSummonerForm.css";

const SearchSummonerForm = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [summonerInput, setSummonerInput] = useState("");
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
  const [summonnerSerachActive, setSummonnerSerachActive] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [summonerSearches, setSummonerSearches] = useState({
    searches: [],
    favorites: [],
  });

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
        `/${language}/${region}/multi/${encodeURI(requestText)}`
      );
    } else {
      console.log("Search for summoner: " + requestText);
      console.log("Region: " + region);

      props.history.push(
        `/${language}/${region}/summoner/${encodeURI(requestText)}`
      );
    }
  };

  const handleChange = (e) => {
    var requestText = e.target.value;

    if (requestText.includes("joined the room")) {
      requestText = requestText.replace(/joined the room,/gi, ",");
      requestText = requestText.replace(/joined the room./gi, ",");
      requestText = requestText.replace(/joined the room/gi, ",");
      requestText = requestText.replace(/\s,/g, ",");
      requestText = requestText.replace(/,\s/g, ",");

      setSummonerInput(requestText);
    } else setSummonerInput(e.target.value);
  };

  const getSearchCookies = () => {
    const response = cookiesApi.getSummonerSearches();
    console.log(response);

    setSummonerSearches(response);
  };

  const removeSearch = (isFavorite, summonerName) => {
    const response = cookiesApi.removeSummonerSearch(isFavorite, summonerName);
    console.log(response);

    setSummonerSearches(response);
  };

  const toggleFavorite = (summonerName, isFavorite) => {
    const response = cookiesApi.toggleFavorite(summonerName, isFavorite);
    console.log(response);
    setSummonerSearches(response);
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

    getSearchCookies();
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
    <div
      className="search-recents-parent"
      // onBlur={() => setSummonnerSerachActive(false)}
    >
      <div className="search-container">
        <UncontrolledDropdown inNavbar>
          <DropdownToggle className="custom-button" caret>{region}</DropdownToggle>
          <DropdownMenu color="inherit" right className="menu-dropdown">
            {regions.map((region) => (
              <DropdownItem
                key={region.id}
                onClick={() => setRegion(region.id)}
              >
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
            onFocus={() => setSummonnerSerachActive(true)}
          />
          <Button className="custom-button">Goat</Button>
        </Form>
      </div>
      <div
        className={
          "recents-container " + (summonnerSerachActive ? "active" : "disabled")
        }
      >
        <ButtonGroup size="md" justified>
          <Button2
            className="btn-radius"
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Recent
          </Button2>
          <Button2
            className="btn-radius"
            active={activeTab === 2}
            onClick={() => setActiveTab(2)}
          >
            Favorites
          </Button2>
        </ButtonGroup>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1} className="tab-content">
            <ul className="list-container">
              {summonerSearches.searches.map((search, index) => (
                <li className="search-item" key={index}>
                  <div>
                    <a
                      href={`/${language}/${region}/summoner/${encodeURI(
                        search.summoner
                      )}`}
                    >
                      {search.summoner}
                    </a>
                  </div>
                  <div
                    className={
                      "icon favorite-container " +
                      (search.isFavorite ? "active" : "")
                    }
                    onClick={() =>
                      toggleFavorite(search.summoner, search.isFavorite)
                    }
                  >
                    <Icon icon="star" />
                  </div>
                  <div
                    className="icon close-container"
                    onClick={() => removeSearch(false, search.summoner)}
                  >
                    <Icon icon="close" />
                  </div>
                </li>
              ))}
            </ul>
          </TabPane>
          <TabPane tabId={2} className="tab-content">
            <ul className="list-container">
              {summonerSearches.favorites.map((search, index) => (
                <li className="search-item" key={index}>
                  <div>
                    <a
                      href={`/${language}/${region}/summoner/${encodeURI(
                        search.summoner
                      )}`}
                    >
                      {search.summoner}
                    </a>
                  </div>
                  <div
                    className="icon close-container"
                    onClick={() => removeSearch(true, search.summoner)}
                  >
                    <Icon icon="close" />
                  </div>
                </li>
              ))}
            </ul>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default SearchSummonerForm;
