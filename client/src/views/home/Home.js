import React from "react";
// import Cookies from "js-cookie";
// import cookiesApi from "../../api/cookies";
// import api from "../../api";
// import Loader from "react-loader-spinner";
import "whatwg-fetch";

import { Placeholder, Grid, Row, Col } from "rsuite";

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

const { Paragraph } = Placeholder;

const Home = (props) => {
  return (
    <div>
      <BaseNavbar {...props} noSearch />
      <div className="one-page-plus-minus-nav-minus-footer bg-1 pb-4">
        <div className="home-page-banner" style={bannerImg}>
          <div className="middle">
            <h2 className="pb-4">AppName</h2>
            <SearchSummonerForm {...props} />
          </div>
        </div>
        <Grid fluid>
          <Row>
            <Col
              xs={20}
              xsOffset={2}
              sm={10}
              smOffset={2}
              md={12}
              lg={8}
              lgOffset={4}
            >
              <Paragraph
                style={{ marginTop: 30 }}
                rows={9}
                className="placeholder-container"
                graph="image"
                active
              />
            </Col>
            <Col
              xs={20}
              xsOffset={2}
              sm={11}
              smOffset={0}
              md={8}
              mdOffset={1}
              lg={7}
              lgOffset={4}
            >
              <FreeChampRotation {...props} isHomePage={true} />
            </Col>
          </Row>
        </Grid>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Home;
