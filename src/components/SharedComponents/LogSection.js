'use strict'

import React from 'react'
import {Card, CardActions, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'

import {getLastItem} from '../SharedComponents/SharedElements'

export default class LogSection extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {expanded: false}
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const rows = this.props.log.map((results, index) => <LogRow results={results} key={index}/>)
    return (
      <Paper className="view-card">
        <Subheader>Results</Subheader>

        <div id="log" style={{padding:10}}>
            {this.props.log.length > 0 ?
              (this.state.expanded ?
                rows : <LogRow primary={true} results={getLastItem(this.props.log)}/>
              ) : null
            }
        </div>

        <div id="buttons" style={{padding:10}}>
          <FlatButton label={this.state.expanded ? "Hide Log" : "Show Log"} onTouchTap={this.toggleExpand} />
          <FlatButton label="Clear Log" onTouchTap={this.props.clearLog} />
        </div>
      </Paper>
    )
  }
}

const LogRow = props => {
  const keys = Object.keys(props.results).sort((a, b) => (a-b))
  const lines = keys.map((key, index) =>
    (props.results[key].length > 0 ? <LogLine sides={key} values={props.results[key]} key={index}/> : null)
  )
  return(
    <Paper style={{margin:10}}>
      {lines}
    </Paper>
  )
}

const LogLine = props => (
  <p>
    {props.values.length}d{props.sides}: {props.values.join(" + ")} = {props.values.reduce((a, b) => a + b, 0)}
  </p>
)

const getDiceIcon = index => {
  switch(index) {
    case 0: return "coin"
    case 1: return "dice-d4"
    case 2: return "dice-d6"
    case 3: return "dice-d8"
    case 4: return "dice-d20"
  }
}
