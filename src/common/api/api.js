/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 19:52:48
 * @Description: 
 */
import { getRequest } from './request';
/**
 * @name:登录 
 * @param {phone,password} 
 */

export const login = (params) => {
  console.log(params)
  return getRequest('/login/cellphone', params)
}

/**
 * @name:每日推荐歌单
 * @param {} 
 */
export const recommendList = params => {
  return getRequest('/personalized', params)
}

/**
 * @name: 独家放送
 * @param {}
 */
export const privatecontent = params => {
  return getRequest('/personalized/privatecontent', params)
}

