'use strict'

import React from 'react'
import NumericInput from 'react-numeric-input'
import Button from 'react-bootstrap/lib/Button'

const DiceSection = ({dice, updateValues, generateValues}) => (
  <div>
    <h1>Dice Roll</h1>
    <div id="decription">
      <p style={{display:"inline-block", marginRight:20}}>Number of dice: </p>
      <NumericInput
          min={1} max={9}
          value={dice.length}
          onChange={updateValues}
          maxLength={1}
      />
    </div>

    <div className="display display-dice">
      {dice.map((value, index) =>
        <span key={index}
          className={"mdi mdi-dice-" + value}
          style={{fontSize:"12em", margin:"auto"}}
        />
      )}
    </div>

    <div id="buttons">
      <Button bsStyle="primary" onClick={generateValues}>Roll Dice</Button>
    </div>

  </div>
)

export default DiceSection