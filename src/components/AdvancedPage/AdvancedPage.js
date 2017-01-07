'use strict'

import React from 'react'
// import SelectionSelection from './SelectionSection'
import LogSection from '../SharedComponents/LogSection'
import {getRandomInt, getUpdatedDict, createArray} from '../SharedComponents/SharedElements'


export default class AdvancedPage extends React.Component {
  constructor() {
    super()
    this.state = {
      values: {},
      log: []
    }
    this.updateValues = this.updateValues.bind(this)
    this.generateValues = this.generateValues.bind(this)
    this.clearValues = this.clearValues.bind(this)
    this.clearLog = this.clearLog.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  updateValues(key) {
    return (e) => {
      var tempArray = createArray(e, () => 1)
      this.setState({values: getUpdatedDict(this.state.values, key, tempArray)}) 
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

  validateInput(e) {
    const text = e.target.value
    const searchRegExp = /[0-9]{0,2}d[0-9]{1,3}/ig
    const matches = text.match(searchRegExp)
    const newValues = {}
    if (matches) {
      for (var index in matches) {
        let result = matches[index].toLowerCase()
        if (result[0] == "d") {result = "1" + result}
        var [number, sides] = result.split("d")
        newValues[parseInt(sides)] = createArray(parseInt(number), () => 1)
      }
      this.setState({values: newValues})
    }
  }

  render() {
    return (
      null
    )
  }
}

      // <div className="home" id="dicePage">
      //   <SelectionSelection
      //     values={this.state.values}
      //     updateValues={this.updateValues}
      //     generateValues={this.generateValues}
      //     clearValues={this.clearValues}
      //     validateInput={this.validateInput}
      //   />
      //   <LogSection
      //     log={this.state.log}
      //     clearLog={this.clearLog}
      //   />
      // </div>