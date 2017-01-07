'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import {cyan500, pink500} from 'material-ui/styles/colors'


const CoinSection = ({coin, flipCoin}) => (
  <Paper className="view-card">
    <Paper className="coin" style={coin ? heads : tails} circle={true}>
      <div>
        {coin ? "Heads" : "Tails"}
      </div>
    </Paper>
    <div id="buttons">
      <RaisedButton label="Flip Coin" primary={true} onClick={flipCoin}/>
    </div>
  </Paper>
)

// Styles
const heads = {
  backgroundColor: cyan500,
  color: "white"
};

const tails = {
  backgroundColor: pink500,
  color: "white"
};


export default CoinSection
