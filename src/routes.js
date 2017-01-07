'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import LayoutR from './components/Layout'
import CoinPage from './components/CoinPage/CoinPage'
import DicePage from './components/DicePage/DicePage'
import AdvancedPage from './components/AdvancedPage/AdvancedPage'
import NotFoundPage from './components/NotFoundPage'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

const routes = (
  <Route path="/" component={LayoutR}>
    <IndexRoute component={DicePage}/>
    <Route path="/coin" component={CoinPage}/>
    <Route path="/dice" component={DicePage}/>  
    <Route path="/advanced" component={AdvancedPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)

window.onload = () => {
  injectTapEventPlugin()
  ReactDOM.render(<App/>, document.getElementById('main'))
}

export default routes
