'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import injectTapEventPlugin from 'react-tap-event-plugin'

const App = () => (
    <AppRoutes />
)

window.onload = () => {
  injectTapEventPlugin()
  ReactDOM.render(<App/>, document.getElementById('main'))
}