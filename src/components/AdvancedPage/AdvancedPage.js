'use strict'

import React from 'react'
import SelectorSection from './SelectorSection'
import LogSection from '../SharedComponents/LogSection'
import {getRandomInt, createArray, clone} from '../SharedComponents/SharedElements'

const defaultState = {
  4:0,
  6:0,
  8:0,
  10:0,
  12:0,
  20:0
}

export default class AdvancedPage extends React.Component {
  constructor() {
    super()
    this.state = {
      values: defaultState,
      log: [],
      searchText: "",
    }
    this.updateValues = this.updateValues.bind(this)
    this.generateValues = this.generateValues.bind(this)
    this.clearValues = this.clearValues.bind(this)
    this.clearLog = this.clearLog.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }


  updateValues(key) {
    return (e) => {
      var values = clone(this.state.values)
      values[key] = e

      const keys = Object.keys(values).filter(key => values[key] > 0).sort((a, b) => (a-b))
      const diceStrings = keys.map(key => values[key].toString() + "d" + key.toString())
      const searchText = diceStrings.join(" ")

      this.setState({values: values, searchText: searchText})

    }
  }

  generateValues() {
      let allResults = {}
      for (const key in this.state.values) {
        if (key) {
          allResults[key] = createArray(this.state.values[key], () => getRandomInt(1, key))
        }
      }
      this.setState({
        log: this.state.log.concat([allResults])
      })
    }

  clearValues() {
    this.setState({
      values: defaultState
    })
  }

  clearLog() {
    this.setState({log: []})
  }

  updateSearch(e) {
    const text = e.target.value
    this.setState({searchText: text})
    this.validateInput(text)
  }

  validateInput(text) {
    const searchRegExp = /[0-9]{0,2}d[0-9]{1,3}/ig
    const matches = text.match(searchRegExp)
    let values = clone(defaultState)
    if (matches) {
      for (var index in matches) {
        let result = matches[index].toLowerCase()
        if (result[0] == "d") {result = "1" + result}
        var [number, sides] = result.split("d")
        values[parseInt(sides)] = parseInt(number)
      }
      this.setState({values: values})
    } else {
      this.setState({values: defaultState})
    }
  }

  render() {
    return (
      <div id="dicePage">
        <div className="rounded-block">
          <SelectorSection
            values={this.state.values}
            updateValues={this.updateValues}
            generateValues={this.generateValues}
            clearValues={this.clearValues}
            searchText={this.state.searchText}
            updateSearch={this.updateSearch}
            validationState={this.state.validationState}
          />
        </div>
        <div className="rounded-block">
          <LogSection
            log={this.state.log}
            clearLog={this.clearLog}
          />
        </div>
      </div>
    )
  }
}

      