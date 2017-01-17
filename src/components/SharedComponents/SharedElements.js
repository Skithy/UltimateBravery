'use strict'

import React from 'react'

// returns random number
const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
)

// returns array of random numbers 
const getResults = (range, repeatNum) => {
  let results = []
  for (let i=0; i < repeatNum; i++) {
    results.push(getRandomInt.apply(this, range))
  }
  return results
}

// returns last item of array
const getLastItem = arr => (
  arr[arr.length - 1]
)

// creates an array based off function
const createArray = (length, func) => (
  Array.apply(null, Array(length)).map(func)
)

// clones an object
const clone = obj => {
    var copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export {getRandomInt,
        getLastItem,
        getResults,
        createArray,
        clone}
