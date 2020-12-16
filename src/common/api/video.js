/*
 * @Author: REFUSE_C
 * @Date: 2020-12-08 14:30:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-16 19:24:45
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
// git remote add origin https://github.com/refuse-c/Emusic_pc.git
//  git remote set-url --add origin  https://gitee.com/refuse-c/Emusic_pc.git