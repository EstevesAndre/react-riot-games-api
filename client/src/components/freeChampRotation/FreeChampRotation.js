import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import champions from "../../assets/riot/championIds.json";

import "./FreeChampRotation.css";

const FreeChampRotation = () => {
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
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);
  const [maxNewPlayerLevel, setMaxNewPlayerLevel] = useState(10);

  const testFreeChampionRotation = () => {
    fetch("/api/riot/free-champion-rotation")
      .then((response) => response.json())
      .then((text) => {
        parseFreeChampionRotationInfo(text);
      })
      .catch((err) => console.log(err));
  };

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
        id: info.freeChampionIds[i],
        name: champions[info.freeChampionIdsForNewPlayers[i]],
      });
    }
    setRotationNewPlayers(rot);
    setMaxNewPlayerLevel(info.maxNewPlayerLevel);
    setLoading(false);
  };

  useEffect(() => {
    testFreeChampionRotation();
  }, []);

  return (
    <div className="p-2">
      <h5>Free Champion Rotation</h5>
      <div className="free-champs-list">
        {rotation.map((item, index) => (
          <a
            key={loading ? index : item.id}
            data-value={loading ? "" : item.name}
            data-tip={loading ? "future" : item.name}
            data-for={`champion${item.id}tip`}
            href=""
          >
            {loading ? (
              <div className="default-img"></div>
            ) : (
              <div>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${item.name}.png`}
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
      <h5>Free Champion Rotation For New Players </h5>
      <span>Level 1 to {maxNewPlayerLevel}</span>
      <div className="free-champs-list">
        {rotationNewPlayers.map((item, index) => (
          <a
            key={loading ? index : item.id}
            data-value={loading ? "" : item.name}
            href=""
          >
            {loading ? (
              <div className="default-img"></div>
            ) : (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${item.name}.png`}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FreeChampRotation;
