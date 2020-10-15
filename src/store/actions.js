/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 16:36:34
 * @Description: redux
 */

import * as ACTIONTYPS from './actionTypes';

// 用户信息
export const queryUserInfo = (data) => {
  return { type: ACTIONTYPS.QUERY_USER_INFO, data: data }
}
// 用户歌单
export const userPlayList = (data) => {
  return { type: ACTIONTYPS.USRT_PLAYLIST, data }
}

// 弹窗显示掩藏
export const modalPower = (data) => {
  return data
}

// 播放的歌曲信息
export const currentPlayer = (data) => {
  return { type: ACTIONTYPS.CURRENT_PLAYER, data }
}

// 播放列表
export const currentPlayList = (data) => {
  return { type: ACTIONTYPS.CURRENT_PLAY_LIST, data }
}