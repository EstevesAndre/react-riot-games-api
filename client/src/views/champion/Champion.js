import React, { useState, useEffect } from "react";
// import ReactTooltip from "react-tooltip";
import axios from "axios";
import {
  Row,
  Col,
  Badge,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Slider } from "rsuite";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BaseNavbar from "../../components/navbar";
// import { ImageGroup, Image } from "react-fullscreen-image";

import "react-tabs/style/react-tabs.css";
import "./Champion.css";

const Champion = (props) => {
  const [loading, setLoading] = useState(true);
  const [invalidChampion, setInvalidChampion] = useState(false);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    const champ = props.match.params.champion || "";
    if (champ === "") {
      setInvalidChampion(true);
      return;
    }
    const champCapitalized = champ.charAt(0).toUpperCase() + champ.slice(1);

    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${champCapitalized}.json`
      )
      .then((res) => {
        setChampion(res.data.data[champCapitalized]);
        setLoading(false);
      })
      .catch((err) => {
        setInvalidChampion(true);
        console.log(err);
      });
  }, [props.match.params.champion]);

  // useEffect(() => {
  //   console.log(invalidChampion);
  //   console.log(champion);
  // }, [invalidChampion, champion]);

  return (
    <div>
      <BaseNavbar {...props} page={`champion/`} />
      {!loading && (
        <div className="one-page-plus bg-1">
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
        className="header mask-image-bg"
        style={{
          background: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
            champion.id
          }_${champion.skins[champion.skins.length - 1].num}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mt-4">
        <Row className="w-100">
          <Col className="col-12 col-sm-3 offset-sm-1 col-lg-2 img-container">
            <img
              className="mx-2 champ-img"
              src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion["image"].full}`}
              alt="champion"
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
          <Tab>Overview</Tab>
          <Tab>Habilites & Stats</Tab>
          <Tab>Spells</Tab>
          <Tab>Runes</Tab>
          <Tab>Skins</Tab>
        </TabList>

        <TabPanel>
          <OverviewTab {...props} champion={champion} />
        </TabPanel>
        <TabPanel>
          <HabilitiesStatsTab {...props} champion={champion} />
        </TabPanel>
        <TabPanel>
          <SpellsTab {...props} champion={champion} />
        </TabPanel>
        <TabPanel>
          <RunesTab {...props} champion={champion} />
        </TabPanel>
        <TabPanel>
          <SkinsTab {...props} champion={champion} />
        </TabPanel>
      </Tabs>
      {/* <div className="champion-img-container">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion["image"].full}`}
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
  // todo name to add  tooltip
  // const { id, name, value, color } = props;
  const { id, value, color } = props;

  return (
    <div className="info-badge">
      <div className={color}>{id}</div>
      <div>{value}</div>
    </div>
  );
};

const StatComponent = (props) => {
  const { isHeader, name, baseValue, perLevelValue, lvl } = props;
  const result =
    Math.round((baseValue + perLevelValue * lvl + Number.EPSILON) * 1000) /
    1000;

  return (
    <div className="stat-container">
      <Row>
        <Col className="col-4 col-md-3 offset-1 offset-md-3 text-left">
          {name}
        </Col>
        <Col className={"col-2 col-md-1 " + (isHeader ? "text-bold" : "")}>
          {baseValue}
        </Col>
        <Col className={"col-2 col-md-1 " + (isHeader ? "text-bold" : "")}>
          {perLevelValue}
        </Col>
        <Col className={"col-2 col-md-1 " + (isHeader ? "text-bold" : "")}>
          {isHeader ? "Calculation" : result}
        </Col>
      </Row>
    </div>
  );
};

const OverviewTab = (props) => {
  const { champion } = props;

  return (
    <div className="panel-def-size">
      <Row className="text-left pt-5">
        <Col className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <h4>Lore</h4>
          <p>{champion.lore}</p>
        </Col>
        {champion.allytips.length !== 0 && (
          <Col className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
            <h4>Ally tips</h4>
            <p>{champion.allytips}</p>
          </Col>
        )}
        {champion.enemytips.length !== 0 && (
          <Col className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
            <h4>Enemy tips</h4>
            <p>{champion.enemytips}</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

const HabilitiesStatsTab = (props) => {
  const { champion } = props;
  const [lvl, setLvl] = useState(1);

  const SpellFilter = (spell, msg) => {
    const x = msg.match(/{{\se.\s}}/gm);
    if (x === null) return msg.replace(/{{.*?}}/gm, "?");

    for (var i = 0; i < x.length; i++) {
      const matchI = msg.match(/{{\se.\s}}/m);
      const effectIndex = matchI[0].replace("{{ e", "").replace(" }}", "");

      // console.log(effectIndex);
      // console.log(spell["effectBurn"][effectIndex]);
      // console.log(matchI);

      msg = msg.replace(matchI[0], spell["effectBurn"][effectIndex]);
    }

    return msg.replace(/{{.*?}}/gm, "?");
  };

  return (
    <div className="panel-def-size habilities-pannel">
      <div className="stats-container">
        <Row>
          <Col className="col-12">
            <h2>Statistics</h2>
          </Col>
          <Col className="col-10 offset-1 col-md-6 offset-md-3 mt-2 mb-4 pb-2">
            <Slider
              defaultValue={1}
              step={1}
              progress
              graduated
              min={1}
              max={18}
              renderMark={(mark) => {
                if ([1, 6, 11, 16, 18].includes(mark)) {
                  return (
                    <span>
                      {mark === 1 ? "Level " : ""}
                      {mark}
                    </span>
                  );
                }
                return null;
              }}
              onChange={(value) => {
                setLvl(value);
              }}
            />
          </Col>
        </Row>
        <StatComponent
          {...props}
          isHeader={true}
          name="Stat Name"
          baseValue="Base"
          perLevelValue="Per Level"
          lvl=""
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Health Points"
          baseValue={champion["stats"]["hp"]}
          perLevelValue={champion["stats"]["hpperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Mana Points"
          baseValue={champion["stats"]["mp"]}
          perLevelValue={champion["stats"]["mpperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Armor"
          baseValue={champion["stats"]["armor"]}
          perLevelValue={champion["stats"]["armorperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Spellblock"
          baseValue={champion["stats"]["spellblock"]}
          perLevelValue={champion["stats"]["spellblockperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Health Points Regen"
          baseValue={champion["stats"]["hpregen"]}
          perLevelValue={champion["stats"]["hpregenperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Mana Points Regen"
          baseValue={champion["stats"]["mpregen"]}
          perLevelValue={champion["stats"]["mpregenperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Crit"
          baseValue={champion["stats"]["crit"]}
          perLevelValue={champion["stats"]["critperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Attack Damage"
          baseValue={champion["stats"]["attackdamage"]}
          perLevelValue={champion["stats"]["attackdamageperlevel"]}
          lvl={lvl}
        />
        <StatComponent
          {...props}
          isHeader={false}
          name="Attack Speed"
          baseValue={champion["stats"]["attackspeed"]}
          perLevelValue={
            Math.round(
              (champion["stats"]["attackspeedperlevel"] + Number.EPSILON) * 10
            ) / 1000
          }
          lvl={lvl}
        />
        {/* {champion["stats"]["movespeed"]}
        <br />
        {champion["stats"]["attackrange"]} */}
      </div>
      <Row>
        <Col className="my-2 col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <Card className="card-spells">
            <div className="spell-img-container mt-4">
              <CardImg
                src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/${champion["passive"]["image"].full}`}
                alt="passive"
              />
              <span className="bottom-right-icon">P</span>
            </div>
            <CardBody className="text-left">
              <CardTitle>
                <b>{champion["passive"].name}</b>
              </CardTitle>
              <CardText
                dangerouslySetInnerHTML={{
                  __html: champion["passive"].description,
                }}
              ></CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {champion["spells"].map((spell, index) => (
          <Col
            key={index}
            className={
              "my-2 col-12 col-sm-6 col-lg-5 col-xl-3 " +
              (index % 2 ? "" : "offset-lg-1 offset-xl-0")
            }
          >
            <Card className="card-spells">
              <CardBody className="text-left">
                <Row>
                  <Col className="col-4 col-sm-3">
                    <div className="spell-img-container">
                      <CardImg
                        src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${spell.id}.png`}
                        alt={spell.id}
                      />
                      <div className="bottom-right-icon">
                        {index === 0
                          ? "Q"
                          : index === 1
                          ? "W"
                          : index === 2
                          ? "E"
                          : "R"}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-8 col-sm-9">
                    <CardTitle>
                      <b>{spell.name}</b>
                    </CardTitle>
                    <CardSubtitle>
                      Cooldown(s): {spell.cooldownBurn}
                      <br />
                      Cost:{" "}
                      {spell.costBurn === "0" ? "No Cost" : spell.costBurn}
                      <br />
                      Range: {spell.rangeBurn}
                    </CardSubtitle>
                  </Col>
                </Row>
                <br />
                <CardText
                  dangerouslySetInnerHTML={{
                    __html: SpellFilter(spell, spell.tooltip),
                  }}
                ></CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <small className="speel-note">
        Note: "?" indicates data not provided by Riot API. Check values in
        League of Legends Client.
      </small>
    </div>
  );
};

