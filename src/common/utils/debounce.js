/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:55:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-26 04:57:37
 * @Description: 防抖
 */
let timeout = null
const debounce = (cb, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(() => {
    timeout = null
    cb && cb()
  }, wait);
}
module.exports = debounce;