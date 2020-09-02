/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:20:09
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 11:45:05
 * @Description:
 */

import * as  ACTIONTYPE from './actionTypes';
import { combineReducers } from 'redux';
import initState from './initState'



const userInfo = (state = initState.userInfo, action) => {
  switch (action.type) {
    case ACTIONTYPE.QUERY_USER_INFO: return action.data;
    default: return state;
  }
}


const modalPower = (state = initState.modalPower, action) => {
  switch (action.type) {
    case ACTIONTYPE.IS_SHOW_SKIN:
      return Object.assign({}, state, {
        skinStatue: action.data
      });
    case ACTIONTYPE.IS_SHOW_LOGIN:
      return Object.assign({}, state, {
        loginStatue: action.data
      });
    default: return state;
  }
}



export default combineReducers({
  userInfo,
  modalPower
})