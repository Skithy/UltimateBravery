'use strict'

const clone = obj => {
  var copy

  if (null == obj || "object" != typeof obj) return obj

  if (obj instanceof Date) {
      copy = new Date()
      copy.setTime(obj.getTime())
      return copy
  }

  if (obj instanceof Array) {
      copy = []
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i])
      }
      return copy
  }

  if (obj instanceof Set) {
      copy = new Set(obj)
      return copy
  }

  if (obj instanceof Object) {
      copy = {}
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
      }
      return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

const isEmpty = obj => {
  if (obj == null) return true

  if (obj.length > 0) return false
  if (obj.length == 0)  return true

  if (typeof obj !== "object") return true

  return Object.keys(obj).length == 0
}

const shuffle = arr => {
  var i = 0
    , j = 0
    , temp = null
    , array = clone(arr)

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const lastItem = arr => arr[arr.length - 1]

const randInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)

const capitalize = (string) => string[0].toUpperCase() + string.slice(1)

const getRandom = (arr) => arr[Math.floor(Math.random()*arr.length)]

export {clone,
  isEmpty,
  shuffle,
  lastItem,
  randInt,
  capitalize,
  getRandom
}
