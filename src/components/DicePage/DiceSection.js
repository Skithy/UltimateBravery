'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import NumericInput from 'react-numeric-input'


const DiceSection = props => (
  <Paper className="view-card">
    <div id="options" style={{padding:10}}>
      <span>Dice: </span>
      <NumericInput
          min={1} max={9}
          value={props.dice.length}
          onChange={props.updateValues}
          maxLength={1}
      />
    </div>

    <DisplayDice dice={props.dice}/>

    <div id="buttons" style={{padding:10}}>
      <RaisedButton label="Roll Dice" primary={true} onClick={props.generateValues}/>
    </div>
  </Paper>
)


const DisplayDice = props => (
  <div style={{padding: 10, display:"flex", flexWrap:"wrap"}}>
    {props.dice.map((value, index) =>
      <FontIcon className={"mdi mdi-dice-" + value} style={{fontSize:"9em", margin:"auto", display:"flex"}} key={index}/>
    )}
  </div>
)

export default DiceSection