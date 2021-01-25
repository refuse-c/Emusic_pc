/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-22 18:58:50
 * @Description:工具
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
 * @name: 筛选出对应风格的tag
 * @param {}
 */
export const formatTag = (tagList, tagObj) => {
  let newList = [];
  for (const key in tagObj) {
    const arr = tagList.filter(item => item.category === Number(key));
    if (arr.length > 0) {
      newList.push({
        title: tagObj[key],
        list: arr,
        icon: 'icon_' + key
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

/**
 * @name:格式化歌曲时间
 * @param {type}
 */
export const formatSongTime = (v, isSeconds = false) => {
  if (!v) return '00:00';
  const time = isSeconds ? v : Math.floor(v / 1000);
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return `${m}:${s}`
}



/**
 * @name:序号格式化
 * @param {}
 */
export const formatSerialNo = v => {
  if (!v) return;
  return v < 10 ? '0' + v : v > 100000000
    ? (v / 100000000).toFixed(1) + '亿' : v > 100000 ? (v / 10000).toFixed(1) + '万' : v;
}

/**
 * @name: 格式化歌单列表数据
 * @param {}
 */
export const formatSingleList = v => {
  if (!v || !v.length) return [];
}

/**
 * @name:是否是数组 
 * @param {string}
 */
export const isArray = (v) => {
  return toString(v) === '[object Array]';
};

/**
 * @name: 非空校验
 * @param { Boolean }
 */
export const isEmpty = v => {
  return v === '' || v === null || v === undefined || (isArray(v) && !v.length) || !Object.keys(v).length;
}

export const keyToStr = key => {
  switch (key) {
    case 10: return '张专辑';
    case 100: return '位歌手';
    case 1000: return '个歌单';
    case 1004: return '位用户';
    case 1006: return '首歌词';
    case 1009: return '个电台';
    case 1014: return '个视频';
    default: return '首单曲';
  }
}

/**
 * @name: 判断是不是纯数字
 * @param {string} 
 * true位全数字 false为字符串或者空
 */
export const checkNum = v => {
  return !isNaN(v);
}

/**
 * @name: 格式化本地音乐名字
 * @param {string} 
 */
export const formatLocalName = v => {
  if (!v) return;
  return v.replace(/.wav|.mp3|.ogg|.acc|.flac/g, '');
}

/**
 * @name: 校验邮箱格式是否正确
 * @param {*} str
 */
export const isEmail = str => {
  if (!str) return false;
  const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}

export const formatTels = str => {
  if (!str) return false;
  const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  return reg.test(str);
}

/**
 * @name: 替换特殊符号[\\]为指定标签
 * @param {*} str
 */
export const replaceLabel = (str, label) => {
  return str.replace(/\[\//g, `<${label}>`).replace(/\/]/g, `</${label}>`)
}

/**
 * @name: 去空格
 * @param {str = string, type = number (1 || 2)}
 * 默认去掉全部空格  type: 1去掉字符串左边空格 2去掉字符串左边空格
 */
export const Trim = (str, type) => {
  return type === 1 ? str.replace(/(^\s*)/g, '') : type === 2 ? str.replace(/(\s*$)/g, '') : str.replace(/\s+/g, '')
}


/**
 * @name: 一维数组分割成多维数组 
 * @param {array} arr 
 * @param {num} slicelength 
 */


export const changeArrGroup = (arr, slicelength = 500) => {

  if (isEmpty(arr)) return;

  // 遍历筛选全部ids
  let ids = arr.map(item => item.id);

  // 分割ids
  let sliceIds = [];
  let changeIndex = 0;
  while (changeIndex < ids.length) {
    sliceIds.push(ids.slice(changeIndex, changeIndex += slicelength).join(','))
  }

  return sliceIds;
}
