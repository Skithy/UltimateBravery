'use strict'

import React from 'react'
import {Card, CardActions, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'

import {getLastItem} from '../SharedComponents/SharedElements'
import {cyan500} from 'material-ui/styles/colors'


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
      <LogRow results={results} key={index} style={{padding:10}}
        primary={index == this.props.log.length - 1 ? true : false}
      />
    )

    return (
      <Paper className="view-card">
        <Subheader>Results</Subheader>

        <div id="log" className="scroll-display" ref="scroll">
            {this.props.log.length > 0 ?
              (this.state.expanded ?
                rows : <LogRow results={getLastItem(this.props.log)}
                         primary={true} style={{padding:10}}
                       />
              ) : null
            }
        </div>

        <div id="buttons">
          <FlatButton label={this.state.expanded ? "Hide Log" : "Show Log"} onTouchTap={this.toggleExpand} />
          <FlatButton label="Clear Log" onTouchTap={this.props.clearLog} />
        </div>
      </Paper>
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
  const primaryTheme = {backgroundColor: cyan500, color: "white", margin:10, padding:10}
  const normalTheme = {margin:10, padding:10}
  return(
    <Paper style={primary ? primaryTheme : normalTheme}>
      {lines}
    </Paper>
  )
}

const LogLine = ({sides, values}) => (
  <p>
    {values.length + "d" + sides + ": " + values.join(" + ") +
     " = " + values.reduce((a, b) => a + b, 0)}
  </p>
)