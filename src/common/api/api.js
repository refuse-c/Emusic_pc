/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-09 22:27:07
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

// 个性推荐
/**
 * @name:banner 
 * @param {type} 
 */
export const banner = params => {
  return getRequest('/banner', params)
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
/**
 * @name:最新音乐
 * @param {}
 */

export const newMusic = params => {
  return getRequest('top/song', params)
}

/**
 * @name: 推荐mv
 * @param {} 
 */
export const personalizedMv = params => {
  return getRequest('personalized/mv', params)
}

// 歌单
/**
 * @name: 歌单分类
 * @param {} 
 */
export const taglist = params => {
  return getRequest('playlist/catlist', params)
}

/**
 * @name: 热门歌单分类
 * @param {} 
 */
export const hotTag = params => {
  return getRequest('/playlist/hot', params)
}

/**
 * @name:获取歌单
 * @param {}
 */
export const playList = params => {
  return getRequest('/top/playlist', params)
}