/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-19 13:53:34
 * @Description: 
 */

import { getRequest } from './request';
/**
 * @name:手机登录 
 * @param {phone,password} 
 */
export const phoneLogin = params => {
  return getRequest('/login/cellphone', params)
}

/**
 * @name:检测手机号是否已经注册 
 * @param { phone : 手机号码 countrycode: 国家码，}
 */
export const phoneIsRegistered = params => {
  return getRequest('/cellphone/existence/check', params)
}


/**
 * @name:邮箱登录 
 * @param {email,password} 
 */
export const emailLogin = params => {
  return getRequest('/login/', params)
}

/**
 * @name:1.二维码key生成接口
 * @param {} 
 */
export const qrKey = params => {
  return getRequest('/login/qr/key', params)
}

/**
 * @name:2.二维码生成接口
 * @param {key,qrimg}
 */
export const qrCreate = params => {
  return getRequest('/login/qr/create', params)
}

/**
 * @name:3.二维码检测扫码状态接口
 * @param {key}
 */
export const qrCheck = params => {
  return getRequest('/login/qr/check', params)
}

/**
 * @name:退出登录 
 * @param {phone,password} 
 */
export const logout = params => {
  return getRequest('/logout', params)
}


/**
 * @name: 检测登录状态
 * @param {} 
 */
export const loginStatus = params => {
  return getRequest('/login/status', params)
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
 * @name:每日推荐音乐
 * @param {} 
 */
export const recommendSongs = params => {
  return getRequest('/recommend/songs', params)
}

/**
 * @name: 独家放送(个性推荐入口)
 * @param {}
 */
export const privatecontent = params => {
  return getRequest('/personalized/privatecontent', params)
}

/**
 * @name: 独家放送(个性推荐入口)
 * @param {}
 */
export const privatecontentList = params => {
  return getRequest('/personalized/privatecontent/list', params)
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
 * @name: 精品歌单标签列表
 * @param {} 
 */
export const qualityTag = params => {
  return getRequest('/playlist/highquality/tags', params)
}
/**
 * @name: 精品歌单
 * @param {} 
 */
export const highquality = params => {
  return getRequest('/top/playlist/highquality', params)
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

/**
 * @name:获取每首歌的详情 
 * @param {type} 
 */
export const songDetail = params => {
  return getRequest('song/detail', params)
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
export const topSong = params => {
  return getRequest('/top/song', params)
}

/**
 * @name: 新碟上架
 * @param {}
 */
export const topAlbum = params => {
  return getRequest('/top/album', params)
}

/**
 * @name: 全部新碟
 * @param {}
 */
export const allTopAlbum = params => {
  return getRequest('/album/new', params)
}

// 视频
/**
 * @name: 热门视频标签
 * @param {} 
 */
export const hotVideoTag = params => {
  return getRequest('/video/category/list', params)
}

/**
 * @name: 视频标签
 * @param {} 
 */
export const allVideoTag = params => {
  return getRequest('/video/group/list', params)
}

/**
 * @name: 获取全部视频
 * @param {} 
 */
export const allVideo = params => {
  return getRequest('/video/timeline/all', params)
}

/**
 * @name:获取tag下的vidoe
 * @param {}
 */
export const videoGroup = params => {
  return getRequest('/video/group', params)
}

// MV

/**
 * @name:最新MV
 * @param {}
 */
export const firstMv = params => {
  return getRequest('/mv/first', params)
}

/**
 * @name:热播MV
 * @param {}
 */
export const hotMv = params => {
  return getRequest('/personalized/mv', params)
}

/**
 * @name:网易出品
 * @param {}
 */
export const wycpMv = params => {
  return getRequest('/mv/exclusive/rcmd', params)
}

/**
 * @name:mv排行榜
 * @param {}
 */
export const topMv = params => {
  return getRequest('/top/mv', params)
}
/**
 * @name:全部mv
 * @param {}
 */
export const allMv = params => {
  return getRequest('/mv/all', params)
}

/**
 * @name:获取音乐地址
 * @param {}
 */
export const songUrl = params => {
  return getRequest('/song/url', params)
}

/**
 * @name:获取国家编码列表
 * @param {}
 */
export const countriesCode = params => {
  return getRequest('/countries/code/list', params)
}

/**
 * @name:获取歌词
 * @param {id}
 */
export const lyric = params => {
  return getRequest('/lyric', params)
}

