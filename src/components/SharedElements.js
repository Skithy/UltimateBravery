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
const getUpdatedArray = (arr, index, change) => {
  let tempArr = arr
  tempArr[index] = change
  return tempArr
}

export {getRandomInt,
        getLastItem,
        getResults,
        getUpdatedArray}
