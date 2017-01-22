'use strict'

import React from 'react'
import NumericInput from 'react-numeric-input'
import Button from 'react-bootstrap/lib/Button'

export default class DiceSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {animate: true}
    this.rollDice = this.rollDice.bind(this)
  }

  rollDice() {
    this.setState({animate: false}, () => {
      this.setState({animate: true}, () =>
        setTimeout(this.props.generateValues, 400)
      )
    })
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
            <div className="dice-container">
              <span key={index}
                className={"mdi mdi-dice-" + value}
              />
              { this.state.animate ?
                <span key={index + 10}
                  className="mdi mdi-dice-1 temp fade"
                /> : null
              }
              { this.state.animate ?
                <span key={index + 20}
                  className="mdi mdi-dice-4 temp fade"
                /> : null
              }
            </div>
          )}
        </div>

        <div id="buttons">
          <Button bsStyle="primary" onClick={this.rollDice}>Roll Dice</Button>
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
