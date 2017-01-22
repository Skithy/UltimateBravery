'use strict'

import React from 'react'
// import Paper from 'material-ui/Paper'
// import Divider from 'material-ui/Divider'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import NumericInput from 'react-numeric-input'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'

const SelectorSection = ({values, updateValues, generateValues, clearValues, searchText, updateSearch, validationState}) => {
  return(
    <div>
      <h1>Advanced Dice Roll (DnD)</h1>
      <form>
        <FormGroup
          controlId="diceForm"
        >
          <FormControl
            type="text"
            value={searchText}
            placeholder="Enter dice codes... (2d6 3d12)"
            onChange={updateSearch}
          />
         
          {Object.keys(values).map((sides, index) =>
            <DiceSelector 
              key={index}
              sides={sides}
              value={values[sides]}
              updateValues={updateValues}            
            />
          )}
        </FormGroup>
      </form>
      <div id="buttons">
        <Button
          bsStyle="primary"
          style={{marginRight:20}}
          onClick={generateValues}
        >Roll Dice
        </Button>
        <Button
          onClick={clearValues}
        >Clear Dice
        </Button>
      </div>
    </div>
  )
}


const DiceSelector = ({sides, value, updateValues}) => (
  <div>
    <h2 style={{display:"inline", marginRight:10}}>{sides + ": "}</h2>
    <NumericInput
      min={0} max={99} value={value}
      onChange={updateValues(sides)}
    />
  </div>
)

export default SelectorSection
