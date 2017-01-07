'use strict'

import React from 'react'
import NumericInput from 'react-numeric-input'
import Button from 'react-bootstrap/lib/Button'

const DiceSection = ({dice, updateValues, generateValues}) => (
  <div>
    <h1>Dice Roll</h1>
    <div id="decription" style={{}}>
      <p style={{display:"inline-block", marginRight:20}}>Number of dice: </p>
      <NumericInput
          min={1} max={9}
          value={dice.length}
          onChange={updateValues}
          maxLength={1}
          className="form-control"
      />
    </div>

    <div className="display display-dice">
      {dice.map((value, index) =>
        <span key={index}
          className={"mdi mdi-dice-" + value}
          style={{fontSize:"calc(7vh + 7vw)", margin:"auto"}}
        />
      )}
    </div>

    <div id="buttons">
      <Button bsStyle="primary" onClick={generateValues}>Roll Dice</Button>
    </div>

  </div>
)

const getDiceSize = num => {
  switch(num) {
    case 1: case 2: case 3: case 4: return "calc(10px + 12vw)"
    case 5: case 6: case 7: case 8: return "calc(10px + 12vw)"
    case 9: return "calc(10px + 10vw)"
  }
}

export default DiceSection