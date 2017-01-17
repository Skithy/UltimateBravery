'use strict'

import React from 'react'
import CoinSection from './CoinSection'
import { getRandomInt } from '../SharedComponents/SharedElements'

export default class CoinPage extends React.Component {
  constructor() {
    super()
    this.state = {coin: true}
  }

  flipCoin = () => {
    this.setState({coin: getRandomInt(0, 1) == 0})
  }

  render() {
    return (
      <div id="coinPage">
        <div className="rounded-block">
          <CoinSection
            coin={this.state.coin}
            flipCoin={this.flipCoin}
          />
        </div>
      </div>  
    )
  }
}
