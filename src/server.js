'use strict'

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const fs = require('fs');

const app = new express();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const cacheTime = 86400000*7;
const cacheTime = 0
app.use(express.static(resolve(__dirname, 'static'), { maxAge: cacheTime }));
app.use(express.static(resolve(__dirname, 'data'), { maxAge: cacheTime }));

var Datastore = require('nedb')
  , db = new Datastore({ filename: resolve(__dirname, 'data', 'urls.db'), autoload:true})
  , adj

fs.readFile(resolve(__dirname, 'data', 'adjectives.txt'), 'utf8', function(err, data){
  adj = data.split('\r\n')
})

app.get('/url/:id', function(req, res) {
  db.findOne({url: req.params.id}, function(err, doc) {
    if (doc) {
      res.send(JSON.stringify({build: doc.build}))
    } else {
      res.send(JSON.stringify({}))
    }
  })
})

app.post('/urls', function(req, res) {
  db.findOne({build: req.body.build}, function(err, doc) {
    if (doc) {
      res.send(doc.url)
    } else {
      var url = generateUrl(req.body.build[0])
      db.update({url: url}, {url: url, build: req.body.build}, {upsert: true})
      res.send(url)
    }
  })
})

app.get('*', function(req, res) {
  res.sendFile(resolve(__dirname, 'static', 'index.html'));
})

const port = process.env.PORT || 3000;
app.listen(port, function(err) {
  console.log("Listening on port " + port);
  if (err) {
    return console.error(err);
  }
})

function addToDb(data) {
  var url = generateUrl(data[0])
  db.findOne({url: url}, function(err, doc) {
    if (doc) {
      url = addToDb(data)
    } else {
      db.insert({url: url, build: data})
    }
  })
  return url
}

function generateUrl(name) {
  return capital(getRandom(adj)) + capital(getRandom(adj)) + name
}

function getRandom(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function capital(word) {
  return word[0].toUpperCase() + word.slice(1)
}