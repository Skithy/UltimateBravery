'use strict'

import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap'

import ChampionSelect from './ChampionSelect'

const Layout = ({children}) => (
  <div className="app-container">
    <NavbarSection/>
    <div className="home">
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <div className="display">
              {children}
            </div>
          </Col>
          <Col xs={12} md={4}>
            <ChampionSelect/>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
)

const NavbarSection = () => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Ultimate Bravery</Link>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to="/Rules">
          <NavItem>Rules</NavItem>
        </LinkContainer>
        <LinkContainer to="/About">
          <NavItem>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>

  </Navbar>
)

export default Layout

/*
<Navbar.Collapse>
  <Nav>
    <LinkContainer to="/">
      <NavItem eventKey={1}>Coin</NavItem>
    </LinkContainer>
    <NavDropdown eventKey={2} title="Dice" id="dice-nav-dropdown">
      <LinkContainer to="/">
        <MenuItem eventKey={2.1}>Simple</MenuItem>
      </LinkContainer>
      <LinkContainer to="/">
        <MenuItem eventKey={2.2}>Advanced</MenuItem>
      </LinkContainer>
    </NavDropdown>
  </Nav>
</Navbar.Collapse>
*/