'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => (
  <MuiThemeProvider>
    <AppRoutes />
  </MuiThemeProvider>
)

injectTapEventPlugin()
ReactDOM.render(<App/>, document.getElementById('main'))
