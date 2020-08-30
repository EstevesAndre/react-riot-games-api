"use strict";

exports.championRotation = function (host) {
  let requester = require("./httpGetRequest.js");

  let preparedUrl =
    "https://" +
    host +
    ".api.riotgames.com/lol/platform/v3/champion-rotations?";

  return requester.apiRequest(preparedUrl);
};
