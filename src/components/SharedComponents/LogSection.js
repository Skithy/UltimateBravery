'use strict'

import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import {getLastItem} from '../SharedComponents/SharedElements'


export default class LogSection extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {expanded: false}
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  componentDidUpdate() {
    const obj = this.refs.scroll
    obj.scrollTop = obj.scrollHeight
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const rows = this.props.log.map((results, index) =>
      <LogRow results={results} key={index}
        primary={index == this.props.log.length - 1 ? true : false}
      />
    )

    return (
      <div>
        <h2>Results</h2>

        <div id="log" className="display display-scroll" ref="scroll">
            {this.props.log.length > 0 ? 
              (this.state.expanded ? rows :
                <LogRow results={getLastItem(this.props.log)} primary={true}/>
              ) : <p>Empty</p>
            }
        </div>

        <div id="buttons">
          <Button bsStyle="primary" style={{marginRight:20}} onClick={this.toggleExpand}>{this.state.expanded ? "Hide Log" : "Show Log"}</Button>
          <Button bsStyle="primary" onClick={this.props.clearLog}>Clear Log</Button>
        </div>
      </div>
    )
  }
}

const LogRow = ({results, primary}) => {
  const keys = Object.keys(results).sort((a, b) => (a-b))
  const lines = keys.map((key, index) =>
    (results[key].length > 0 ?
      <LogLine sides={key} values={results[key]} key={index}/> : null
    )
  )
  const primaryTheme = {backgroundColor:"white"}
  const normalTheme = {backgroundColor:"red"}
  return(
    <div style={primary ? primaryTheme : normalTheme}>
      {lines}
    </div>
  )
}

const LogLine = ({sides, values}) => (
  <p>
    {values.length + "d" + sides + ": " + values.join(" + ") +
     " = " + values.reduce((a, b) => a + b, 0)}
  </p>
)