'use strict'

import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'

import getRandomInt from '../SharedElements'

export default class DicePage extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="home">
        <h1>Dice Page</h1>
      </div>
    )
  }
}
