'use strict'

import React from 'react'
import { Link, withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Layout extends React.Component {
  constructor () {
    super()
    this.state = {expanded: true}
    this.toggleExpand = this.toggleExpand.bind(this)
    this.navigateToHome = this.navigateToHome.bind(this)
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  navigateToHome() {
    this.props.router.push("/")
    this.toggleExpand()
  }

  render() {
    var currentLocation = this.props.location.pathname
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <DrawerSection expanded={this.state.expanded}
                         toggleExpand={this.toggleExpand}
                         navigateToHome={this.navigateToHome}/>

          <div className="app-content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

//          <AppBar title={getAppTitle(currentLocation)}
//                  onLeftIconButtonTouchTap={this.toggleExpand}/>
//     <AppBar title="DiceRoll.Online"
//            onLeftIconButtonTouchTap={props.toggleExpand}
//            onTitleTouchTap={props.navigateToHome}/>


const DrawerSection = props => (
  <Drawer docked={false}
          onRequestChange={props.toggleExpand}
          open={props.expanded}>
    <MenuItem containerElement={<Link to="/coin"/>}
              onTouchTap={props.toggleExpand}>
      Coin Flip
    </MenuItem>
    <MenuItem containerElement={<Link to="/dice"/>}
              onTouchTap={props.toggleExpand}>
      Dice Roll
    </MenuItem>
  </Drawer>
)

// <MenuItem containerElement={<Link to="/advanced"/>}
//              onTouchTap={props.toggleExpand}
//              disabled={true}>
//      Advanced Dice *WIP*
// </MenuItem>

const getAppTitle = route => {
  switch(route) {
    case "/coin": return "Coin Flip"
    case "/dice": case "/": return "Dice Roll"
    case "/advanced": return "Advanced Dice *WIP*"
  }
}

const LayoutR = withRouter(Layout)

export default LayoutR