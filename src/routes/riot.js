'use strict'

const express = require('express')
const { Kayn, REGIONS, LRUCache } = require('kayn')
const router = express.Router()
const dotenv = require('dotenv')

dotenv.config()
const RIOT_API_KEY = process.env.RIOT_API_KEY

const kayn = Kayn(RIOT_API_KEY)({
  region: REGIONS.EUROPE_WEST,
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

  // kayn.League.Entries.bySummonerID(req.params.id)
  //   .region(req.query.region)
  //   .then((league) => res.send(league))
  //   .catch((err) => res.send(err))
})

router.get('/summoner/matches/:accountId', function (req, res) {
  kayn.Matchlist.by
    .accountID(req.params.accountId)
    .query({
      beginIndex: req.query.beginIndex,
      endIndex: req.query.endIndex,
    })
    .region(req.query.region)
    .then((matchlist) => res.send(matchlist))
    .catch((err) => res.send(err))
})

router.get('/summoner/match/:matchID', function (req, res) {
  kayn.Match.get(req.params.matchID)
    .region(req.query.region)
    .then((match) => res.send(match))
    .catch((err) => res.send(err))
})

router.get('/summoner/:userID', function (req, res, next) {
  kayn.Summoner.by
    .name(req.params.userID)
    .region(req.query.region)
    .then((summoner) => res.send(summoner))
    .catch((err) => res.send(err))
})

router.get('/free-champion-rotation', function (req, res) {
  kayn.Champion.Rotation.list()
    .region(req.query.region)
    .then((rotation) => res.status(200).send(rotation))
    .catch((err) => res.send(err))
})

module.exports = router
