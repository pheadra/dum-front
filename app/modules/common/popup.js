import { createReducer } from 'redux-immutablejs'
import { Map } from 'immutable'
import KeyMirror from 'fbjs/lib/keyMirror'

// Constants
const Popup = KeyMirror({
  // POPUP
  OPEN_POPUP: null,
  CLOSE_POPUP: null,
  CLOSE_ALL_POPUP: null
})

export const POPUP_KEY = KeyMirror({
  SIMPLE_POPUP: null,
  BASIC_POPUP: null,

  ADDRESS_SEARCH: null,
  KAKAO_PAYMENT: null,
  /* -- Dashboard -- */
  DASHBOARD_SETTING: null,
  EXCEPT_PLACEMENT: null,
  TARGET_DETAIL: null,
  ADCREATIVE_PREVIEW: null,
  ADCREATIVE_HISTORY: null,
  /* -- AdGroup -- */
  SAVE_TARGET_MANAGER: null,
  LOAD_TARGET_MANAGER: null,
  LOAD_AUDIENCE_TARGETING: null,

  /* -- Settings -- */
  // account management
  MODIFY_COMPANY_INFO: null,
  // modification history detail
  MODIFICATION_HISTORY_DETAIL: null,
  // payment card management
  ADD_PAYMENT_CARD: null,
  MODIFY_DAILY_BUDGET_LIMIT: null,
  BILLING_NOW: null, // 삭제예정
  // cash management
  CASH_CHARGE: null,
  REFUND_GUIDE: null,
  REQUEST_REFUND: null,
  REFOUND_HISTORY: null,
  MODIFY_REFUND_ACCOUNT: null,
  // review management
  DOCUMENT_UPLOAD: null,
  DOCUMENT_MODIFICATION: null
})

// initialState
const initialState = Map({})

// Reducer
export default createReducer(initialState, {
  [Popup.OPEN_POPUP]: (state, { result }) => state.set(result.key, result.props || {}),

  [Popup.CLOSE_POPUP]: (state, { result }) => state.delete(result.key),

  [Popup.CLOSE_ALL_POPUP]: state => state.clear()
})

// Action
/***
 * 팝업을 열때 호출하는 액션
 * @param key {*} - 팝업 키(팝업 아이디)
 * @param props {Object} - 팝업으로 넘기고 싶은 데이터
 * @returns {{type: *, result: {key: *, props: {}}}}
 */
export function openPopup(key, props = {}) {
  return {
    type: Popup.OPEN_POPUP,
    result: { key, props }
  }
}

/***
 *
 * @param key {*} - POPUP_KEY.SIMPLE_POPUP or POPUP_KEY.BASIC_POPUP}
 * @param proxyProps {Object}
 * @returns {{type: *, result: {key: *, props: {popupProxy: *}}}}
 */
export function openPopupByProxy(key, proxyProps) {
  return {
    type: Popup.OPEN_POPUP,
    result: { key, props: { 'popupProxy': proxyProps } }
  }
}

/***
 * 팝업을 닫을때 호출하는 액션
 * @param key {POPUP_KEY} - 팝업 키(팝업 아이디)
 * @returns {{type: *, result: {key: *}}}
 */
export function closePopup(key) {
  return {
    type: Popup.CLOSE_POPUP,
    result: { key }
  }
}

/***
 * 열려있는 모든 팝업을 닫는 액션
 * @returns {{type: *}}
 */
export function closeALLPopup() {
  return {
    type: Popup.CLOSE_ALL_POPUP
  }
}
