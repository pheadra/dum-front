/*
 * Created by luke.park on 9/11/16.
 * react-router-redux에 routeReducer가 있지만 immutable하지 않기 때문에 redux-immutable로 인해서 재구현
 */

import { createReducer } from 'redux-immutablejs'
import { LOCATION_CHANGE } from 'react-router-redux'
import { fromJS } from 'immutable'

//1. constants

//2. Initial routing state
const initialState = fromJS({ locationBeforeTransitions: null })

//3. reducer
export default createReducer(initialState, {
  [LOCATION_CHANGE] : (state, { payload }) => state.merge({ locationBeforeTransitions: payload })
})

//4. actions
