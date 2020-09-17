/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-17 18:46:14
 * @Description: 头部 
 */
import React, { Component } from 'react';
import Login from '../modal/LoginModal';
import './index.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_SKIN } from '@/store/actionTypes';
import { getLocal } from '@/common/utils/tools';
import { withRouter } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }
  /**
   * @name: 路由控制上一页 下一页
   * @param {number}  
   */

  go = setp => {
    this.props.history.go(setp)
  }


  render() {
    const { loginStatue } = this.props.modalPower;
    const userInfo = getLocal('userInfo') || {};
    return (<div className="header">
      <Login showModal={loginStatue} hideModal={this.hideModal} />
      <div className="header-left">
        <div className="logo"></div>
        <div className='arrow arrow-left' onClick={() => this.go(-1)}></div>
        <div className='arrow arrow-right' onClick={() => this.go(1)}></div>
      </div>
      <ul className="header-right">
        {userInfo ?
          <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_LOGIN, data: true })}>
            <p className="avatar" style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}></p>
            <p className='nickname'>
              {userInfo.nickname}
              <span className="vip"></span>
              <span className="arrow"></span>
            </p>
          </li>
          :
          <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_LOGIN, data: true })}>
            登录
          </li>
        }
        <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_SKIN, data: true })}>换肤</li>
        <li> 私信</li>
        <li>设置</li>
      </ul>
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
    handleModalPower: bindActionCreators(modalPower, dispatch)
  }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Header));