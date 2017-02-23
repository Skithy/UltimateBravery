'use strict'

import React from 'react'
import Datastore from 'nedb'

const apiKey = RIOT_API || 'RIOT_API'
const baseUrl = 'https://global.api.pvp.net/api/lol/static-data/oce/v1.2'
  , champsUrl = baseUrl + '/champion?champData=image,passive,spells,stats,tags&api_key=' + apiKey
  , itemsUrl = baseUrl + '/item?itemListData=all&api_key=' + apiKey
  , masteriesUrl = baseUrl + '/mastery?masteryListData=image,tree,sanitizedDescription&api_key=' + apiKey
  , summonersUrl = baseUrl + '/summoner-spell?spellData=image,modes&api_key=' + apiKey
  , versionUrl = baseUrl + '/realm?api_key=' + apiKey

const db = new Datastore({filename: '/data/data.db', autoload: true})

export default class Data extends React.Component {
  state = {
    champions: {},
    items: {},
    masteries: {},
    summoners: {},
    urls: {},
    version: ''
  }

  constructor() {
    super()
    let oldVersion, newVersion

    db.findOne({}, (err, doc) => {
      fetch(versionUrl)
        .then(res => res.json())
        .then(json => {
          //oldVersion = doc ? doc.version : null
          newVersion = json.dd
          console.log('Current Version: ' + oldVersion)
          console.log('Server Version: ' + newVersion)
          if (oldVersion != newVersion) {
            this.updateAll(newVersion)
          } else {
            console.log('No updates')
            this.setState(doc)
          }
        })
        .catch(e => console.log('error: ' + e))
    })
  }

  updateVersion = (version) => {
    db.update({}, { $set: {version: version}}, {upsert: true})
  }

  updateUrls = (version) => {
    const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/'
    const urls = {
      champion: baseUrl + 'champion/',
      passive: baseUrl + 'passive/',
      spell: baseUrl + 'spell/',
      item: baseUrl + 'item/',
      mastery: baseUrl + 'mastery/',
      splash: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/',
      loading: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/',
      version: version
    }
    db.update({}, { $set: {urls: urls}}, {upsert: true})
    this.setState({urls: urls})
  }

  updateChampions = () => {
    fetch(champsUrl)
      .then(res => res.json())
      .then(json => {
        db.update({}, { $set: {champions: json.data}}, {upsert: true})
        this.setState({champions: json.data}) 
      })
  }

  updateItems = () => {
    fetch(itemsUrl)
      .then(res => res.json())
      .then(json => {
        db.update({}, { $set: {items: json.data}}, {upsert: true})
        this.setState({items: json.data})
      })
  }

  updateMasteries = () => {
    fetch(masteriesUrl)
      .then(res => res.json())
      .then(json => {
        db.update({}, { $set: {masteries: json}}, {upsert: true})
        this.setState({masteries: json})
      })
  }

  updateSummoners = () => {
    fetch(summonersUrl)
      .then(res => res.json())
      .then(json => {
        db.update({}, { $set: {summoners: json.data}}, {upsert: true})
        this.setState({summoners: json.data})
      })
  }

  updateAll = (version) => {
    try {
      this.updateVersion(version)
      this.updateUrls(version)
      this.updateChampions()
      this.updateItems()
      this.updateMasteries()
      this.updateSummoners()
    }
    catch (err) {
      this.updateAll(version)
    }
  }

  render() {
    return React.cloneElement(this.props.children, this.state)
  }
}