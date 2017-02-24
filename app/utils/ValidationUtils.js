/**
 * passed -> True
 * failed -> False
 */
function checkNotNull(some) {
  // null, undefined, ""를 체크, 0은 제외
  return !!some || some === 0
}

function checkNonZero(number) {
  return number !== 0
}

function checkEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

function checkPassword(password) {
  const passwordRegex = /[a-zA-Z_0-9@!#$^%&*()+=\-\[\]\\';,\.\/\{}\|":<>\?~`]{9,}/
  return passwordRegex.test(password) && hasSpecialCharacter(password) && !hasWhitespace(password)
}

function checkStringLength(string, min = 2, max = 1000) {
  const trimmed = string.replace(/^\s+|\s+$/gm, '')
  return min <= trimmed.length && trimmed.length <= max
}

function checkNameQuery(nameQuery, preventShort = true, max = 100) {
  const trimmed = nameQuery.replace(/^\s+|\s+$/gm, '')
  return trimmed.length <= max && (preventShort ? trimmed.length !== 1 : true)
}

function checkPhoneNumber(phone) {
  const phoneRegex = /^0([0-9]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/
  return phoneRegex.test(phone)
}

function validateBusinessRegistrationNumber(input) {
  const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/
  return businessNumberRegex.test(input)
}

const hasSpecialCharacter = (input) => /[_@!#$^%&*()+=\-\[\]\\';,\.\/\{}\|":<>\?~`]/.test(input)
const hasWhitespace = (input) => /\s/.test(input)

export {
  checkNotNull,
  checkNonZero,
  checkEmail,
  checkPassword,
  checkPhoneNumber,
  checkStringLength,
  checkNameQuery,
  validateBusinessRegistrationNumber,
  hasSpecialCharacter,
  hasWhitespace
}
