import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Cookies from "js-cookie";
import axios from "axios";
import { ddragonVersion } from "../../constants";

import { Grid, Row, Col } from "rsuite";
import Loader from "react-loader-spinner";

import BaseNavbar from "../../components/navbar";
import FreeChampRotation from "../../components/freeChampRotation";
import Footer from "../../components/footer";

import "./Champions.css";

const Champions = (props) => {
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState(
    Array.from({ length: Cookies.get("championCount") }, (v, i) => i)
  );

  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`
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
      <div className="one-page-plus-minus-nav-minus-footer bg-1">
        <h1 className="mt-3"> Champions </h1>
        <h6 className="mt-3">
          Checkout the list of all league of legends champions
          <br />
          <small>Discover more about every champion</small>
        </h6>
        {loading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#d13639" height={100} width={100} />
          </div>
        ) : (
          <div>
            <Grid fluid>
              <Row>
                <Col
                  xs={22}
                  xsOffset={1}
                  md={18}
                  mdOffset={3}
                  lg={14}
                  lgOffset={5}
                >
                  <div
                    className="champs-list py-2"
                    version={loading ? "" : champions.version}
                  >
                    {champions.map((champ, index) => (
                      <a key={index} href={`champion/${champ.id}`}>
                        {loading ? (
                          <div>
                            <div className="default-img"></div>
                            <div className="champ-name">-</div>
                          </div>
                        ) : (
                          <div>
                            <img
                              data-tip
                              data-for={`championDesc${champ.key}tip`}
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ["image"].full}`}
                              alt="full-champion"
                            />
                            <br />
                            <div className="champ-name">{champ.name}</div>
                            <ReactTooltip
                              id={`championDesc${champ.key}tip`}
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
                </Col>
              </Row>
            </Grid>
            <div className="mb-4">
              <FreeChampRotation {...props} />
            </div>
          </div>
        )}
      </div>
      <Footer {...props} page={"champions"} />
    </div>
  );
};

export default Champions;
