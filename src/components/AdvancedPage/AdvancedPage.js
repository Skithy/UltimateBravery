'use strict'

import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'

import DiceSelector from './DiceSelector'
import OutputLog from './OutputLog'

import {getRandomInt, getResults, getUpdatedArray} from '../SharedElements'

export default class AdvancedPage extends React.Component {
  constructor() {
    super()
    this.state = {
      values: [0, 0, 0, 0, 0],
      log: []
    }
    this.updateValue = this.updateValue.bind(this)
    this.clearValues = this.clearValues.bind(this)
    this.updateLog = this.updateLog.bind(this)
    this.clearLog = this.clearLog.bind(this)
  }

  updateValue(key) {
    return (e) => {
      this.setState({values: getUpdatedArray(this.state.values, key, e)}) 
    }
  }

  clearValues() {
    this.setState({values: [0, 0, 0, 0, 0]})
  }

  clearLog() {
    this.setState({log: []})
  }

  updateLog() {
    let results = []
    results.push(getResults([0, 1], this.state.values[0]))
    results.push(getResults([1, 4], this.state.values[1]))
    results.push(getResults([1, 6], this.state.values[2]))
    results.push(getResults([1, 8], this.state.values[3]))
    results.push(getResults([1, 20], this.state.values[4]))
    console.log(results)
    this.setState({log: [...this.state.log, results]})
  }

  render() {
    return (
      <div className="home">
        <DiceSelector
          values={this.state.values}
          updateValue={this.updateValue}
          clearValues={this.clearValues}/>
        <RaisedButton
          label="Roll"
          labelPosition="before"
          icon={<i className="mdi mdi-dice-3 mdi-light"/>}
          primary={true}
          onTouchTap={this.updateLog}/>
        <OutputLog
          results={this.state.log}
          clearLog={this.clearLog}/>
      </div>
    )
  }
}
