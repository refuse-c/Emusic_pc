/*
 * @Author: REFUSE_C
 * @Date: 2020-09-16 13:52:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-27 09:45:29
 * @Description: 搜索API
 */
import { getRequest } from './request';

// 搜索
export const search = params => {
  return getRequest('/search', params)
}

// 默认搜索关键词
export const searchDefault = params => {
  return getRequest('/search/default', params)
}

// 热搜列表(简略)
export const searchHot = params => {
  return getRequest('/search/hot', params)
}

// 热搜列表(详细)
export const searchHotDetail = params => {
  return getRequest('/search/hot/detail', params)
}

// 搜索建议
export const searchSuggest = params => {
  return getRequest('/search/suggest', params)
}

// 搜索多重匹配
export const searchMultimatch = params => {
  return getRequest('/search/multimatch', params)
}