

/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-21 17:44:53
 * @Description:基础工具
 */

import { message } from "antd";
import { isEmpty } from "./format";


/**
 * @name: 音乐频谱
 * @param {audio,canvas,volume} 
 */
let source;
let MEDIA_ELEMENT_NODES = new WeakMap();
let context = new (window.AudioContext || window.webkitAudioContext)();
const analyser = context.createAnalyser();
analyser.fftSize = 1024;
export const spectrum = (audio, canvas, volume = 1) => {

  if (MEDIA_ELEMENT_NODES.has(audio)) {
    source = MEDIA_ELEMENT_NODES.get(audio);
  } else {
    source = context.createMediaElementSource(audio);
    MEDIA_ELEMENT_NODES.set(audio, source);
  }
  source.connect(analyser);
  analyser.connect(context.destination);
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  // let barWidth = WIDTH / bufferLength * 1.2;
  let barWidth = 2;

  let barHeight;
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 3;
      const r = barHeight + 0 * (i / bufferLength) * volume;
      const g = 2500 * (i / bufferLength) * volume;
      const b = 10 * (i / bufferLength) * volume;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 4;
    }
  }
  renderFrame();
}

/**
 * @name: 缓存
 * @param {any} 
 */
export const setLocal = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};
export const getLocal = (name) => {
  return JSON.parse(window.localStorage.getItem(name));
};
export const reLocal = (name) => {
  window.localStorage.removeItem(name)
};
export const setSession = (name, data) => {
  window.sessionStorage.setItem(name, JSON.stringify(data));
};
export const getSession = (name) => {
  return JSON.parse(window.sessionStorage.getItem(name));
};
export const reSession = (name) => {
  window.sessionStorage.removeItem(name)
};

/**
 * @name:遍历歌单id
 * @param {type}
 */
export const traverseId = (arr) => {
  if (isEmpty(arr)) return;
  let ids = arr.map(item => item.id);
  ids = ids = ids.length > 600 ? ids.slice(0, 600) : ids;
  ids = ids.join(',');
  return ids;
}

/**
 * @name:  重命名
 * @param {type}
 */
export const replaceName = (userId, name) => {
  const userInfo = getLocal('userInfo');
  if (isEmpty(userInfo)) return name;
  return Number(userId) === Number(userInfo.userId) ? name.replace(userInfo.nickname, '我') : name;
}

/**
 * @name:  高亮检索内容
 * @param {type}
 */
export const highlightText = (key, str) => {
  return str.replace(new RegExp(key, 'gi'), val => `<span class='highlight'>${val}</span>`);
}

/**
 * @name:切歌 上/下一曲
 * @param {currentIndex} currentIndex
 * @param {list} currentPlayList
 * @param {type} type  1 上一曲 2下一曲  default:1
 * @param {orderType} orderType 1 顺序播放 2 单曲循环 3 随机播放
 */

export const cutSong = (id, name, list, type, orderType) => {
  const length = list.length - 1;
  if (length === -1) {
    message.destroy();
    message.info('当前无可以播放音乐,快去添加吧^v^');
    return false;
  }
  let index = list.findIndex(item => item.type === 'local' ? name === item.name : id === item.id);
  if (type === 1) {
    index--;
    index = index === -1 ? length : index;
  } else {
    switch (orderType) {
      case 2: index = Math.floor(Math.random() * length);
        break;
      default: index++;
        index = index === length + 1 ? 0 : index;
        break;
    }
  }
  return list[index]
}

/**
 * @name: 路由跳转
 * @param {history}  T
 * @param {pathname} T
 * @param {search}   F  携带的参数
 */
export const routerJump = (history, pathname, search) => {
  return history.push({ pathname, search })
}


/**
 * @name:  判断是不是当前用户的相关东西
 * @param {type}
 */
export const isLoginUser = userId => {
  const userInfo = getLocal('userInfo');
  if (isEmpty(userInfo)) return false;
  return Number(userId) === Number(userInfo.userId) ? true : false;
}

/**
 * @name:歌词解析
 * @param {type}
 */
export const formatLrc = (array) => {
  let lrcArr = [];
  let s = '';
  let t = '';
  if (!array) {
    return (lrcArr = [
      {
        time: '0',
        text: '暂无歌词,请欣赏',
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
        let time = (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3)
        if (time && content) {
          lrcArr.push({
            //对象{t:时间,text:歌词}加入ms数组
            time,
            text: content,
          });
        }
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

/**
 * @name:获取当前行的歌词
 * @param {type}
 */

export const getTimeIndex = (timeArr, time) => {
  let timeIndex = -1;
  const length = timeArr.length;
  const currentTime = Number(time) + 0.2;
  for (let i = 0; i < length; i++) {
    if (timeArr[i].time >= currentTime) {
      timeIndex = i - 1;
      break;
    } else {
      timeIndex = i;
    }
  }
  return Number(timeIndex);
};

/**
 * @name:非空判断
 * @param {String、Object、Array、Map、Set }
 */
export const ISEmpty = x => {
  if (Array.isArray(x)
    || typeof x === 'string'
    || x instanceof String
  ) {
    return x.length === 0;
  }
  if (x instanceof Map || x instanceof Set) {
    return x.size === 0;
  }
  if (({}).toString.call(x) === '[object Object]') {
    return Object.keys(x).length === 0;
  }
  return false;
}

/**
 * @name:指定区间随机数生成
 * @param {max min}
 */


export const randomNumber = (max = 1, min = 0) => {
  if (min >= max) {
    return max;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
