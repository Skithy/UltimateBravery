'use strict'

import React from 'react'
import SelectionSelection from './SelectionSelection'
import LogSection from '../SharedComponents/LogSection'
import {getRandomInt, getResults, getUpdatedArray, createArray} from '../SharedComponents/SharedElements'


export default class AdvancedPage extends React.Component {
  constructor() {
    super()
    this.state = {
      values: {"6": [1]},
      log: []
    }
    this.updateValues = this.updateValues.bind(this)
    this.generateValues = this.generateValues.bind(this)
    this.clearValues = this.clearValues.bind(this)
    this.clearLog = this.clearLog.bind(this)
  }

  updateValues(key) {
    return (e) => {
      var tempArray = createArray(e, () => 1)
      this.setState({values: getUpdatedArray(this.state.values, key, tempArray)}) 
    }
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

  clearValues() {
    this.setState({values: createArray(5, () => [])})
  }

  clearLog() {
    this.setState({log: []})
  }

  render() {
    return (
      <div className="home">
        <SelectionSelection
          values={this.state.values}
          updateValue={this.updateValue}
          clearValues={this.clearValues}
        />
        <RaisedButton
          label="Roll"
          labelPosition="before"
          icon={<i className="mdi mdi-dice-3 mdi-light"/>}
          primary={true}
          onTouchTap={this.updateLog}
        />
        <OutputLog
          results={this.state.log}
          clearLog={this.clearLog}
        />
      </div>
    )
  }
}
