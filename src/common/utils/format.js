/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 17:26:01
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
export const Trim = val => {
  if (!val) return;
  val = val.replace(/\s*/g, '');
  return val;
}

/**
 * @name: 图片压缩
 * @param {img src}}
 */
export const formatImgSize = (url, x = 100, y = 100) => {
  if (!url) return;
  return `${url}?param=${x}y${y}`;
}

/**
 * @name: 星期转汉字
 * @param {type}
 */
export const formatWeek = val => {
  if (!val) return;
  switch (val) {
    case 1: return `星期一`;
    case 2: return `星期二`;
    case 3: return `星期三`;
    case 4: return `星期四`;
    case 5: return `星期五`;
    case 6: return `星期六`;
    default: return `星期天`;
  }
}

/**
 * @name: 格式化序号
 * @param {number}
 */
export const formatSerialNumber = val => {
  if (!val) return;
  return val < 10 ? '0' + val : val;
}

/**
 * @name: 筛选出对应风格的tag
 * @param {}
 */
export const formatTag = (tagList, tagObj) => {
  let newList = [];
  for (const key in tagObj) {
    const arr = tagList.filter((item) => item.category === Number(key));
    if (arr.length > 0) {
      newList.push({
        title: tagObj[key],
        list: arr,
      });
    }
  }
  return newList;
};

/**
 * @name: 日期格式化
 * @param {}
 */
export const formatDate = (v, type) => {
  if (!v) return '';
  let date = new Date(v);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  switch (type) {
    case '0':
      return year + '年' + month + '月' + day + '日';
    default:
      return year + '-' + month + '-' + day;
  }
};
