'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'

import Layout from './components/Layout'
import Rules from './components/Rules'
import About from './components/About'
import ChampionSelect from './components/ChampionProfile'
import ChampionProfile from './components/ChampionProfile'
import NotFound from './components/NotFound'


const App = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Rules}/>
      <Route path="/rules" component={Rules}/>
      <Route path="/brave/:id" component={ChampionProfile}/>
      <Route path='/about' component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)

ReactDOM.render(App, document.getElementById('main'))