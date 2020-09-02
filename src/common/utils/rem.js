/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:56:07
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 19:47:42
 * @Description: 
 */
function resetWidth() {
  var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
  document.documentElement.style.fontSize = baseWidth / 20 + 'px'
  // console.log(baseWidth / 20)
}
resetWidth();
window.addEventListener('resize', function () {
  resetWidth();
})     