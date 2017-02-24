import { combineReducers } from 'redux-immutablejs'

import user from './common/user'
import popup from './common/popup'
import routing from './common/route'

const rootReducer = combineReducers({
  user,
  popup,
  routing
})

export default rootReducer
