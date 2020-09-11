import React, { useState, useEffect } from "react";

import cookiesApi from "../../api/cookies";
import { ddragonVersion } from "../../constants";

import { Grid, Row, Col } from "rsuite";

import Footer from "../../components/footer";
import BaseNavbar from "../../components/navbar";

const Summoner = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [invalidSummoner, setInvalidSummoner] = useState(false);

  const [searchInfo, setSearchInfo] = useState(null);
  const [summonerLeagues, setSummonerLeagues] = useState(null);
  const [summonerGamesInfo, setSummonerGamesInfo] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      // console.log(props);
    } else {
      setFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    const username = props.match.params.username;

    if (username === undefined) {
      setInvalidSummoner(true);
      return;
    }
    // "ßandlε Guηnεr"
    setSummonerGamesInfo([]);
    setSummonerLeagues(null);
    setSearchInfo(null);

    const cachedHits = localStorage.getItem("summoner-acc");

    if (cachedHits) {
      if (JSON.parse(cachedHits).name === username) {
        console.log("HERE1");
        setStorageInformation(cachedHits);
      } else {
        console.log("HERE3");
        fetchSummonerInfo(username);
      }
    } else {
      console.log("HERE2");
      fetchSummonerInfo(username);
    }
  }, [props.match.params.username]);

  const setStorageInformation = (accountInfo) => {
    setSearchInfo(JSON.parse(accountInfo));
    setIsLoading(false);

    const leagueStorage = localStorage.getItem("summoner-league");
    if (leagueStorage) setSummonerLeagues(JSON.parse(leagueStorage));

    for (let i = 1; i <= 10; i++) {
      let gameStorage = localStorage.getItem(`summoner-game-${i}`);
      if (gameStorage)
        setSummonerGamesInfo((old) => [...old, JSON.parse(gameStorage)]);
    }
  };

  const fetchSummonerInfo = (username) => {
    fetch(`/api/riot/summoner/${encodeURI(username)}`)
      .then((response) => response.json())
      .then((text) => {
        if (text.status === 404) {
          console.log("Invalid Summoner");
          setInvalidSummoner(true);
        } else {
          setSearchInfo(text);
          cookiesApi.addSummonerSearch(text.name);
          localStorage.setItem("summoner-acc", JSON.stringify(text));
          setIsLoading(false);
          fetchSummonerLeague(text.id);
          fetchSummonerGames(text.accountId, 0, 10);
        }
      })
      .catch((err) => {
        setInvalidSummoner(true);
        console.log(err);
      });
  };

  const fetchSummonerLeague = (id) => {
    fetch(`/api/riot/summoner/league/${id}`)
      .then((response) => response.json())
      .then((text) => {
        setSummonerLeagues(text);
        localStorage.setItem("summoner-league", JSON.stringify(text));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSummonerGames = (accountId, beginIndex, endIndex) => {
    fetch(
      `/api/riot/summoner/matches/${accountId}?beginIndex=${beginIndex}&endIndex=${endIndex}`
    )
      .then((response) => response.json())
      .then((text) => {
        fetchGamesInfo(text);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGamesInfo = async (object) => {
    let index = 0;

    await Promise.all(
      object.matches.map(async (game) => {
        let res = await fetch(`/api/riot/summoner/match/${game.gameId}`);
        let data = await res.json();
        index++;
        localStorage.setItem(`summoner-game-${index}`, JSON.stringify(data));
        setSummonerGamesInfo((old) => [...old, data]);
      })
    );
  };

  useEffect(() => {
    if (summonerGamesInfo.length === 10) {
      setSummonerGamesInfo(
        summonerGamesInfo.sort((a, b) => {
          return b.gameCreation < a.gameCreation;
        })
      );
      console.log(summonerGamesInfo);
    }
  }, [summonerGamesInfo]);

  return (
    <div>
      <BaseNavbar {...props} page="summoner" />
      <div className="one-page-plus-minus-nav-minus-footer text-white">
        <h1 className="pt-5"> SUMMONER </h1>
        <h5> TODO </h5>
        {invalidSummoner ? <div>Invalid</div> : <div>Valid</div>}

        {!isLoading && searchInfo && (
          <div>
            <img
              className="mx-2 champ-img"
              src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${searchInfo.profileIconId}.png`}
              alt="summoner-icon"
            />
            <h4>{searchInfo.name}</h4>
            <h4>{searchInfo.summonerLevel}</h4>
            <SummonerRanking ranking={summonerLeagues} />
          </div>
        )}

        <div className="pb-5">
          {summonerGamesInfo.map((game, index) => (
            <div key={index}>
              {game.gameMode} {game.gameType}
              <Grid fluid>
                <Row>
                  {game.participantIdentities &&
                    game.participantIdentities.map((sum, index2) => (
                      <Col
                        md={4}
                        mdOffset={
                          sum.participantId === 1 || sum.participantId === 6
                            ? 2
                            : 0
                        }
                        key={sum.participantId}
                        className="mb-3"
                      >
                        {sum.player.summonerName}
                        <br />
                        {index2}
                      </Col>
                    ))}
                </Row>
              </Grid>
            </div>
          ))}
        </div>
      </div>
      <Footer {...props} page={"summoner"} />
    </div>
  );
};

const SummonerRanking = ({ ranking }) => {
  return (
    <Grid fluid>
      <Row>
        {ranking &&
          ranking.map((league, index) => (
            <Col
              xs={20}
              xsOffset={2}
              sm={10}
              smOffset={index === 0 ? 2 : 0}
              lg={5}
              lgOffset={index === 0 ? 6 : 2}
              key={league.leagueId}
            >
              <div>
                <h4>{league.queueType}</h4>
                <h5>{`${league.tier} ${league.rank}`}</h5>
                <p>{league.leaguePoints} LP</p>
                <p>{league.wins} wins</p>
                <p>{league.losses} losses</p>
              </div>
            </Col>
          ))}
      </Row>
    </Grid>
  );
};

export default Summoner;
