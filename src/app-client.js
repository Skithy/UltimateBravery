'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {cyan500, purple500, green500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: purple500,
    primary3Color: green500,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: req.headers['user-agent'],
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppRoutes />
  </MuiThemeProvider>
)

window.onload = () => {
  injectTapEventPlugin()
  ReactDOM.render(<App/>, document.getElementById('main'))
}