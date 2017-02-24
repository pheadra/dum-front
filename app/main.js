import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import debug from 'debug'
const log = debug('application:bootstrap')
// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*')
} else {
  debug.enable('-application:*')
}

injectTapEventPlugin();
log('mounting react-router')
import Router from './router'

ReactDOM.render( <Router />, document.getElementById('app'))

