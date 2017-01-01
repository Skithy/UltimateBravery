'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import NumericInput from 'react-numeric-input'
import Subheader from 'material-ui/Subheader'

export default class SelectionSection extends React.Component {
  constructor() {
    super()
    this.updateFields = this.updateFields.bind(this)
  }

  updateFields(e) {
    const keys = Object.keys(this.props.values).sort((a, b) => (a-b))
    const diceStrings = keys.map(key => this.props.values[key].length + "d" + key)
    this.refs.text.value = diceStrings
    console.log(e)
    this.props.updateValues(e)
  }

  render() {
    const keys = Object.keys(this.props.values).sort((a, b) => (a-b))
    const options = keys.map((key,index) =>
      <DiceOption sides={key} values={this.props.values[key]} updateValues={this.updateFields} key={index}/>
    )

    return(
      <Paper className="view-card">
        <div>
          <TextField
            hintText="2d6 d12 ..."
            floatingLabelText="Dice Input"
            fullWidth={true}
            onChange={this.props.validateInput}
            style={{marginTop:0}}
            ref="text"
          />
        </div>

        <Paper>
          {options}
        </Paper>

        <div id="buttons">
          <RaisedButton label="Roll Dice" primary={true} onClick={this.props.generateValues}/>
        </div>
      </Paper>
    )
  }
}

const DiceOption = ({sides, values, updateValues}) => (
  <form>
    {sides}
    <NumericInput
      min={0} max={99} value={values.length}
      onChange={updateValues(sides)}
    />
  </form>
)