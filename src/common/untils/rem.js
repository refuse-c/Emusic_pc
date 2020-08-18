/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:56:07
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-18 19:56:10
 * @Description: 
 */
function resetWidth() {
  var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
  document.documentElement.style.fontSize = baseWidth / 375 * 100 + 'px'
  console.log(baseWidth / 375 * 100)
}
resetWidth();
window.addEventListener('resize', function () {
  resetWidth();
})     