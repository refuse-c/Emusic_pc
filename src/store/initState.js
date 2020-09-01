/*
 * @Author: REFUSE_C
 * @Date: 2020-08-30 08:48:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 15:43:20
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
}

export default initState;