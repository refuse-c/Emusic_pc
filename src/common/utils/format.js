/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 18:24:44
 * @Description:
 */

/**
 * @name: 手机号码格式化
 * @param {number} 
 */
export const formatTel = val => {
  let value = val.replace(/\D/g, "").substring(0, 11);
  const valueLen = value.length;
  if (valueLen > 3 && valueLen < 8) {
    value = `${value.substr(0, 3)} ${value.substr(3)}`;
  } else if (valueLen >= 8) {
    value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
  }
  return value;
}

/**
 * @name: 去空格
 * @param {string} 
 */
export const Trim = str => {
  str = str.replace(/\s*/g, '');
  return str;
}

/**
 * @name: 图片压缩
 * @param {img src}}
 */
export const formatImgSize = (src, x = 100, y = 100) => {
  if (!src) return false;
  return `${src}?param=${x}y${y}`;
}

/**
 * @name: 星期转汉字
 * @param {type}
 */
export const formatWeek = v => {
  if (!v) return;
  switch (v) {
    case 1: return `星期一`;
    case 2: return `星期二`;
    case 3: return `星期三`;
    case 4: return `星期四`;
    case 5: return `星期五`;
    case 6: return `星期六`;
    default: return `星期天`;
  }
}