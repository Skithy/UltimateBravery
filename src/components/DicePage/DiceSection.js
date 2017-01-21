'use strict'

import React from 'react'
import NumericInput from 'react-numeric-input'
import Button from 'react-bootstrap/lib/Button'

export default class DiceSection extends React.Component {
  constructor() {
    super()
    this.state = {rotation: 0}
    this.rotate = this.rotate.bind(this)
  }

  rotate() {
    this.setState(
      {rotation: this.state.rotation + 360},
      this.props.generateValues
    )
  }

  render() {
    return(
      <div>
        <h1>Dice Roll</h1>
        <div id="decription" style={{marginBottom:15}}>
          <p style={{display:"inline-block", marginRight:20}}>Number of dice: </p>
          <NumericInput
              min={1} max={9}
              value={this.props.dice.length}
              onChange={this.props.updateValues}
              maxLength={1}
              className="form-control"
          />
        </div>

        <div className="display display-dice">
          {this.props.dice.map((value, index) =>
            <span key={index}
              className={"mdi mdi-dice-" + value}
              style={{fontSize:"calc(7vh + 7vw)", margin:"auto", transform:"rotate(" + this.state.rotation + "deg)"}}
            />
          )}
        </div>

        <div id="buttons">
          <Button bsStyle="primary" onClick={this.rotate}>Roll Dice</Button>
        </div>

      </div>
    )
  }
}

const getDiceSize = num => {
  switch(num) {
    case 1: case 2: case 3: case 4: return "calc(10px + 12vw)"
    case 5: case 6: case 7: case 8: return "calc(10px + 12vw)"
    case 9: return "calc(10px + 10vw)"
  }
}
