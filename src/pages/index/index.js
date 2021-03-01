/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-26 19:42:44
//  * @Description: 
 */
import React, { Component } from "react";
import Header from 'pages/header/Header';
import { Route } from 'react-router-dom';
import styles from './css/index.module.scss';
import { setLocal, reLocal, routerJump, setSession } from 'common/utils/tools';
import { logout, loginStatus } from 'common/api/api';
import { message } from 'antd';
import { userPlaylist } from 'common/api/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookies';
import { modelPower, queryUserInfo, userPlayList } from 'store/actions';
import { IS_SHOW_PLAYER, IS_SHOW_PLAYLIST, IS_SHOW_SKIN, IS_SHOW_SEARCH_LIST } from "store/actionTypes";
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
  queryLoginStatus = () => {
    loginStatus().then(res => {
      const data = res.data;
      if (data.code !== 200 || data.profile == null) {
        reLocal('userInfo');
        // reLocal('cookie');
        cookie.remove('cookie');
        return false;
      };
      setLocal('userInfo', data.profile)
      const uid = data.profile.userId;
      if (uid) {
        this.queryUserPlaylist(uid);
        this.props.handleQueryUserInfo(data.profile);
      }
    }).catch(err => console.log(err))

  }

  // 退出登录
  logout = async params => {
    const { history } = this.props;
    const res = await logout(params);
    if (res.code !== 200) return;
    reLocal('userInfo');
    // reLocal('cookie');
    cookie.remove('cookie');
    message.info('已退出登录');
    this.props.handeUserPlayList([]);
    this.props.handleQueryUserInfo({});
    routerJump(history, `/home/find/`);
  }

  // 掩藏弹窗
  handelHideModel = () => {
    const { playListStatus, playerStatus, skinStatus, searchListStatus } = this.props.modelPower;
    if (playerStatus) this.props.handleModelPower({ type: IS_SHOW_PLAYER, data: !playerStatus });
    if (playListStatus) this.props.handleModelPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus });
    if (skinStatus) this.props.handleModelPower({ type: IS_SHOW_SKIN, data: !skinStatus });
    if (searchListStatus) this.props.handleModelPower({ type: IS_SHOW_SEARCH_LIST, data: !searchListStatus });
  }

  componentDidMount = async () => {
    await this.queryLoginStatus();
  }

  render() {
    return (
      <div className={styles.index}>
        <Header
          logout={this.logout}
          queryLoginStatus={this.queryLoginStatus}
          queryUserPlaylist={this.queryUserPlaylist}
          handelHideModel={this.handelHideModel}
        />

        {this.props.routes.map((route, key) => {

          if (route.exact) {
            return (
              <Route
                key={key}
                exact
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} handelHideModel={this.handelHideModel} />
                )}
              />
            );
          } else {
            return (
              <Route
                key={key}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} handelHideModel={this.handelHideModel} />
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
    modelPower: state.modelPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleModelPower: bindActionCreators(modelPower, dispatch),
    handleQueryUserInfo: bindActionCreators(queryUserInfo, dispatch),
    handeUserPlayList: bindActionCreators(userPlayList, dispatch),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(Index);
