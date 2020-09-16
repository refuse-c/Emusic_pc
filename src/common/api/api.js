/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 17:41:46
 * @Description: 
 */
import { getRequest } from './request';
/**
 * @name:登录 
 * @param {phone,password} 
 */

export const login = (params) => {
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

//排行榜
/**
 * @name:所有榜单
 * @param {}
 */
export const topList = params => {
  return getRequest('/toplist', params)
}

/**
 * @name: 歌手榜单
 * @param {}
 */
export const artistTop = params => {
  return getRequest('/toplist/artist', params)
}

/**
 * @name: 歌单详情 
 * @param {} 
 */
export const playlistDetail = params => {
  return getRequest('playlist/detail', params)
}

// 歌手
/**
 * @name: 歌手分类列表
 * @param {} 
 */
export const artistList = params => {
  return getRequest('/artist/list', params)
}

// 最新音乐
/**
 * @name: 新歌速递
 * @param {}
 */
export const topSong = (params) => {
  return getRequest('/top/song', params)
}

/**
 * @name: 新碟上架
 * @param {}
 */
export const topAlbum = (params) => {
  return getRequest('/top/album', params)
}

/**
 * @name: 全部新碟
 * @param {}
 */
export const allTopAlbum = (params) => {
  return getRequest('/album/new', params)
}

// 视频
/**
 * @name: 热门视频标签
 * @param {} 
 */
export const hotVideoTag = (params) => {
  return getRequest('/video/category/list', params)
}

/**
 * @name: 视频标签
 * @param {} 
 */
export const allVideoTag = (params) => {
  return getRequest('/video/group/list', params)
}

/**
 * @name: 获取全部视频
 * @param {} 
 */
export const allVideo = (params) => {
  return getRequest('/video/timeline/all', params)
}

/**
 * @name:获取tag下的vidoe
 * @param {}
 */
export const videoGroup = (params) => {
  return getRequest('/video/group', params)
}

// MV

/**
 * @name:最新MV
 * @param {}
 */
export const firstMv = (params) => {
  return getRequest('/mv/first', params)
}

/**
 * @name:热播MV
 * @param {}
 */
export const hotMv = (params) => {
  return getRequest('/personalized/mv', params)
}

/**
 * @name:网易出品
 * @param {}
 */
export const wycpMv = (params) => {
  return getRequest('/mv/exclusive/rcmd', params)
}

/**
 * @name:mv排行榜
 * @param {}
 */
export const topMv = (params) => {
  return getRequest('/top/mv', params)
}
/**
 * @name:全部mv
 * @param {}
 */
export const allMv = (params) => {
  return getRequest('/mv/all', params)
}