import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Cookies from "js-cookie";
import axios from "axios";
import { Row, Col, Badge } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BaseNavbar from "../../components/navbar";
import { ImageGroup, Image } from "react-fullscreen-image";

import "react-tabs/style/react-tabs.css";
import "./Champion.css";

const Champion = (props) => {
  const [loading, setLoading] = useState(true);
  const [invalidChampion, setInvalidChampion] = useState(false);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    const champ = props.match.params.champion || "";
    if (champ == "") {
      setInvalidChampion(true);
      return;
    }
    const champCapitalized = champ.charAt(0).toUpperCase() + champ.slice(1);

    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champCapitalized}.json`
      )
      .then((res) => {
        setChampion(res.data.data[champCapitalized]);
        setLoading(false);
      })
      .catch((err) => {
        setInvalidChampion(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(invalidChampion);
    console.log(champion);
  }, [invalidChampion, champion]);

  return (
    <div>
      <BaseNavbar {...props} page={`champion/`} />
      {!loading && (
        <div className="one-page-plus">
          {invalidChampion ? (
            <InvalidChampion />
          ) : (
            <ChampionInformation {...props} champion={champion} />
          )}
        </div>
      )}
    </div>
  );
};

const InvalidChampion = (props) => {
  // const { name, flag } = props;

  return (
    <>
      <p>Invalid</p>
      <p>Zed, viktor, pyke</p>
    </>
  );
};

const ChampionInformation = (props) => {
  const champion = props.champion;
  return (
    <div className="champion-page">
      <div
        className="header"
        style={{
          padding: "0",
          background: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
            champion.id
          }_${
            champion.skins[champion.skins.length - 1].num
          }.jpg) no-repeat top center `,
          backgroundSize: "cover",
        }}
      />
      <div className="mt-4">
        <Row className="w-100">
          <Col className="col-12 col-sm-3 offset-sm-1 col-lg-2 img-container">
            <img
              className="mx-2"
              src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion["image"].full}`}
            />
          </Col>
          <Col className="col-12 col-sm-6 text-left main-stats">
            <h3>{champion.name}</h3>
            <p>{champion.title}</p>
            <div>
              {champion.tags.map((tag, index) => (
                <Badge key={index} className="mr-2" color="primary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="info-stats mt-3">
              <InfoBadge
                id="AD"
                name="Attack"
                value={champion["info"].attack}
                color="c-ad"
              />
              <InfoBadge
                id="AP"
                name="Magic"
                value={champion["info"].magic}
                color="c-ap"
              />
              <InfoBadge
                id="DEF"
                name="Defense"
                value={champion["info"].defense}
                color="c-def"
              />
              <InfoBadge
                id="DIF"
                name="Difficulty"
                value={champion["info"].difficulty}
                color="c-dif"
              />
            </div>
          </Col>
        </Row>
      </div>
      <Tabs>
        <TabList>
          <Tab>Habilites &amp; Stats</Tab>
          <Tab>Spells</Tab>
          <Tab>Runes</Tab>
          <Tab>Skins</Tab>
        </TabList>

        <TabPanel>
          <div className="panel-def-size">
            <p>
              <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>)
              (<i>English: /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional
              character in the Mario video game franchise, owned by Nintendo and
              created by Japanese video game designer Shigeru Miyamoto. Serving
              as the company's mascot and the eponymous protagonist of the
              series, Mario has appeared in over 200 video games since his
              creation. Depicted as a short, pudgy, Italian plumber who resides
              in the Mushroom Kingdom, his adventures generally center upon
              rescuing Princess Peach from the Koopa villain Bowser. His younger
              brother and sidekick is Luigi.
            </p>
            <p>
              Source:{" "}
              <a href="https://en.wikipedia.org/wiki/Mario" target="_blank">
                Wikipedia
              </a>
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-def-size">
            <p>
              <b>Luigi</b> (
              <i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (
              <i>English: /luˈiːdʒi/; Italian: [luˈiːdʒi]</i>) is a fictional
              character featured in video games and related media released by
              Nintendo. Created by prominent game designer Shigeru Miyamoto,
              Luigi is portrayed as the slightly younger but taller fraternal
              twin brother of Nintendo's mascot Mario, and appears in many games
              throughout the Mario franchise, often as a sidekick to his
              brother.
            </p>
            <p>
              Source:{" "}
              <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
                Wikipedia
              </a>
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-def-size">
            <p>
              <b>Princess Peach</b> (
              <i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>) is
              a character in Nintendo's Mario franchise. Originally created by
              Shigeru Miyamoto, Peach is the princess of the fictional Mushroom
              Kingdom, which is constantly under attack by Bowser. She often
              plays the damsel in distress role within the series and is the
              lead female. She is often portrayed as Mario's love interest and
              has appeared in Super Princess Peach, where she is the main
              playable character.
            </p>
            <p>
              Source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Princess_Peach"
                target="_blank"
              >
                Wikipedia
              </a>
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="images-container">
            <ImageGroup transitionMs="750">
              <ul className="images">
                {champion.skins.map((skin, index) => (
                  <li key={index}>
                    <Image
                      src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                      alt={skin.name}
                    />
                    <br />
                    <div className="overlay-container">
                      <div>{skin.name}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </ImageGroup>
          </div>
        </TabPanel>
      </Tabs>
      {/* <div className="champion-img-container">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion["image"].full}`}
        />
        <br />
        {champion.id}
        <br />
        {champion.title}
        <br />
        {champion.lore}
        <br />
      </div> */}
    </div>
  );
};

const InfoBadge = (props) => {
  const { id, name, value, color } = props;

  return (
    <div className="info-badge">
      <div className={color}>{id}</div>
      <div>{value}</div>
    </div>
  );
};

export default Champion;
