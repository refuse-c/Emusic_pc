/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 14:28:56
 * @Description: redux
 */

import * as ACTIONTYPS from './actionTypes';

export const queryUserInfo = (data) => {
  return { type: ACTIONTYPS.QUERY_USER_INFO, data: data }
}
// 用户歌单
export const userPlayList = (data) => {
  return { type: ACTIONTYPS.USRT_PLAYLIST, data }
}

export const modalPower = (data) => {
  return data
}