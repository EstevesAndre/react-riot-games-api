import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import { ddragonVersion } from '../../constants'

import { Grid, Row, Col } from 'rsuite'
import Loader from 'react-loader-spinner'

import BaseNavbar from '../../components/navbar'
import FreeChampRotation from '../../components/freeChampRotation'
import Footer from '../../components/footer'

import './Champions.css'

const Champions = (props) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [champions, setChampions] = useState([])

  useEffect(() => {
    async function getChampionsInfo() {
      const res = await axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`
        )
        .catch((err) => {
          console.log(err)
        })

      if (res === undefined) {
        setError('Unable to retrive champion information. Try again later.')
        return
      }

      let champs = []
      for (var ch in res.data.data) {
        if (res.data.data.hasOwnProperty(ch)) {
          champs.push({
            id: res.data.data[ch].id,
            name: res.data.data[ch].name,
            key: res.data.data[ch].key,
            title: res.data.data[ch].title,
            imageFull: res.data.data[ch]['image'].full,
          })
        }
      }
      setChampions(champs)
      localStorage.setItem('champs-basic-info', JSON.stringify(champs))
      setLoading(false)
    }

    async function checkChampionsCountToUpdateLocalStorage(actualSize) {
      const res = await axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`
        )
        .catch((err) => {
          console.log(err)
        })

      if (res === undefined) {
        return
      }

      if (Object.keys(res.data.data).length !== actualSize) {
        setLoading(true)
        getChampionsInfo()
      }
    }

    const cachedHits = localStorage.getItem('champs-basic-info')
    if (cachedHits) {
      setChampions(JSON.parse(cachedHits))
      setLoading(false)
      checkChampionsCountToUpdateLocalStorage(JSON.parse(cachedHits).length)
    } else {
      getChampionsInfo()
    }
  }, [])

  return (
    <div>
      <BaseNavbar {...props} page="champions" />
      <div className="one-page-plus-minus-nav-minus-footer bg-1">
        <h1 className="pt-3"> Champions </h1>
        <h6 className="mt-3">
          Checkout the list of all league of legends champions
          <br />
          <small>Discover more about every champion</small>
        </h6>
        {error && (
          <div className="py-5">
            <h4>{error}</h4>
          </div>
        )}
        {loading ? (
          error === null && (
            <div className="loader-container">
              <Loader
                type="ThreeDots"
                color="#d13639"
                height={100}
                width={100}
              />
            </div>
          )
        ) : (
          <div>
            <Grid fluid>
              <Row>
                <Col
                  xs={24}
                  sm={22}
                  smOffset={1}
                  md={18}
                  mdOffset={3}
                  lg={14}
                  lgOffset={5}
                >
                  <div className="champs-list py-2" version={champions.version}>
                    {champions.map((champ, index) => (
                      <a key={index} href={`champion/${champ.id}`}>
                        <div>
                          <img
                            data-tip
                            data-for={`championDesc${champ.key}tip`}
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ.imageFull}`}
                            alt="full-champion"
                          />
                          <br />
                          <div className="champ-name">{champ.name}</div>
                          <ReactTooltip
                            id={`championDesc${champ.key}tip`}
                            className="champ-tooltip"
                            place="top"
                            effect="solid"
                          >
                            {champ.title}
                          </ReactTooltip>
                        </div>
                      </a>
                    ))}
                  </div>
                </Col>
              </Row>
            </Grid>
            <div className="mb-4">
              <FreeChampRotation {...props} />
            </div>
          </div>
        )}
      </div>
      <Footer {...props} page={'champions'} />
    </div>
  )
}

export default Champions
