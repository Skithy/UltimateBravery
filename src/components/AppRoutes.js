'use strict';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({userAgent: navigator.userAgent})}>
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      </MuiThemeProvider>
    );
  }
}
