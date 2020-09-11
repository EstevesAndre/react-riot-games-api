"use strict";

exports.searchSummonerMatch = function (host, matchID) {
  let requester = require("./httpGetRequest.js");

  let byNameUrl =
    "https://" + host + ".api.riotgames.com/lol/match/v4/matches/";

  let preparedUrl = byNameUrl + matchID + "?";

  return requester.apiRequest(preparedUrl);
};
