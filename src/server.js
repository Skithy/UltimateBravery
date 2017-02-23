'use strict'

const express = require('express');
const mongoose = require ("mongoose");
const compression = require('compression');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const fs = require('fs');

/* SETUP */

const app = new express();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const cacheTime = 86400000*7;
const cacheTime = 0
app.use(express.static(resolve(__dirname, 'static'), { maxAge: cacheTime }));
app.use(express.static(resolve(__dirname, 'data'), { maxAge: cacheTime }));

/* DATA */

var adj;
fs.readFile(resolve(__dirname, 'data', 'adjectives.txt'), 'utf8', function(err, data){
  adj = data.split(/\r?\n/)
})

var uristring = 
  process.env.MONGOLAB_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost/UltimateBraveryDb';

var urlSchema = new mongoose.Schema({ url: String, build: Array })
var Url = mongoose.model('Url', urlSchema)


app.get('/url/:id', function(req, res) {
  Url.findOne({url: req.params.id}, function (err, doc) {
    if (!err) {
      if (doc) {
        res.send(JSON.stringify({build: doc.build}))
      } else {
        res.send({})
      }
    } else {
      console.log('Error: ' + err)
      res.send({})
    }
  })
})


app.post('/urls', function(req, res) {
  Url.findOne({build: req.body.build}, function(err, doc) {
    if (!err) {
      console.log(req.body.build)
      if (doc) {
        console.log(doc.url)
      } else {
        var url = generateRandomUrl(req.body.build[0])
        var urlbuild = new Url({url: url, build: req.body.build})
        urlbuild.save(function (err) {if (err) console.log ('Error on save!')})
        res.send(url)
      }
    } else {
      console.log('Error: ' + err)
      res.send('')
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

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

function generateRandomUrl(name) {
  var url = generateUrl(name)
  Url.findOne({url: url}, function (err, doc) {
    if (!err) {
      if (doc) {
        url = generateRandomUrl(name)
      }
    } else {
      console.log('Error: ' + err)
      return null
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