import React, { useState, useEffect } from 'react'

import ReactPlayer from 'react-player'
// import freljord from '../../assets/webm/freljord_animated_art.webm'
// import demacia from '../../assets/webm/demacia.webm'
// import arcade from '../../assets/webm/arcade.webm'
// import ionia from '../../assets/webm/ionia.webm'
// import har from '../../assets/webm/harrowing-2014-loop.webm'
// import piltover from '../../assets/webm/piltover.webm'
import bilgewater from '../../assets/bilgewater.webm'
// import Cookies from "js-cookie";
// import cookiesApi from "../../api/cookies";
// import api from "../../api";
// import Loader from "react-loader-spinner";
import 'whatwg-fetch'

import { Placeholder, Grid, Row, Col } from 'rsuite'

import BaseNavbar from '../../components/navbar'
import Footer from '../../components/footer'
import FreeChampRotation from '../../components/freeChampRotation'
import SearchSummonerForm from '../../components/searchSummonerForm'

import bannerBackground from '../../assets/home_bg.png'

import './Home.css'

const bannerImg = {
  padding: '0',
  background: `url(${bannerBackground}) no-repeat center center `,
  backgroundSize: 'cover',
}

const { Paragraph } = Placeholder

const Home = (props) => {
  const [cal, setCal] = useState(false)

  return (
    <div>
      <BaseNavbar {...props} noSearch page={'home'} />
      <div className="one-page-plus-minus-nav-minus-footer bg-1 pb-4">
        <div className="home-webm">
          <ReactPlayer
            url={bilgewater}
            playing={cal}
            loop={true}
            muted={true}
            onReady={() => setCal(true)}
          />
        </div>
        <div className="center-webm">
          <h3 className="pb-4">AppName</h3>
          <div className="desktop-view">
            <SearchSummonerForm {...props} />
          </div>
        </div>
        <div className="mobile-view pt-4 px-3">
          <SearchSummonerForm {...props} />
        </div>
        <Grid fluid className="py-4">
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
              {/* <Paragraph
                style={{ marginTop: 30 }}
                rows={9}
                className="placeholder-container"
                graph="image"
                active
              /> */}
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
  )
}

export default Home
