/*
 * @Author: REFUSE_C
 * @Date: 2020-12-19 16:06:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-21 14:46:10
 * @Description:
 */

import { getRequest } from './request';

/**
 * @name:喜欢音乐
 * @param {id,like}
 */
export const setLike = params => {
  return getRequest('/like', params)
}

/**
 * @name:喜欢音乐列表
 * @param {id}
 */
export const likeList = params => {
  return getRequest('/likelist', params)
}