const SpellsTab = (props) => {
  return (
    <div className="panel-def-size">
      <p>
        <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (
        <i>English: /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character
        in the Mario video game franchise, owned by Nintendo and created by
        Japanese video game designer Shigeru Miyamoto. Serving as the company's
        mascot and the eponymous protagonist of the series, Mario has appeared
        in over 200 video games since his creation. Depicted as a short, pudgy,
        Italian plumber who resides in the Mushroom Kingdom, his adventures
        generally center upon rescuing Princess Peach from the Koopa villain
        Bowser. His younger brother and sidekick is Luigi.
      </p>
    </div>
  );
};

const RunesTab = (props) => {
  return (
    <div className="panel-def-size">
      <p>
        <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (
        <i>English: /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character
        in the Mario video game franchise, owned by Nintendo and created by
        Japanese video game designer Shigeru Miyamoto. Serving as the company's
        mascot and the eponymous protagonist of the series, Mario has appeared
        in over 200 video games since his creation. Depicted as a short, pudgy,
        Italian plumber who resides in the Mushroom Kingdom, his adventures
        generally center upon rescuing Princess Peach from the Koopa villain
        Bowser. His younger brother and sidekick is Luigi.
      </p>
    </div>
  );
};

const SkinsTab = (props) => {
  const { champion } = props;

  return (
    <div className="images-container">
      {/* <ImageGroup transitionMs="750">
        <ul className="images">
          {champion.skins.map((skin, index) => (
            <li key={index}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                alt={skin.name}
              />
              <br />
              <div className="overlay-container">
                <div>{skin.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </ImageGroup> */}
    </div>
  );
};

export default Champion;
