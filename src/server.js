'use strict'

const express = require('express');
const compression = require('compression');
const { resolve } = require('path');

const app = new express();
app.use(compression());

const cacheTime = 86400000*7;
app.use(express.static(resolve(__dirname, 'static'), { maxAge: cacheTime }));


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
