/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 12:52:17
 * @Description: 头部 
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import Login from '../modal/LoginModal';
import { connect } from 'react-redux';
import SearchInput from '@pages/search/component/SearchInput';
import { bindActionCreators } from 'redux';
import { modalPower, queryUserInfo, userPlayList } from '@/store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_SKIN } from '@/store/actionTypes';
import { getLocal, reLocal, routerJump } from '@/common/utils/tools';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '@/common/utils/format';
import { logout } from '@/common/api/api';
import { message, Tooltip } from 'antd';

// 使用electron 最小化 关闭 
const { ipcRenderer: ipc } = window.require('electron');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  /**
   * @name: 路由控制上一页 下一页
   * @param {number}  
   */
  go = setp => {
    this.props.history.go(setp)
  }

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

  render() {
    const { history } = this.props;
    const { loginStatue } = this.props.modalPower;
    const userInfo = getLocal('userInfo') || {};
    return (<div className={styles.header}>
      <Login
        history={history}
        showModal={loginStatue}
        hideModal={this.hideModal}
      />
      <div className={styles.header_left}>
        <div
          className={styles.logo}
          onClick={() => routerJump(history, `/home/mylove`)}
        ></div>
        <div
          onClick={() => this.go(-1)}
          className={[styles.arrow, styles.arrow_left].join(' ')}
        ></div>
        <div
          onClick={() => this.go(1)}
          className={[styles.arrow, styles.arrow_right].join(' ')}
        ></div>
        <SearchInput history={history} />
      </div>
      <ul className={styles.header_right}>
        {!isEmpty(userInfo) ?
          <Tooltip title={`点击此处退出登录`}>
            <li onClick={() => this.logout()}>
              <p
                className={styles.avatar}
                style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}
              ></p>
              <p className={styles.nickname} >
                {userInfo.nickname}
                <span className={styles.vip}></span>
                <span className={styles.arrow}></span>
              </p>
            </li>
          </Tooltip>
          :
          <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_LOGIN, data: true })}>
            登录
          </li>
        }
        <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_SKIN, data: true })}>换肤</li>
        <li>私信</li>
        <li>设置</li>
        <Tooltip title={`最小化`}>
          <li className={styles.minu}
            onClick={() => ipc.send('min')}
          ></li>
        </Tooltip>
        <Tooltip title={`关闭`}>
          <li className={styles.close}
            onClick={() => ipc.send('close')}
          ></li>
        </Tooltip>
      </ul >
    </div >);
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
    handeUserPlayList: bindActionCreators(userPlayList, dispatch)
  }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Header));