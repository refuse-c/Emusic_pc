/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 16:14:47
 * @Description: 头部 
 */
import React, { Component } from 'react';
import Login from '../modal/LoginModal';
import './index.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_SKIN } from '@/store/actionTypes';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }


  render() {
    const { isLogin } = this.state;
    const { loginStatue } = this.props.modalPower;
    console.log(loginStatue)
    return (<div className="header">
      <Login showModal={loginStatue} hideModal={this.hideModal} />
      <div className="logo"></div>
      <ul className="tools">
        {isLogin ?
          <li>
            <i></i>
            REFUSE_C
            </li>
          :
          <li onClick={() => this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: true })}>
            登录
          </li>}
        <li>isvip</li>
        <li onClick={() => this.props.handelModalPower({ type: IS_SHOW_SKIN, data: true })}>换肤</li>
        < li > 私信</li>
        <li>设置</li>
      </ul >
    </div >);
  }
}



const mapStateToprops = state => {
  console.log(state)
  return {
    userInfo: state.userInfo,
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelModalPower: bindActionCreators(modalPower, dispatch)
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(Header);