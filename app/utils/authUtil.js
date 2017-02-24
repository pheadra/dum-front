import storage from './storage.js'
import debug from 'debug'
const log = debug('application:authUtils')

/***
 * 권한이 없을때 보내는 기본 URL
 * @param url
 */
export function denyPermission(url = '/') {
  window.location.replace(url)
}

/// TODO : luke 이부분은 나중에 잘 정리해보자!

let authToken = ''
export function getAuthToken() {
  if(authToken === '') {
    authToken = storage.getItem('authToken')
  }
  return authToken
}

export function setAuthToken(token) {
  storage.setItem('authToken', token)
  authToken = token
}
