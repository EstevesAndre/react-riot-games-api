"use strict";

exports.searchSummonerMatches = function (
  host,
  accountId,
  beginIndex,
  endIndex
) {
  let requester = require("./httpGetRequest.js");

  let byNameUrl =
    "https://" +
    host +
    ".api.riotgames.com/lol/match/v4/matchlists/by-account/";

  let preparedUrl =
    byNameUrl +
    accountId +
    "?beginIndex=" +
    beginIndex +
    "&endIndex=" +
    endIndex +
    "&";

  return requester.apiRequest(preparedUrl);
};
