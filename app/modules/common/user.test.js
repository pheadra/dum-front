/**
 * Created by KAKAO on 9/18/16.
 */

const { describe, it } = global

import { expect } from 'chai'
import userReducer from './user'
import * as UserActions from './user'
import Immutable from 'immutable'

/**
 * 1. initialState and action parameter
 * 2. action creator
 * 3. reducer
 * 4. expect
 */
describe('User Reducer', () => {
  it('should return the initial state', () => {
    //act
    const newState = userReducer(undefined, {})
    //assert
    expect(newState.toJS().isSignedIn).to.equal(false)
  })

  it('User Login Action', () => {
    // arrange
    const init = Immutable.Map({ userinfo: null, isSignedIn: false })
    const token = 'token'

    // act
    const action = UserActions.UserLogin(token)

    // act
    const newState = userReducer(init, action)
    // assert
    expect(newState.toJS().isSignedIn).to.equal(true)
  })

  it('should handle join success Action', () => {
    // arrange
    const init = Immutable.Map({ userinfo: null, isSignedIn: false })
    const token = 'token'

    // act
    const action = UserActions.JoinSuccess(token)

    // act
    const newState = userReducer(init, action)
    // assert
    expect(newState.toJS().isSignedIn).to.equal(true)
  })

  it('should handle user logout Action', () => {
    // arrange
    const init = Immutable.Map({ userinfo: null, isSignedIn: true })

    // act
    const action = UserActions.UserLogout()

    // act
    const newState = userReducer(init, action)
    // assert
    expect(newState.toJS().isSignedIn).to.equal(false)
  })
})
