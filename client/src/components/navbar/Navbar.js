import React, { useState } from "react";
import Switch from "react-switch";
import Cookies from "js-cookie";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Logo from "../../assets/league_logo.svg";
// import LogoB from "../../assets/league_logo_black.svg";
import Globe from "../../assets/earth.svg";

import SearchSummonerForm from "../searchSummonerForm";

import "./Navbar.css";

const BaseNavbar = (props) => {
  const [darkModeSwitchChecked, setDarkModeSwitchChecked] = useState(
    Cookies.get("dark") === "true" ? true : false
  );
  const [isOpen, setIsOpen] = useState(false);
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

  const switchDarkMode = () => {
    Cookies.set("dark", darkModeSwitchChecked ? false : true);
    setDarkModeSwitchChecked(!darkModeSwitchChecked);
  };

  return (
    <>
      <header>
        <Navbar dark className="app-navbar navbar-1-color" expand="lg">
          <div className="nav-container">
            <NavbarBrand href="/">LOGO</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem className="header-item">
                <NavLink active href="/">
                  <img className="header-icon" src={Logo} alt="logo" />
                  League of Legends
                </NavLink>
              </NavItem>
              <NavItem className="header-item">
                <NavLink>
                  <img className="header-icon" src={Logo} alt="logo" />
                  Teamfight Tactics
                </NavLink>
              </NavItem>
            </Nav>
            <Switch
              onChange={() => switchDarkMode()}
              checked={darkModeSwitchChecked}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#898"
              offColor="#898"
              onHandleColor="#fff"
              offHandleColor="#000"
              activeBoxShadow="0 0 2px 3px #565"
            />
            <div className="language-container ml-3">
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
          </div>
        </Navbar>
      </header>
      <Navbar dark className="navbar-2-color" expand="lg">
        <div className="navbar-with-search">
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto nav-links" navbar>
              <NavItem>
                <NavLink
                  href={`/${language}/${props.match.params.region}/champions`}
                >
                  Champions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={`/${language}/${props.match.params.region}/leaderboard`}
                >
                  Leaderboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={`/${language}/${props.match.params.region}/items`}
                >
                  Items
                </NavLink>
              </NavItem>
            </Nav>
            {!props.noSearch && <SearchSummonerForm {...props} />}
          </Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default BaseNavbar;
