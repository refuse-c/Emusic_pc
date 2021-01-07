/*
 * @Author: REFUSE_C
 * @Date: 2021-01-04 17:04:49
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-04 17:10:02
 * @Description: 节流 
 */
throttle = fn => {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}


// function throtte(func, time) {
//   let activeTime = 0;
//   return () => {
//     const current = Date.now();
//     if (current - activeTime > time) {
//       func.apply(this, arguments);
//       activeTime = Date.now();
//     }
//   }
// }