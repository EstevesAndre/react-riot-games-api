import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api";
import cookiesApi from "../../api/cookies";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form,
  Input,
  Button,
} from "reactstrap";

import Logo from "../../assets/league_logo.svg";
import LogoB from "../../assets/league_logo_black.svg";
import Globe from "../../assets/earth.svg";

import "./Navbar.css";

const BaseNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const languages = [
    {
      id: 0,
      name: "English",
      paramCode: "en",
    },
    {
      id: 1,
      name: "French",
      paramCode: "fr",
    },
    {
      id: 2,
      name: "Spanish",
      paramCode: "es",
    },
    {
      id: 3,
      name: "Portuguese",
      paramCode: "pt",
    },
    {
      id: 4,
      name: "Korea",
      paramCode: "kr",
    },
  ];

  const summonerSearchSubmit = (e) => {
    e.preventDefault();

    const inputText = summonerInput;
    setSummonerInput("");

    console.log("Search for summoner: " + inputText);
    console.log("Region: " + region);

    // TODO ver  se o input é multiplo,  IF yes route  multi/query ->, ohterwise below route

    props.history.push(
      `/${language}/${region}/summoner/username=${encodeURI(inputText)}`
    );
  };

  const handleChange = (e) => {
    // TODO Remove multi summoner input, {name sd asd das asdsa, name asds ads  as,}
    // tirar tudo menos a primeira palavra e virgula
    setSummonerInput(e.target.value);
  };

  useEffect(() => {
    const response = cookiesApi.updateHeaderCookies(
      props.match.params.lang,
      props.match.params.region
    );

    if (!response.status) {
      props.history.push("/");
    }

    if (region !== props.match.params.region) {
      setRegion(props.match.params.region);
    }

    if (language !== props.match.params.lang) {
      setLanguage(props.match.params.lang);
    }
  }, []);

  useEffect(() => {
    console.log("LANG: " + language);
    Cookies.set("Language", language);
    props.page
      ? props.history.push(`/${language}/${region}/${props.page}`)
      : props.history.push(`/${language}/${region}`);
  }, [language]);

  useEffect(() => {
    console.log("REGION: " + region);
    Cookies.set("Region", region);
    props.page
      ? props.history.push(`/${language}/${region}/${props.page}`)
      : props.history.push(`/${language}/${region}`);
  }, [region]);

  return (
    <>
      <header>
        <Navbar dark color="dark" expand="lg">
          <Container>
            <NavbarBrand href="/">LOGO</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem className="header-item">
                <NavLink active>
                  <img className="header-icon" src={Logo} />
                  League of Legends
                </NavLink>
              </NavItem>
              <NavItem className="header-item">
                <NavLink>
                  <img className="header-icon" src={Logo} />
                  TFT
                </NavLink>
              </NavItem>
            </Nav>
            <div className="language-container">
              <UncontrolledDropdown inNavbar>
                <DropdownToggle caret>
                  <img src={Globe} alt="Logo" />
                  {language}
                </DropdownToggle>
                <DropdownMenu color="inherit" right className="menu-dropdown">
                  {languages.map((language) => (
                    <DropdownItem
                      key={language.id}
                      onClick={() => setLanguage(language.paramCode)}
                    >
                      <span>{language.name}</span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Container>
        </Navbar>
      </header>
      <Navbar dark color="info" expand="lg">
        <Container>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href={`/${language}/${region}/champions`}>
                  Champions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`/${language}/${region}/leaderboard`}>
                  Leaderboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`/${language}/${region}/items`}>Items</NavLink>
              </NavItem>
            </Nav>
            <div className="search-container">
              <UncontrolledDropdown inNavbar>
                <DropdownToggle caret>{region}</DropdownToggle>
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
                  placeholder="Name1, Name2, ..."
                  type="text"
                  value={summonerInput}
                  onChange={handleChange}
                />
                <Button>Goat</Button>
              </Form>
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BaseNavbar;
