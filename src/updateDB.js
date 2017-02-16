'use strict'

import Datastore from 'nedb'

const apiKey = process.env.RIOT_API || 'RGAPI-86020257-84a9-4845-aeef-883730199586'
const baseUrl = 'https://global.api.pvp.net/api/lol/static-data/oce/v1.2'
const champsUrl = baseUrl + '/champion?champData=image,passive,spells,stats&api_key='
const itemsUrl = baseUrl + '/item?itemListData=all&api_key='
const masteriesUrl = baseUrl + '/mastery?api_key='
const summonersUrl = baseUrl + '/summoner-spell?api_key='
const ddVersionUrl = baseUrl + '/realm?api_key='

let db = {}
db.urls = new Datastore({filename: '/data/urls.db', autoload: true})
db.champions = new Datastore({filename: '/data/champions.db', autoload: true})
db.items = new Datastore({filename: '/data/items.db', autoload: true})
db.masteries = new Datastore({filename: '/data/masteries.db', autoload: true})
db.summoners = new Datastore({filename: '/data/summoners.db', autoload: true})

let oldVersion, newVersion
let updateStatus = {
  urls: false,
  champions: false,
  items: false,
  masteries: false,
  summoners: false
}

function updateDB() {
  db.urls.findOne({}, (err, doc) => {
    //oldVersion = doc ? doc.version : null
    fetch(ddVersionUrl + apiKey)
      .then(res => res.json())
      .then(json => {
        newVersion = json.dd
        console.log('Current Version: ' + oldVersion)
        console.log('Server Version: ' + newVersion)
        if (oldVersion != newVersion) {
          console.log('Updating...')
          updateUrls()
          updateChampions()
          updateItems()
          updateMasteries()
          updateSummoners()
        } else {
          console.log('No updates')
        }
      })
      .catch(e => console.log('error: ' + e))
  })
}

function updateUrls() {
  const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/' + newVersion + '/img/'
  const urls = {
    champion: baseUrl + 'champion/',
    passive: baseUrl + 'passive/',
    spell: baseUrl + 'spell/',
    item: baseUrl + 'item/',
    mastery: baseUrl + 'mastery/',
    version: newVersion
  }
  db.urls.update({}, urls, {upsert: true}, () => complete('urls'))
}

function updateChampions() {
  fetch(champsUrl + apiKey)
    .then(res => res.json())
    .then(json => {
      const champions = Object.keys(json.data).map(key => json.data[key])
      db.champions.remove({}, { multi: true })
      db.champions.insert(champions)
    })
    .then(() => complete('champions'))
    .catch(e => console.log('error: ' + e))
}

function updateItems() {
  fetch(itemsUrl + apiKey)
    .then(res => res.json())
    .then(json => {
      const items = Object.keys(json.data).map(key => json.data[key])
      db.items.remove({}, { multi: true })
      db.items.insert(items)
    })
    .then(() => complete('items'))
    .catch(e => console.log('error: ' + e))
}

function updateMasteries() {
  fetch(masteriesUrl + apiKey)
    .then(res => res.json())
    .then(json => {
      const masteries = Object.keys(json.data).map(key => json.data[key])
      db.masteries.remove({}, { multi: true })
      db.masteries.insert(masteries)
    })
    .then(() => complete('masteries'))
    .catch(e => console.log('error: ' + e))
}

function updateSummoners() {
  fetch(summonersUrl + apiKey)
    .then(res => res.json())
    .then(json => {
      const summoners = Object.keys(json.data).map(key => json.data[key])
      db.summoners.remove({}, { multi: true })
      db.summoners.insert(summoners)
    })
    .then(() => complete('summoners'))
    .catch(e => console.log('error: ' + e))
}

function complete(done) {
  updateStatus[done] = true
  for (var index in updateStatus) {
    if (!updateStatus[index]) {
      return false
    }
  }
  console.log('done')
}

export default updateDB