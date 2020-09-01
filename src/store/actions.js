/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 16:11:05
 * @Description: 
 */

import * as ACTIONTYPS from './actionTypes';

export const queryUserInfo = (data) => {
  return { type: ACTIONTYPS.QUERY_USER_INFO, data: data }
}

export const modalPower = (data) => {
  return data
}