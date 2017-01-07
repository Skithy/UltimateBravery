'use strict'

import React from 'react'
import Button from 'react-bootstrap/lib/Button'

const CoinSection = ({coin, flipCoin}) => (
  <div>
    <div id="description">
      <h1>Coin Flip</h1>
      <p>Click on the coin or button to flip the coin.</p>
    </div>
    <div className="display display-coin">
      <div className={diceClass(coin)} onClick={flipCoin}>
        <h1>{diceText(coin)}</h1>
      </div>
    </div>
    <div id="buttons">
      <Button bsStyle="primary" onClick={flipCoin}>Flip Coin</Button>
    </div>
  </div>
)

export default CoinSection

      // <Transition
      //   timeout={1000}
      //   enteredClassName='in'
      //   enteringClassName='in'
      // >

const diceClass = coin => "coin coin-" + (coin ? "heads" : "tails")
const diceText = coin => coin ? "HEADS" : "TAILS"