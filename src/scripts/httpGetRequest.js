"use strict";

const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();
const RIOT_API_KEY = process.env.RIOT_API_KEY;

function statusCheck(response) {
  if (response.status != 200) {
    const error = new Error();
    error.status = response.status;
    throw error;
  } else {
    return response;
  }
}

exports.apiRequest = function (url) {
  return fetch(url + "api_key=" + RIOT_API_KEY)
    .then(statusCheck)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};
