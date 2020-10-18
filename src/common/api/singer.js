
import { getRequest } from './request';

// 获取歌手描述
export const artistDesc = params => {
  return getRequest('/artist/desc', params)
}

// 获取歌手热门50首歌曲
export const artistTopSong = params => {
  return getRequest('/artist/top/song', params)
}

// 获取歌手全部歌曲
export const artistSongs = params => {
  return getRequest('/artist/songs', params)
}

// 收藏的歌手列表
export const artistSublist = params => {
  return getRequest('/artist/sublist', params)
}

// 获取歌手单曲
export const artists = params => {
  return getRequest('/artists', params)
}

// 获取歌手 mv
export const artistMv = params => {
  return getRequest('/artist/mv', params)
}

// 获取歌手专辑
export const artistAlbum = params => {
  return getRequest('/artist/album', params)
}

// 获取相似歌手
export const artistSimi = params => {
  return getRequest('/simi/artist', params)
}

// 获取热门歌手
export const artistTop = params => {
  return getRequest('/top/artists', params)
}

// 收藏/取消收藏歌手
export const artistSub = params => {
  return getRequest('/artist/sub', params)
}