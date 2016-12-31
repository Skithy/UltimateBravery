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

// returns array with updated index
const getUpdatedArray = (arr, index, value) => {
  let tempArr = clone(arr)
  tempArr[index] = value
  return tempArr
}

const createArray = (length, func) => (
  Array.apply(null, Array(length)).map(func)
)

const getUpdatedDict = (dict, key, value) => {
  let tempDict = clone(dict)
  tempDict[key] = value
  return tempDict
}

const clone = (obj) => {
  if(obj == null || typeof(obj) != 'object')
      return obj;

  var temp = new obj.constructor(); 
  for(var key in obj)
      temp[key] = clone(obj[key]);

  return temp;
}

export {getRandomInt,
        getLastItem,
        getResults,
        getUpdatedArray,
        createArray,
        getUpdatedDict}
