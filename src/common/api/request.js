/*
 * @Author: REFUSE_C
 * @Date: 2020-08-19 09:28:56
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-24 20:45:28
 * @Description: 基础网络请求
 */
import { message } from 'antd';
import axios from 'axios';
import { getLocal } from 'common/utils/tools';
const Axios = axios.create({
  baseURL: 'http://139.9.230.159:3000', // http://tshy.xyz:3000  // http://139.9.230.159:3000
  timeout: '60000',
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json'
    'content-type': 'application/x-www-form-urlencoded'
  }
})

// Axios.interceptors.request.use(
//   config => {
//     return config;
//   }, error => Promise.error(error))

// 响应拦截器
Axios.interceptors.response.use(
  // 请求成功
  res => {
    if (res && res.data) {
      if (res.data.code !== 200) {
        const { msg } = res.data;
        if (msg) message.error(msg);
      }
      return Promise.resolve(res.data);

    }
  }
  // 请求失败
  , err => {
    console.log(err)
    message.destroy();
    const errMsg = JSON.parse(JSON.stringify(err));
    console.log(errMsg)
    if (err && err.response && err.response.data && err.response.data.msg) {
      message.destroy();
      message.warning(err.response.data.msg);
    } else {
      message.warning(errMsg.message);
    }
    return Promise.resolve(err)
  })


export const postRequest = (path, params = {}) => {
  params.timestamp = (new Date()).getTime();
  params.cookie = getLocal('cookie') ? getLocal('cookie') : ''
  return new Promise((resolve, reject) => {
    Axios.post(path, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};

export const getRequest = (path, params = {}) => {
  params.timestamp = (new Date()).getTime();
  params.cookie = getLocal('cookie') ? getLocal('cookie') : ''
  return new Promise((resolve, reject) => {
    Axios.get(path, { params }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};
