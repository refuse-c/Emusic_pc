/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:20:09
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-31 17:05:32
 * @Description:
 */

import * as  ACTIONTYPE from './actionTypes';
import { combineReducers } from 'redux';
import initState from './initState'
const userInfo = (state = initState.userInfo, action) => {
  switch (action.type) {
    case ACTIONTYPE.USER_INFO: return action.data;
    default: return state;
  }
}

export default combineReducers({
  userInfo
})