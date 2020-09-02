/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 23:28:55
 * @Description:基础工具
 */


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
export const setSession = (name, data) => {
  window.sessionStorage.setItem(name, JSON.stringify(data));
};
export const getSession = (name) => {
  return JSON.parse(window.sessionStorage.getItem(name));
};