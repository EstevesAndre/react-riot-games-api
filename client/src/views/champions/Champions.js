import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Cookies from "js-cookie";
import axios from "axios";

import BaseNavbar from "../../components/navbar";
import FreeChampRotation from "../../components/freeChampRotation";
// import champions from "../../assets/riot/champions.json";

import "./Champions.css";

const Champions = (props) => {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState(
    Array.from({ length: Cookies.get("championCount") }, (v, i) => i)
  );

  useEffect(() => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json"
      )
      .then((res) => {
        Cookies.set("championCount", Object.keys(res.data.data).length);
        let champs = [];
        for (var ch in res.data.data) {
          if (res.data.data.hasOwnProperty(ch)) {
            champs.push(res.data.data[ch]);
          }
        }
        setChampions(champs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <BaseNavbar {...props} page="champions" />
      <div className="one-page-plus">
        <h1 className=""> CHAMPIONS </h1>
        <div
          className="champs-list p-2"
          version={loading ? "" : champions.version}
        >
          {champions.map((champ, index) => (
            <a key={index} href={`champion/${champ.id}`}>
              {loading ? (
                <div>
                  <div className="default-img"></div>
                  <div className="champ-name">Champion</div>
                </div>
              ) : (
                <div>
                  <img
                    data-tip
                    data-for={`champion${champ.key}tip`}
                    src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champ["image"].full}`}
                  />
                  <br />
                  <div className="champ-name">{champ.name}</div>
                  <ReactTooltip
                    id={`champion${champ.key}tip`}
                    className="champ-tooltip"
                    place="top"
                    effect="solid"
                  >
                    {champ.title}
                  </ReactTooltip>
                </div>
              )}
            </a>
          ))}
        </div>
        <FreeChampRotation />
      </div>
    </div>
  );
};

export default Champions;
