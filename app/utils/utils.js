
/***
 * 동적으로 스크립트 로딩하는 함수
 * @param {string} src - library path
 * @param {function} callback - onload callback function
 */
export function loadScript(src, callback) {
  let s, r, t
  r = false
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true
      callback()
    }
  }
  t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}
