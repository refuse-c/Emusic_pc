/*
 * @Author: REFUSE_C
 * @Date: 2020-08-30 08:48:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 14:27:15
 * @Description: 声明默认值
 */
let initState = {
  isLogin: false,// 登录状态
  userInfo: {
    tel: '13272946536',
    pwd: '123456'
  },// 登录后的信息
  modalPower: {
    loginStatue: false,
    skinStatue: false,
  },
  playing: {}, // 当前播放的音乐
  playList: [],// 当前的播放列表
  musicList: [],// 当前显示列表
  userPlayList: [],//用户歌单
}

export default initState;