"use strict";

exports.searchSummonerLeague = function (host, id) {
  let requester = require("./httpGetRequest.js");

  let byNameUrl =
    "https://" + host + ".api.riotgames.com/lol/league/v4/entries/by-summoner/";

  let preparedUrl = byNameUrl + id + "?";

  return requester.apiRequest(preparedUrl);
};
