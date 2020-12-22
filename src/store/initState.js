/*
 * @Author: REFUSE_C
 * @Date: 2020-08-30 08:48:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-22 10:33:08
 * @Description: 声明默认值
 */
let initState = {
  isLogin: false,// 登录状态
  userInfo: {
    // tel: '13272946536',
    // pwd: '123456'
  },// 登录后的信息
  modalPower: {
    loginStatus: false,
    skinStatus: false,
    playListStatus: false,
    playerStatus: false,
  },
  currentTime: 0,// 当前播放时间
  currentPlayer: { id: '' }, // 当前播放的音乐
  currentPlayList: [],// 当前的播放列表
  musicList: [],// 当前显示列表
  userPlayList: [],//用户歌单
  // 设置喜欢的时候刷新数据
  likeRefreshStatus: false
}

export default initState;