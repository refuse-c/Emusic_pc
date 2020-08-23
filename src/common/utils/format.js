/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:06
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-19 18:02:18
 * @Description:
 */


/**
 * @name: 
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
export const foramtLrc = (array) => {
  let lrcArr = [];
  let s = '';
  let t = '';
  if (isEmpty(array)) {
    return (lrcArr = [
      {
        t: '0',
        c: '暂无歌词,请欣赏',
      },
    ]);
  }
  const lrcs = array.split('\n'); //用回车拆分成数组
  if (array.length === 0) return;
  lrcs.map((item, index) => {
    const cutSpace = item.replace(/(^\s*)|(\s*$)/g, ''); //去除前后空格
    t = cutSpace.substring(cutSpace.indexOf('[') + 1, cutSpace.indexOf(']')); //取[]间的内容
    s = t.split(':'); //分离: 前后文字
    if (isNaN(parseInt(s[0]))) {
      //不是数值
      for (let i in lrcArr) {
        if (i !== 'ms' && i === s[0].toLowerCase()) {
          lrcArr[i] = s[1];
        }
      }
    } else {
      let start = 0;
      const arr = item.match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
      arr.map((item, index) => {
        start += item.length; //计算歌词位置
        return index.id;
      });
      const content = item.substring(start); //获取歌词内容
      arr.map((item, index) => {
        t = item.substring(1, item.length - 1); //取[]间的内容
        s = t.split(':'); //分离:前后文字
        lrcArr.push({
          //对象{t:时间,c:歌词}加入ms数组
          t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
          // c: isEmpty(content) ? '~ ~ ~ ~ ~ ~ ~ ~' : content,
          c: content,
        });
        return index.id;
      });
    }
    return index.id;
  });
  lrcArr.sort(function (a, b) {
    //按时间顺序排序
    return a.t - b.t;
  });
  return lrcArr;
};