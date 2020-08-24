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
} from "reactstrap";

import Logo from "../../assets/league_logo.svg";

const BaseNavbar = () => {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 399 || document.scrollTop > 399)
        setNavbarColor("");
      else if (
        document.documentElement.scrollTop < 400 ||
        document.scrollTop < 400
      )
        setNavbarColor("navbar-transparent");
    };

    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <>
      <Navbar dark color="dark" expand="md">
        <Container>
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
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
            <UncontrolledDropdown inNavbar>
              <DropdownToggle  caret>
                Options
              </DropdownToggle>
              <DropdownMenu color="inherit" right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BaseNavbar;
