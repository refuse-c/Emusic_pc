/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:20:09
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-05 21:59:14
 * @Description:
 */

import * as  ACTIONTYPE from './actionTypes';
import { combineReducers } from 'redux';
import initState from './initState'


// 用户信息
const userInfo = (state = initState.userInfo, action) => {
  switch (action.type) {
    case ACTIONTYPE.QUERY_USER_INFO: return action.data;
    default: return state;
  }
}

// 弹窗状态
const modelPower = (state = initState.modelPower, action) => {
  switch (action.type) {
    case ACTIONTYPE.IS_SHOW_SKIN:
      return Object.assign({}, state, {
        skinStatus: action.data
      });
    case ACTIONTYPE.IS_SHOW_LOGIN:
      return Object.assign({}, state, {
        loginStatus: action.data
      });
    case ACTIONTYPE.IS_SHOW_PLAYLIST:
      return Object.assign({}, state, {
        playListStatus: action.data
      });
    case ACTIONTYPE.IS_SHOW_PLAYER:
      return Object.assign({}, state, {
        playerStatus: action.data
      });
    case ACTIONTYPE.IS_SHOW_SEARCH_LIST:
      return Object.assign({}, state, {
        searchListStatus: action.data
      });
    default: return state;
  }
}

// 用户歌单列表
const userPlayList = (state = initState.userPlayList, action) => {
  switch (action.type) {
    case ACTIONTYPE.USRT_PLAYLIST: return action.data;
    default: return state;
  }
}

// 当前播放的信息
const currentPlayer = (state = initState.currentPlayer, action) => {
  switch (action.type) {
    case ACTIONTYPE.CURRENT_PLAYER: return action.data;
    default: return state;
  }
}
// 播放列表
const currentPlayList = (state = initState.currentPlayList, action) => {
  switch (action.type) {
    case ACTIONTYPE.CURRENT_PLAY_LIST: return action.data;
    default: return state;
  }
}

// 当前播放时间
const currentTime = (state = initState.currentTime, action) => {
  switch (action.type) {
    case ACTIONTYPE.CURRENT_TIME: return action.data;
    default: return state;
  }
}

export default combineReducers({
  userInfo,
  modelPower,
  userPlayList,
  currentPlayer,
  currentPlayList,
  currentTime
})