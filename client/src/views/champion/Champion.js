import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { ddragonVersion } from "../../constants";
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
import Loader from "react-loader-spinner";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BaseNavbar from "../../components/navbar";
import { ImageGroup, Image } from "react-fullscreen-image";

import Footer from "../../components/footer";

import "react-tabs/style/react-tabs.css";
import "./Champion.css";

const Champion = (props) => {
  const [loading, setLoading] = useState(true);
  const [invalidChampion, setInvalidChampion] = useState(false);
  const [champion, setChampion] = useState(null);
  const [championCapitalized, setChampionCapitalized] = useState(
    props.match.params.champion
  );

  useEffect(() => {
    const champ = props.match.params.champion || "";
    if (champ === "") {
      setInvalidChampion(true);
      return;
    }
    const champCapitalized = champ.charAt(0).toUpperCase() + champ.slice(1);
    setChampionCapitalized(champCapitalized);
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion/${champCapitalized}.json`
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
      <BaseNavbar {...props} page={`champions`} />
      <div className="one-page-plus-minus-nav-minus-footer text-white">
        {loading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#d13639" height={100} width={100} />
          </div>
        ) : invalidChampion ? (
          <InvalidChampion />
        ) : (
          <ChampionInformation {...props} champion={champion} />
        )}
      </div>

      <Footer {...props} page={`champion/${championCapitalized}`} />
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
          <Col className="col-12 col-sm-3 offset-sm-1 col-md-2 img-container">
            <img
              className="mx-2 champ-img"
              src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champion["image"].full}`}
              alt="champion"
            />
          </Col>
          <Col className="col-12 col-sm-6 col-md-3 col-xl-2 main-stats">
            <h3>{champion.name}</h3>
            <p>{champion.title}</p>
            <div>
              {champion.tags.map((tag, index) => (
                <Badge key={index} className="mr-2 badge-c">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="info-stats mt-3">
              <InfoBadge
                id="AD"
                name="Attack"
                value={champion["info"].attack}
                color="clr-ad"
              />
              <InfoBadge
                id="AP"
                name="Magic"
                value={champion["info"].magic}
                color="clr-ap"
              />
              <InfoBadge
                id="DEF"
                name="Defense"
                value={champion["info"].defense}
                color="clr-def"
              />
              <InfoBadge
                id="DIF"
                name="Difficulty"
                value={champion["info"].difficulty}
                color="clr-dif"
              />
            </div>
          </Col>
          <Col className="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-0 spell-col">
            <h4>Habilities</h4>
            <div className="spell-container">
              <div>
                <div className="spell-img-container">
                  <img
                    data-tip
                    data-for={`passivetip`}
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/passive/${champion["passive"]["image"].full}`}
                    alt="passive"
                  />
                  <span className="bottom-right-icon">P</span>
                  <ReactTooltip
                    id={`passivetip`}
                    className="spell-tooltip"
                    place="bottom"
                    effect="solid"
                  >
                    <div className="spell-name">{champion["passive"].name}</div>
                    <div
                      className="spell-description"
                      dangerouslySetInnerHTML={{
                        __html: champion["passive"].description,
                      }}
                    ></div>
                    <small>
                      Note: "?" indicates data not provided by Riot API. Check
                      values in League of Legends Client.
                    </small>
                  </ReactTooltip>
                </div>
              </div>

              {champion["spells"].map((spell, index) => (
                <div key={index}>
                  <div className="spell-img-container">
                    <img
                      data-tip
                      data-for={`spell${spell.id}tip`}
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spell.id}.png`}
                      alt={spell.id}
                    />
                    <span className="bottom-right-icon">
                      {index === 0
                        ? "Q"
                        : index === 1
                        ? "W"
                        : index === 2
                        ? "E"
                        : "R"}
                    </span>
                    <ReactTooltip
                      id={`spell${spell.id}tip`}
                      className="spell-tooltip"
                      place="bottom"
                      effect="solid"
                    >
                      <div className="spell-name">{spell.name}</div>
                      <div className="spell-costs">
                        Cooldown(s): {spell.cooldownBurn}
                        <br />
                        Cost:{" "}
                        {spell.costBurn === "0" ? "No Cost" : spell.costBurn}
                        <br />
                        Range: {spell.rangeBurn}
                      </div>
                      <div
                        className="spell-description"
                        dangerouslySetInnerHTML={{
                          __html: SpellFilter(spell, spell.tooltip),
                        }}
                      ></div>
                      <small>
                        Note: "?" indicates data not provided by Riot API. Check
                        values in League of Legends Client.
                      </small>
                    </ReactTooltip>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <Tabs className="mt-4">
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
          src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champion["image"].full}`}
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
        <Col className="col-4 offset-1 col-md-4 offset-md-1 col-lg-2 offset-lg-2 col-xl-3 offset-xl-3 text-left">
          {name}
        </Col>
        <Col
          className={
            "col-2 col-md-2 col-lg-2 col-xl-1 " + (isHeader ? "text-bold" : "")
          }
        >
          {baseValue}
        </Col>
        <Col
          className={
            "col-2 col-md-2 col-lg-2 col-xl-1 " + (isHeader ? "text-bold" : "")
          }
        >
          {perLevelValue}
        </Col>
        <Col
          className={
            "col-2 col-md-2 col-lg-2 col-xl-1 " + (isHeader ? "text-bold" : "")
          }
        >
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
    </div>
  );
};

const SpellsTab = (props) => {
  return (
    <div className="panel-def-size">
      <h1>
        <b>TODO</b>
      </h1>
    </div>
  );
};

const RunesTab = (props) => {
  return (
    <div className="panel-def-size">
      <h1>
        <b>TODO</b>
      </h1>
    </div>
  );
};

const SkinsTab = (props) => {
  const { champion } = props;

  return (
    <div className="images-container half-page-plus">
      <ImageGroup transitionMs="750">
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
      </ImageGroup>
    </div>
  );
};

export default Champion;
