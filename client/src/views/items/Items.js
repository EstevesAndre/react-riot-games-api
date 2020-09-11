import React, { useState, useEffect } from "react";
import { ddragonVersion } from "../../constants";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Grid, Row, Col } from "rsuite";

import BaseNavbar from "../../components/navbar";
import Footer from "../../components/footer";

import "./Items.css";

const Items = (props) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/item.json`
      )
      .then((res) => {
        let itemsList = [];
        for (var ch in res.data.data) {
          if (res.data.data.hasOwnProperty(ch)) {
            itemsList.push({ id: ch, ...res.data.data[ch] });
          }
        }
        setItems(itemsList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log(items);
  }, [items]);

  return (
    <div>
      <BaseNavbar {...props} page="items" />
      <div className="one-page-plus-minus-nav-minus-footer bg-1">
        <h1 className="mt-3"> Items </h1>
        <h6 className="mt-3">
          Checkout the list of all items
          <br />
          <small>Discover more about every item</small>
          <br />
          <br />
          <small>TODO filtering</small>
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
                  xs={24}
                  md={18}
                  mdOffset={3}
                  lg={14}
                  lgOffset={5}
                >
                  <ul className="items-list py-2 list-unstyled list--inline">
                    {items
                      .sort((a, b) => (a.gold.total > b.gold.total ? 1 : -1))
                      // .filter(
                      //   (item) =>
                      //     item.from === undefined &&
                      //     item.into === undefined &&
                      //     item.maps["11"] &&
                      //     !item.hideFromAll &&
                      //     !item.requiredChampion &&
                      //     typeof item.requiredAlly === "undefined" &&
                      //     typeof item.inStore === "undefined" &&
                      //     (item.gold.base === 0 ||
                      //       item.gold.base === 450 ||
                      //       item.gold.base === 400)
                      // )
                      .map((item, index) => (
                        <li key={index}>
                          <img
                            data-tip
                            data-for={`itemDesc${index}tip`}
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${item.image.full}`}
                            alt="full-item"
                          />
                          <br />
                          <div className="item-display-info">
                            {item.gold.total}
                          </div>
                          <ReactTooltip
                            id={`itemDesc${index}tip`}
                            className="item-tooltip"
                            place="top"
                            effect="solid"
                          >
                            <div className="item-name">{item.name}</div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                            {item.gold.total !== 0 && (
                              <div>
                                <br />
                                <p>
                                  Cost: {item.gold.total}({item.gold.sell})
                                </p>
                              </div>
                            )}
                          </ReactTooltip>
                        </li>
                      ))}
                  </ul>
                </Col>
              </Row>
            </Grid>
          </div>
        )}
      </div>
      <Footer {...props} page={"items"} />
    </div>
  );
};

export default Items;
