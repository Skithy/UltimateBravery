'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AppRoutes />
  </MuiThemeProvider>
)

window.onload = () => {
  injectTapEventPlugin()
  ReactDOM.render(<App/>, document.getElementById('main'))
}