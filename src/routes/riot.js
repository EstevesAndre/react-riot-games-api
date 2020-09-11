"use strict";

const express = require("express");
const router = express.Router();

const nameSearch = require("../scripts/summonerNameSearch.js");
const championRotationSearch = require("../scripts/freeChampionRotation.js");
const leagueSearch = require("../scripts/summonerLeague.js");
const matchesSearch = require("../scripts/summonerMatches.js");
const matchInfo = require("../scripts/summonerMatchID.js");

router.get("/summoner/league/:id", function (req, res) {
  let host = "euw1";
  leagueSearch
    .searchSummonerLeague(host, req.params.id)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err));
});

router.get("/summoner/matches/:accountId", function (req, res) {
  let host = "euw1";
  matchesSearch
    .searchSummonerMatches(
      host,
      req.params.accountId,
      req.query.beginIndex,
      req.query.endIndex
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err));
});

router.get("/summoner/match/:matchID", function (req, res) {
  let host = "euw1";
  matchInfo
    .searchSummonerMatch(host, req.params.matchID)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err));
});

router.get("/summoner/:userID", function (req, res, next) {
  // let urlComponents = req.headers.host.split(":");
  // If the user is in the system -- grab their data and populate the application
  let host = "euw1";
  // Send data to react
  nameSearch
    .searchSummoner(host, req.params.userID)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err));
});

router.get("/free-champion-rotation", function (req, res) {
  let host = "euw1";
  championRotationSearch
    .championRotation(host)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err));
});

module.exports = router;
