'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppRoutes from './components/AppRoutes'
import injectTapEventPlugin from 'react-tap-event-plugin'

const App = () => (
  <MuiThemeProvider>
    <AppRoutes />
  </MuiThemeProvider>
)

window.onload = () => {
  injectTapEventPlugin()
  ReactDOM.render(<App/>, document.getElementById('main'))
}
