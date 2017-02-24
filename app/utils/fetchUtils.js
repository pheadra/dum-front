import { getAuthToken } from './authUtil'

const API_URL = '${domain}'
import axios from 'axios'

//axios global config
axios.defaults.baseURL = API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache'] = 'no-cache'
axios.defaults.withCredentials = true


/**
 * (private method) Object의 null값 제거 및 string의 trim을 통해 서버로 보낼 데이터의 전처리 과정을 진행합니다.
 * @param obj {object}
 * @returns {object}
 */
function _querify(obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key]

    // 추가할 value가 undefined, null 이면 삭제
    if (value == null || value == undefined) {
      delete obj[key]
      return
    }
    // 빈 스트링이나 빈 배열도 삭제
    if (isFinite(value.length) && value.length == 0) {
      delete obj[key]
      return
    }
    // 추가할 value가 string이면 trim
    if (typeof value == 'string') {
      obj[key] = value.replace(/^\s+|\s+$/g, '')
    }
  })
  return obj
}

/**
 * Object를 querystring으로 변형합니다.
 * 주의 - 복잡한 Object의 toString은 [object Obejct]로 전달될 수 있습니다.
 * @param params {object}
 * @returns {string}
 */

function queryString(params) {
  let query = []
  params = _querify(params)
  for (let key in params) {
    let value = params[key]
    query.push(`${key}=${encodeURIComponent(value)}`)
  }
  return query.join('&')
}


/**
 * json 데이터를 보내는 fetch 요청들의 wrapper 입니다.
 */
function fetchGetNoToken(url) {
  return axios.get(url, {
    headers : {
      'Accept' : 'text/plain',
      'Content-Type': 'text/plain'
    },
    responseType:'text'
  })
}

/// TODO : luke - API ErrorHandling 나중에 하자
function fetchMethod(url, method, body) {
  return axios(url, {
    method: method.toLowerCase(),
    url: url,
    data: body,
    headers : {
      'x-customtoken': getAuthToken()
    }
  }).catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
    } else {
      if(error.response) {
        if(error.response.status === 401) {
          console.log('authorized redirect')
          document.location.href = '/login'
        } else {
          console.log(error.response.data)
          console.log(error.response.status)
        }
      }
    }
  })
}

/**
 * fetchGet
 *    - body를 인자로 받지 않습니다.
 */
function fetchGet(url) {
  return fetchMethod(url, 'get')
}

/**
 * fetchPost / fetchPut / fetchDelete
 *    - body를 인자로 받고, 이를 stringify 하여 fetch에 넘겨줍니다.
 */
function fetchPost(url, body) {
  return fetchMethod(url, 'post', body)
}
function fetchPut(url, body) {
  return fetchMethod(url, 'put', body)
}
function fetchDelete(url, body) {
  return fetchMethod(url, 'delete', body)
}

/**
 * Post 요청 중 파일 업로드 등에 사용되는 formData 요청을 실행합니다.
 * (fetchPost는 json 데이터 post 시에만 사용됩니다)
 */
function fetchPostForm(url, formData, onProgress) {
  return axios(url, formData, {
    onUploadProgress: createProgressClosure(onProgress)
  })
}

/**
 *
 * @param onProgress {function} - 파일 업로드시에 프로그래스값을 받는 콜백
 * @returns {function(*)}
 */
const createProgressClosure = onProgress => {
  if (!onProgress) return

  const minProgress = 0.001
  let startTime = null

  return progressEvent => {
    const { timeStamp, loaded, total } = progressEvent
    if (startTime == null) {
      startTime = timeStamp
    }
    const progress = Math.max(loaded / total, minProgress)
    const expectedRemainTime = (timeStamp - startTime) * ((1 / progress) - 1)
    onProgress(progress, expectedRemainTime)
  }
}



export { fetchGetNoToken, fetchGet, fetchPost, fetchPut, fetchDelete, fetchPostForm, queryString }
