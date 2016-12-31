'use strict'

import React from 'react'
import DiceSection from './DiceSection'
import LogSection from '../SharedComponents/LogSection'
import {getRandomInt, createArray, getUpdatedDict} from '../SharedComponents/SharedElements'


export default class DicePage extends React.Component {
  constructor() {
    super()
    this.state = {
      values: {"6": [1]},
      log: []
    }
    this.updateValues = this.updateValues.bind(this)
    this.generateValues = this.generateValues.bind(this)
    this.clearLog = this.clearLog.bind(this)
  }

  updateValues(e) {
    // e is the number of dice
    const tempArray = createArray(e, () => 1)
    this.setState({values: getUpdatedDict(this.state.values, "6", tempArray)}) 
  }

  generateValues() {
    let allResults = {}
    for (const key in this.state.values) {
      allResults[key] = createArray(this.state.values[key].length, () => getRandomInt(1, 6))
    }
    this.setState({
      values: allResults,
      log: this.state.log.concat(allResults)
    })
  }

  clearLog() {
    this.setState({log: []})
  }

  render() {
    return (
      <div className="home" id="dicePage" style={{marginLeft:20, marginRight:20}}>
        <DiceSection
          dice={this.state.values["6"]}
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


