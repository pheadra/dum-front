import { createReducer } from 'redux-immutablejs'

import { fromJS } from 'immutable'
import { push } from 'react-router-redux'

import { setAuthToken } from '../../utils/authUtil'
import { fetchGetNoToken, fetchGet, fetchPost } from '../../utils/fetchUtils'
import keyMirror from 'fbjs/lib/keyMirror'
import debug from 'debug'
const log = debug('application:userReducer')

import storage from '../../utils/storage'

//constants
const User = keyMirror({
  // USER
  USER_LOGIN_SUCCESS: null,
  USER_LOGINFAIL: null,
  USER_LOGOUT: null,
  USER_DSP_JOIN: null,
  USER_CLEAR_STATE: null,
  USER_WITHDRAW: null,
  USER_CHANGE_NICKNAME: null,
  JOIN_CLEAR_STATE: null,
  JOIN_FAIL: null,
  JOIN_SUCCESS: null,
  GET_INVITE_LIST : null,
  GET_PHONE_NUMBER: null
})

// Initial routing state
const initialState = fromJS({
  userinfo: null,
  isSignedIn: false,
  inviteList: [],
  phoneNumber: ''
})

// reducer
export default createReducer(initialState, {
  [User.USER_LOGIN_SUCCESS]: state => state.merge({ isSignedIn: true }),

  [User.JOIN_SUCCESS]: state => state.merge({ isSignedIn: true }),

  [User.USER_CLEAR_STATE]: state => state.merge(initialState),

  [User.USER_LOGOUT]: state => state.merge(initialState),

  [User.GET_INVITE_LIST]: (state, { list }) => state.set('inviteList', fromJS(list || [])),

  [User.GET_PHONE_NUMBER]: (state, { phoneNumber }) => state.set('phoneNumber', phoneNumber)
})

// actions
export function UserLogin(token) {
  return { type: User.USER_LOGIN_SUCCESS, token }
}

export function JoinSuccess(token) {
  return { type: User.JOIN_SUCCESS, token }
}

export function UserLogout() {
  return { type: User.USER_LOGOUT }
}

function getInviteList(list) {
  return { type: User.GET_INVITE_LIST, list }
}

function getPhoneNumber(phoneNumber) {
  return { type: User.GET_PHONE_NUMBER, phoneNumber }
}

export function AcceptInvitation(id) {
  return dispatch => {
    return fetchPost(`/adAccounts/${id}/acceptInvitation`)
      .then(response => {

      })
  }
}

export function declineInvitation(id) {
  return dispatch => {
    return fetchPost(`/adAccounts/${id}/declineInvitation`)
      .then(response => {

      })
  }
}

export function fetchInviteList() {
  return dispatch => {
    return fetchGet('/dspAccounts/invitations')
      .then(response => {
        // 초대항목이 하나라도 있으면 invite 페이지로 이동
        if(response.data.length > 0) {
          dispatch(getInviteList(response.data))
          dispatch(push('invite'))
        } else {
          dispatch(push('dashboard'))
        }
      }).catch( error => {
        // error ???
        dispatch(push('adaccount'))
      })
  }
}

/// TODO : API Gateway로 하면 또 달라지겠지
export function AdvertiseLogin() {
  return dispatch => {
    return fetchGetNoToken('/authentication/login')
      .then(response => {
        log(response)

        const token = response.request.responseText
        setAuthToken(token)
        dispatch(UserLogin(token))
        dispatch(fetchInviteList())

        return response
      }).catch(error => {
        dispatch(push('/join'))
      })
  }
}

export function JoinDspAccount(dspAccount) {
  return dispatch => {
    return fetchPost('/dspAccounts', dspAccount)
      .then(response => {
        dispatch(push('adaccount'))
      })
  }
}


export function fetchPhoneNumber() {
  return dispatch => {
    return fetchGet('/dspAccounts/phoneNumber')
      .then(response => {
        const phoneNumber = response.request.responseText
        dispatch(getPhoneNumber(phoneNumber))
      })
  }
}
