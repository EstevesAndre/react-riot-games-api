import React, { useState } from "react";
import Switch from "react-switch";
import Cookies from "js-cookie";

// reactstrap components
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Modal, Grid, Row, Col, Button, ButtonToolbar } from "rsuite";

import Logo from "../../assets/league_logo.svg";
import Globe from "../../assets/earth.svg";

import "./Footer.css";

const Footer = (props) => {
  const [darkModeSwitchChecked, setDarkModeSwitchChecked] = useState(
    Cookies.get("dark") === "true" ? true : false
  );
  const [languageModal, setLanguageModal] = useState(false);
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
    <footer>
      <Grid fluid className="footer-grid">
        <Row className="py-4">
          <Col xs={20} xsOffset={2} sm={20} smOffset={2} md={18} mdOffset={2}>
            <div className="col-inner">
              <div className="logo">LOGO</div>
              <ul className="list-unstyled list--inline useful-links-list">
                <li>
                  <a href="/">Multi-Search</a>
                </li>
                <li>
                  <a href="/">Terms of Service</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
                <li>
                  <a href="/">Privacy</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={20} xsOffset={2} sm={20} smOffset={2} md={2} mdOffset={0}>
            <span>External Links</span>
          </Col>
        </Row>
        <Row>
          <Col xs={22} xsOffset={1} md={20} mdOffset={2} className="separator">
            {" "}
          </Col>
        </Row>
        <Row>
          <Col
            xs={20}
            xsOffset={1}
            mdOffset={2}
            className="mt-2 mb-3 text-left language-container"
          >
            <img src={Globe} alt="Logo" />
            <div onClick={() => setLanguageModal(true)}>English +</div>
          </Col>
        </Row>
      </Grid>
      {/* <Switch
        onChange={() => switchDarkMode()}
        checked={darkModeSwitchChecked}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#898"
        offColor="#898"
        onHandleColor="#fff"
        offHandleColor="#000"
        activeBoxShadow="0 0 2px 3px #565"
      /> */}
      {/* <div className="language-container ml-3">
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
      <ButtonToolbar>
        <Button onClick={() => setLanguageModal(true)}>Open</Button>
      </ButtonToolbar> */}
      <Modal
        size="xs"
        overflow={true}
        show={languageModal}
        className="show"
        onHide={() => setLanguageModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Language Selector</Modal.Title>
          <div className="subtitle">Select your language</div>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled list--inline useful-links-list">
            <li>
              <a href="/">Multi-Search</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Privacy</a>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </footer>
  );
};

export default Footer;
