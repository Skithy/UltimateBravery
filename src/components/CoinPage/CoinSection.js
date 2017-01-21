'use strict'

import React from 'react'
import Button from 'react-bootstrap/lib/Button'

export default class CoinSection extends React.Component{
  constructor() {
    super()
    this.state = {rotation: 0}
    this.rotate = this.rotate.bind(this)
  }

  rotate() {
    this.props.flipCoin()
    let rotationValue = this.state.rotation + 540
    if ((this.props.coin && rotationValue % 360 == 180) || (!this.props.coin && rotationValue % 360 == 0)) {
      rotationValue += 180
    }
    this.setState({rotation: rotationValue})
  }

  render() {
    return(
      <div>
        <div id="description">
          <h1>Coin Flip</h1>
          <p>Click on the coin or the button to flip the coin.</p>
        </div>
        <div className="display display-coin">
          <div className="coin-container" style={{transform: "rotateY(" + this.state.rotation + "deg)"}} onClick={this.rotate}>
            <div className="coin coin-heads"><h1>Heads</h1></div>
            <div className="coin coin-tails"><h1>Tails</h1></div>
          </div>
        </div>
        <div id="buttons">
          <Button bsStyle="primary" onClick={this.rotate}>Flip Coin</Button>
        </div>
      </div>
    )
  }
}

const diceClass = coin => "coin coin-" + (coin ? "heads" : "tails")
const diceText = coin => coin ? "HEADS" : "TAILS"