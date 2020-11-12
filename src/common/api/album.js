/*
 * @Author: REFUSE_C
 * @Date: 2020-11-12 09:47:10
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-12 14:33:00
 * @Description: 
 */


import { getRequest } from './request';
/**
 * @name:获取专辑内容
 * @param {id: 专辑 id}
 */
export const album = params => {
  return getRequest('/album', params)
}

/**
 * @name:专辑动态信息
 * @param {id: 专辑 id}
 */
export const albumDetail = params => {
  return getRequest('/album/detail/dynamic', params)
}