"use strict";

const express = require("express");
const router = express.Router();

const nameSearch = require("../scripts/summonerNameSearch.js");

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

module.exports = router;
