import React from 'react'
import { applyRouterMiddleware, Router, IndexRoute, Route, browserHistory } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Map } from 'immutable'
import configureStore from './stores/configureStore'

import App from './containers/common/app'
import RequestPage from './containers/common/RequestPage'
import NotFound from './containers/common/NotFound'

const initialState = Map({})
const store = configureStore(initialState)

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS()
  }
})

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} render={applyRouterMiddleware(useScroll())}>
          <Route path="/" component={ App }>
            <IndexRoute component={RequestPage} />
          </Route>

          <Route path="*" component={ NotFound }/>
        </Router>
      </Provider>
    )
  }
}
