

/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-26 11:40:35
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
  let ids = arr.map(item => item.id).join(',')
  return ids;
}

/**
 * @name:首尾去空格
 * @param {type}
 */
export const Trim = v => {
  if (!v) return;
  return v.replace(/^\s+|\s+$/g, "");
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

export const cutSong = (id, list, type, orderType) => {
  const length = list.length - 1;
  if (length === -1) {
    message.destroy();
    message.info('当前无可以播放音乐,快去添加吧^v^');
    return false;
  }
  let index = list.findIndex(item => id === item.id);
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