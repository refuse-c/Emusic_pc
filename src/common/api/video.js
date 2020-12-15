/*
 * @Author: REFUSE_C
 * @Date: 2020-12-08 14:30:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-15 23:14:19
 * @Description:
 */
import { getRequest } from './request';
/**
 * @name:相似 mv
 * @param {mvid}
 */
export const mvSimi = params => {
  return getRequest('/simi/mv', params)
}

/**
 * @name:获取 mv 数据
 * @param {mvid}
 */
export const mvDetail = params => {
  return getRequest('mv/detail', params)
}

/**
 * @name:mv 地址
 * @param {id}
 */
export const mvUrl = params => {
  return getRequest('/mv/url', params)
}

/**
 * @name:相关视频
 * @param {id}
 */
export const vidoeSimi = params => {
  return getRequest('/related/allvideo', params)
}

/**
 * @name:视频详情
 * @param {id}
 */
export const videoDetail = params => {
  return getRequest('/video/detail', params)
}

/**
 * @name:获取视频播放地址
 * @param {id}
 */
export const videoUrl = params => {
  return getRequest('/video/url', params)
}

// alg: "rt"
// artistId: 1030001
// artistName: "周深"
// artists: (2)[{ … }, { … }]
// briefDesc: null
// cover: "http://p4.music.126.net/hjX9mnaNGLG2VDdwrvl2JA==/109951165437169605.jpg"
// desc: null
// duration: 35000
// id: 10966915
// mark: 0
// name: "《不完美人生指南》周深&王子篇"