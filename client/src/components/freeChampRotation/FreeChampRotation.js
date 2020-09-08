import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Grid, Row, Col } from "rsuite";

import champions from "../../assets/riot/championIds.json";

import "./FreeChampRotation.css";

const FreeChampRotation = (props) => {
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState([
    1,
    299,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
  ]);
  const [rotationNewPlayers, setRotationNewPlayers] = useState([
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
  ]);
  const [maxNewPlayerLevel, setMaxNewPlayerLevel] = useState(10);

  const parseFreeChampionRotationInfo = (info) => {
    let rot = [];
    for (let i = 0; i < info.freeChampionIds.length; i++) {
      rot.push({
        id: info.freeChampionIds[i],
        name: champions[info.freeChampionIds[i]],
      });
    }
    setRotation(rot);
    rot = [];
    for (let i = 0; i < info.freeChampionIdsForNewPlayers.length; i++) {
      rot.push({
        id: info.freeChampionIdsForNewPlayers[i],
        name: champions[info.freeChampionIdsForNewPlayers[i]],
      });
    }
    setRotationNewPlayers(rot);
    setMaxNewPlayerLevel(info.maxNewPlayerLevel);
    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/riot/free-champion-rotation")
      .then((response) => response.json())
      .then((text) => {
        parseFreeChampionRotationInfo(text);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid fluid>
      <Row>
        <Col
          xs={22}
          xsOffset={1}
          sm={20}
          smOffset={2}
          md={8}
          mdOffset={3}
          lg={6}
          lgOffset={5}
        >
          <div className="free-champs-title">
            <h5>Free Champion Rotation</h5>
          </div>
          <div className="free-champs-list">
            {!loading &&
              rotation.map((item, index) => (
                <a
                  key={loading ? index : item.id}
                  data-value={loading ? "" : item.name}
                  data-tip={loading ? "future" : item.name}
                  data-for={`champion${item.id}tip`}
                  href={`/${props.match.params.lang}/${props.match.params.region}/champion/${item.name}`}
                >
                  {loading ? (
                    <div className="default-img"></div>
                  ) : (
                    <div>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${item.name}.png`}
                        alt="name"
                      />
                      <ReactTooltip
                        id={`champion${item.id}tip`}
                        place="top"
                        effect="solid"
                      >
                        {item.name}
                      </ReactTooltip>
                    </div>
                  )}
                </a>
              ))}
          </div>
        </Col>
        <Col
          xs={22}
          xsOffset={1}
          sm={20}
          smOffset={2}
          md={8}
          mdOffset={2}
          lg={6}
          lgOffset={2}
        >
          <div className="free-champs-title">
            <h5>Free Champion Rotation For New Players </h5>
            <span>Level 1 to {maxNewPlayerLevel}</span>
          </div>
          <div className="free-champs-list">
            {!loading &&
              rotationNewPlayers.map((item, index) => (
                <a
                  key={loading ? index : item.id}
                  data-value={loading ? "" : item.name}
                  data-tip={loading ? "future" : item.name}
                  data-for={`champion${item.id}tip`}
                  href={`/${props.match.params.lang}/${props.match.params.region}/champion/${item.name}`}
                >
                  {loading ? (
                    <div className="default-img"></div>
                  ) : (
                    <div>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${item.name}.png`}
                        alt="name"
                      />
                      <ReactTooltip
                        id={`champion${item.id}tip`}
                        place="top"
                        effect="solid"
                      >
                        {item.name}
                      </ReactTooltip>
                    </div>
                  )}
                </a>
              ))}
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default FreeChampRotation;
