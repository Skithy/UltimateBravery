'use strict'

import React from 'react'
import DiceSection from './DiceSection'
import LogSection from '../SharedComponents/LogSection'
import {getRandomInt, createArray} from '../SharedComponents/SharedElements'


export default class DicePage extends React.Component {
  constructor() {
    super()
    this.state = {
      dice: [1],
      log: []
    }
    this.updateValues = this.updateValues.bind(this)
    this.generateValues = this.generateValues.bind(this)
    this.clearLog = this.clearLog.bind(this)
  }

  updateValues(e) {
    // e is the number of dice
    const tempArray = createArray(e, () => 1)
    this.setState({dice: tempArray}) 
  }

  generateValues() {
    const tempArray = createArray(this.state.dice.length, () => getRandomInt(1, 6))
    let logFormat = {6: tempArray}
    this.setState({
      dice: tempArray,
      log: this.state.log.concat([logFormat])
    })
  }

  clearLog() {
    this.setState({log: []})
  }

  render() {
    return (
      <div className="home" id="dicePage">
        <DiceSection
          dice={this.state.dice}
          updateValues={this.updateValues}
          generateValues={this.generateValues}
        />
        <LogSection
          log={this.state.log}
          clearLog={this.clearLog}
        />
      </div>  
    )
  }
}


