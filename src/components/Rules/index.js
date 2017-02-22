'use strict'

import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

const AboutUB = ({}) => (
  <div>
      <Row>
        <Col xs={6} md={6}>
          <div className="rightAlign">
            <h1 className="ultimate">ULTIMATE</h1>
            <p>Random Champion</p>
            <p>Random Build</p>
            <p>Total Braveness</p>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div>
            <h1 className="omega">OMEGA</h1>
            <p>Random Champion</p>
            <p>Thematic Build</p>
            <p>Completely Fun</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="centerAlign" style={{"padding":15}}>
            <h1>Rules</h1>
            <h4>1. EMBRACE YOUR CHAMPION</h4>
            <p>Once your champion has been chosen, there is no going back. Only glory awaits.</p>
            <h4>2. USE YOUR SUMMONERS</h4>
            <p>Utilise your summoners as best as you can. They are the key to your victory.</p>
            <h4>3. MAX YOUR MAIN SPELL</h4>
            <p>Always aim to max out your assigned spell. Your ultimate can wait.</p>
            <h4>4. OBEY THE SYSTEM</h4>
            <p>Build order is law. Boots first.</p>
            <h4>5. NO WARDS</h4>
            <p>Money spent on wards is money wasted. You are your own light in the darkness.</p>
            <h4>6. PROVE YOURSELF</h4>
            <p>Reveal your bravery link at the start of the game. Show off your braveness.</p>
            <h4>(<i>FOR THE EXTRA BRAVE</i>)</h4>
            <h4>7. NO RECALL</h4>
            <p>A true warrior never backs, even in death.</p>
            
          </div>
        </Col>
      </Row>
  </div>
)

export default AboutUB