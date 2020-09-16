/*
 * @Author: REFUSE_C
 * @Date: 2020-09-16 13:52:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 14:06:39
 * @Description: 用户
 */
import { getRequest } from './request';

// 获取用户信息, 歌单，收藏，mv, dj 数量
export const userSubcount = params => {
  return getRequest('/user/subcount', params)
}

// 获取用户详情
export const userDetail = params => {
  return getRequest('/user/detail', params)
}
// 获取用户详情
export const userPlaylist = params => {
  return getRequest('/user/playlist', params)
}
