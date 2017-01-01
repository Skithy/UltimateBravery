'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import NumericInput from 'react-numeric-input'


const DiceSection = ({dice, updateValues, generateValues}) => (
  <Paper className="view-card">
    <div id="options">
      <span>Dice: </span>
      <NumericInput
          min={1} max={9}
          value={dice.length}
          onChange={updateValues}
          maxLength={1}
      />
    </div>

    <DisplayDice dice={dice}/>

    <div id="buttons">
      <RaisedButton label="Roll Dice" primary={true} onClick={generateValues}/>
    </div>
  </Paper>
)


const DisplayDice = ({dice}) => (
  <div style={{display:"flex", flexWrap:"wrap"}}>
    {dice.map((value, index) =>
      <FontIcon className={"mdi mdi-dice-" + value} style={{fontSize:"10em", margin:"auto", display:"flex"}} key={index}/>
    )}
  </div>
)

export default DiceSection