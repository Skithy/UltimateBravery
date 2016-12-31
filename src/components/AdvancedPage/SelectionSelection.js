'use strict'

import React from 'react'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Subheader from 'material-ui/Subheader'
import NumericInput from 'react-numeric-input'


export default class SelectionSection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {expanded: false}
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand () {
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.toggleExpand} style={{margin:10}}>
        <CardText expandable={true}>
          <DiceOption type="dice-d4" index={1}
            values={this.props.values}
            updateValue={this.props.updateValue}/>
        </CardText>
        
        <CardText>
          <DiceOption type="dice-d6" index={2}
            values={this.props.values}
            updateValue={this.props.updateValue}/>
        </CardText>
        
        <CardText expandable={true}>
          <DiceOption type="dice-d8" index={3}
            values={this.props.values}
            updateValue={this.props.updateValue}/>
        </CardText>
        
        <CardText expandable={true}>
          <DiceOption type="dice-d20" index={4}
            values={this.props.values}
            updateValue={this.props.updateValue}/>
        </CardText>
        
        <CardActions>
          <FlatButton label={this.state.expanded ? "Show Less" : "Show More"} onTouchTap={this.toggleExpand} />
          <FlatButton label="Clear all" onTouchTap={this.props.clearValues} />
        </CardActions>
      </Card>
    )
  }
}

class DiceOption extends React.Component {
  render () {
    return(
      <form>
        <i className={"mdi mdi-" + this.props.type + " mdi-48px"} />
        <NumericInput
          min={0} max={99} value={this.props.values[this.props.index]}
          onChange={this.props.updateValue(this.props.index)}/>
      </form>
    )
  }
}
