/*
 * @Author: REFUSE_C
 * @Date: 2020-08-19 09:28:56
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-19 11:46:42
 * @Description: 基础网络请求
 */
import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://139.9.230.159:3000/',
  timeout: '15000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, //网易云api针对axios的跨域处理
})
// Axios.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Axios.interceptors.request.use(
  // 可以再此处添加loading
  config => {
    return config;
  }, error => Promise.error(error))

// 响应拦截器
Axios.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),

  // 请求失败
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 301:
          console.log('还没登录呢..')
          break;
        case 400:
          console.log('错误请求')
          break;
        case 401:
          console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
  })


export const RAPost = (path, params) => {
  return new Promise((resolve, reject) => {
    Axios.post(path, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

export const RAGet = (path, params) => {
  return new Promise((resolve, reject) => {
    Axios.get(path, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};
// export default Axios;