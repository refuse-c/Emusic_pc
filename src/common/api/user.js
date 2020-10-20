/*
 * @Author: REFUSE_C
 * @Date: 2020-09-16 13:52:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-20 14:12:07
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
// 获取用户歌单
export const userPlaylist = params => {
  return getRequest('/user/playlist', params)
}
// 获取用户播放记录
export const userRecord = params => {
  return getRequest('/user/record', params)
}
