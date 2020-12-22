/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-22 10:59:48
//  * @Description: 
 */
import React, { Component } from "react";
import Header from '@components/header/Header';
import { Route } from 'react-router-dom';
import styles from './css/index.module.scss';
import { setLocal, reLocal, routerJump, setSession } from '@/common/utils/tools';
import { logout, loginStatus } from '@/common/api/api';
import { message } from 'antd';
import { userPlaylist } from '@/common/api/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower, queryUserInfo, userPlayList } from '@/store/actions';
import { IS_SHOW_PLAYER, IS_SHOW_PLAYLIST } from "@/store/actionTypes";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 获取用户歌单
  queryUserPlaylist = async uid => {
    const res = await userPlaylist({ uid })
    if (res.code !== 200) return;
    const allList = res.playlist;
    let createList = allList.filter(item => item.privacy !== 10 && item.userId === uid);
    let collectList = allList.filter(item => item.privacy !== 10 && item.userId !== uid);
    const myLikeSingle = allList.find(item => item.specialType === 5 && item.userId === uid)
    setSession('uid', uid || '');
    setSession('myLikeSingleId', myLikeSingle.id || '');
    createList.unshift({ name: '创建的歌单' })
    collectList.unshift({ name: '收藏的歌单' })
    const list = createList.concat(collectList);
    this.props.handeUserPlayList(list);
  }

  // 查询登录状态
  queryLoginStatus = async params => {
    const res = await loginStatus(params);
    if (res.code !== 200) { reLocal('userInfo'); return };
    setLocal('userInfo', res.profile);
    const uid = res.profile.userId;
    this.queryUserPlaylist(uid);
    this.props.handleQueryUserInfo(res.profile);
  }

  // 退出登录
  logout = async params => {
    const { history } = this.props;
    const res = await logout(params);
    if (res.code !== 200) return;
    reLocal('userInfo');
    message.info('已退出登录');
    this.props.handeUserPlayList([]);
    this.props.handleQueryUserInfo({});
    routerJump(history, `/home/find/`);
  }

  // 掩藏弹窗
  handelHideModal = () => {
    console.log(1111111111111)
    const { playListStatus, playerStatus } = this.props.modalPower;
    if (playerStatus) this.props.handleModalPower({ type: IS_SHOW_PLAYER, data: !playerStatus });
    if (playListStatus) this.props.handleModalPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus });

  }

  componentDidMount = async () => {
    await this.queryLoginStatus();
  }

  render() {
    return (
      <div className={styles.index}>
        <Header
          logout={this.logout}
          queryUserPlaylist={this.queryUserPlaylist}
          handelHideModal={this.handelHideModal} />
        {this.props.routes.map((route, key) => {

          if (route.exact) {
            return (
              <Route
                key={key}
                exact
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} handelHideModal={this.handelHideModal} />
                )}
              />
            );
          } else {
            return (
              <Route
                key={key}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} handelHideModal={this.handelHideModal} />
                )}
              />
            );
          }
        })}
      </div>)
  }
}


const mapStateToprops = state => {
  return {
    userInfo: state.userInfo,
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleModalPower: bindActionCreators(modalPower, dispatch),
    handleQueryUserInfo: bindActionCreators(queryUserInfo, dispatch),
    handeUserPlayList: bindActionCreators(userPlayList, dispatch),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(Index);
