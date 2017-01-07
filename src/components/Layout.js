'use strict'

import React from 'react'
import { Link, withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap'


const Layout = ({children}) => (
  <div className="app-container">
    <NavbarSection/>
    <div className="home">
      {children}
    </div>
  </div>
)


const NavbarSection = () => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">DiceRoll.Online</Link>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/coin">
          <NavItem eventKey={1}>Coin</NavItem>
        </LinkContainer>
        <LinkContainer to="/dice">
          <NavItem eventKey={2}>Dice</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const LayoutR = withRouter(Layout)

export default LayoutR

        // <NavDropdown eventKey={2} title="Dice" id="dice-nav-dropdown">
        //   <LinkContainer to="/dice">
        //     <MenuItem eventKey={2.1}>Simple</MenuItem>
        //   </LinkContainer>
//        </NavDropdown>

// <LinkContainer to="/advanced">
//   <MenuItem eventKey={2.2} disabled={true}>Advanced</MenuItem>
// </LinkContainer>