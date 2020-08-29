/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:57:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-29 12:33:28
 * @Description:基础工具
 */


/**
 * @name: 音乐频谱
 * @param {audio,canvas,volume} 
 * @return {} 
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
  // let barWidth = WIDTH / bufferLength * 1.5;
  let barWidth = 1;

  let barHeight;
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 3;
      // let r = 0;
      // let g = 255;
      // let b = 255;

      // if (volume > 0.6) {
      //   r = 255;
      //   g = 200;
      //   b = 0;
      // } else if (volume > 0.3) {
      //   r = 0;
      //   g = 255;
      //   b = 255;
      // } else {
      //   r = 0;
      //   g = 255;
      //   b = 0;
      // }
      const r = barHeight + 250 * (i / bufferLength) * volume;
      const g = 25 * (i / bufferLength) * volume;
      const b = 10 * (i / bufferLength) * volume;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

      // var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      // gradient.addColorstop(0, '#fff');
      // gradient.addcolorstop(1, '#e00');
      // let grd = ctx.createRadialGradient(x, HEIGHT - barHeight, 0, -barWidth, barHeight, barHeight * 2);
      // grd.addColorStop(0, "#fff");
      // grd.addColorStop(0.2, "#142414");
      // grd.addColorStop(0.4, "#a532");
      // grd.addColorStop(0.6, "red");
      // grd.addColorStop(0.8, "#d75");
      // grd.addColorStop(1, "#a45774");

      // ctx.fillStyle = grd;

      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 2;
    }
  }
  renderFrame();
}
/**
 * @name: 缓存
 * @param {string} 
 * @return {string}
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