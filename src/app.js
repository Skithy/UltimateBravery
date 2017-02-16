'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'

import Layout from './components/Layout'
import Rules from './components/Rules'
import ChampionProfile from './components/ChampionProfile'
import NotFoundPage from './components/NotFound'

import updateDB from './updateDB'

updateDB()

const App = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Rules}/>
      <Route path="/rules" component={Rules}/>
      <Route path="/brave/:id" component={ChampionProfile}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
)

ReactDOM.render(App, document.getElementById('main'))

if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(App, document.getElementById('main'))
  })
}