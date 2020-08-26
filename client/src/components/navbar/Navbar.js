import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import './Navbar.css';

const BaseNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState("EUW");
  const regions = [{
    img: LogoB,
    id: "EUW",
    name: "Europe West"
  }, {
    img: LogoB,
    id: "KR",
    name: "Korea"
  }, {
    img: LogoB,
    id: "JP",
    name: "Japan"
  }, {
    img: LogoB,
    id: "NA",
    name: "North America"
  }, {
    img: LogoB,
    id: "EUNE",
    name: "Europe Nordic & East"
  }, {
    img: LogoB,
    id: "OCE",
    name: "Oceania"
  }, {
    img: LogoB,
    id: "BR",
    name: "Brazil"
  }, {
    img: LogoB,
    id: "LAS",
    name: "LAS"
  }, {
    img: LogoB,
    id: "LAN",
    name: "LAN"
  }, {
    img: LogoB,
    id: "RU",
    name: "Russia"
  }, {
    img: LogoB,
    id: "TR",
    name: "Turkey"
  }];

  return (
    <>
      <Navbar dark color="dark" expand="lg">
        <Container>
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="mx-3">
                <NavLink active>
                  <img src={Logo} />
                  League of Legends
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contacts">Contact Us</NavLink>
              </NavItem>
            </Nav>
            <div className="search-container">
              <UncontrolledDropdown inNavbar>
                <DropdownToggle caret>
                  {region}
                </DropdownToggle>
                <DropdownMenu color="inherit" right className="menu-dropdown">
                  {regions.map(region => <DropdownItem key={region.id} onClick={() => setRegion(region.id)}>
                    <img src={region.img} alt="Logo" />
                    <span>{region.name}</span>
                  </DropdownItem>)}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Form>
                <Input placeholder="Name1, Name2, ..." />
                <Button>
                  Goat
              </Button>
              </Form>
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BaseNavbar;
