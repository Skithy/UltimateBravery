'use strict'

import React from 'react'
import {Card, CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'


export default class OutputLog extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {expanded: false}
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
    console.log(this.state.expanded)
  }

  render() {
    const rows = this.props.results.map((result, index) => <OutputRow result={result} key={index}/>)
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.toggleExpand} style={{margin:10}}>
        <Subheader>Output Log</Subheader>
        <CardText expandable={true}>
          {rows}
        </CardText>
        <CardText>
          {this.props.results.length > 0 ? <OutputRow result={this.props.results[this.props.results.length - 1]}/> : "Empty Log"}
        </CardText>
        <CardActions>
          <FlatButton label={this.state.expanded ? "Hide Log" : "Show Log"} onTouchTap={this.toggleExpand} />
          <FlatButton label="Clear Log" onTouchTap={this.props.clearLog} />
        </CardActions>
      </Card>
    )
  }
}

const OutputRow = props => {
  const rows = props.result.map((line, index) =>
    (line.length > 0 ? <OutputLine line={line} key={index} index={index}/> : null)
  )
  return(
    <Paper style={{margin:10}}>
      {rows}
    </Paper>
  )
}

const OutputLine = props => (
  <p>
    <i className={"mdi mdi-" + getDiceIcon(props.index) + " mdi-24px"}/> : {props.line.join(" ")}
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