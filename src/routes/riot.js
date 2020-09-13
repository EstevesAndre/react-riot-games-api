'use strict'

const express = require('express')
const { Kayn, REGIONS, LRUCache } = require('kayn')
const router = express.Router()
const dotenv = require('dotenv')

dotenv.config()
const RIOT_API_KEY = process.env.RIOT_API_KEY

const kayn = Kayn(RIOT_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  locale: 'en_US',
  debugOptions: {
    isEnabled: true,
    showKey: false,
  },
  requestOptions: {
    burst: true,
  },
  cacheOptions: {
    cache: new LRUCache({ max: 5000 }),
    timeToLives: {
      useDefault: true, // Cache DDragon by default!
    },
  },
})

const nameSearch = require('../scripts/summonerNameSearch.js')
const championRotationSearch = require('../scripts/freeChampionRotation.js')
const leagueSearch = require('../scripts/summonerLeague.js')
const matchesSearch = require('../scripts/summonerMatches.js')
const matchInfo = require('../scripts/summonerMatchID.js')

const getHost = (reg) => {
  let host = 'euw1'

  switch (reg) {
    case 'euw':
      host = 'euw1'
      break
    case 'na':
      host = 'na1'
      break
    case 'kr':
      host = 'kr'
      break
    case 'jp':
      host = 'jp1'
      break
    case 'eune':
      host = 'eun1'
      break
    case 'oce':
      host = 'oc1'
      break
    case 'las':
      host = 'la1'
      break
    case 'lan':
      host = 'la2'
      break
    case 'ru':
      host = 'ru'
      break
    case 'tr':
      host = 'tr1'
      break
  }

  return host
}

router.get('/summoner/league/:id', function (req, res) {
  let host = getHost(req.query.region)

  leagueSearch
    .searchSummonerLeague(host, req.params.id)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err))
})

router.get('/summoner/matches/:accountId', function (req, res) {
  let host = getHost(req.query.region)
  matchesSearch
    .searchSummonerMatches(
      host,
      req.params.accountId,
      req.query.beginIndex,
      req.query.endIndex
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err))
})

router.get('/summoner/match/:matchID', function (req, res) {
  let host = getHost(req.query.region)
  matchInfo
    .searchSummonerMatch(host, req.params.matchID)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err))
})

router.get('/summoner/:userID', function (req, res, next) {
  // let urlComponents = req.headers.host.split(":");
  // If the user is in the system -- grab their data and populate the application
  let host = getHost(req.query.region)

  // Send data to react
  nameSearch
    .searchSummoner(host, req.params.userID)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.send(err))
})

router.get('/free-champion-rotation', function (req, res) {
  // let host = getHost(req.query.region)
  // championRotationSearch
  //   .championRotation(host)
  //   .then((response) => res.status(200).send(response))
  //   .catch((err) => res.send(err))

  kayn.Champion.Rotation.list()
    .then((rotation) => res.status(200).send(rotation))
    .catch((err) => res.send(err))
})

module.exports = router
