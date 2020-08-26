"use strict";

exports.searchSummoner = function (host, name) {
  let requester = require("./httpGetRequest.js");

  let byNameUrl =
    "https://" +
    "euw1" +
    ".api.riotgames.com/lol/summoner/v4/summoners/by-name/";

  let preparedUrl = byNameUrl + encodeURI(name) + "?";

  return requester.apiRequest(preparedUrl);
};
