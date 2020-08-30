/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-30 11:55:28
 * @Description: 头部 
 */
import React, { Component } from 'react';
import Login from '../modal/Login';
import './index.scss';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      showModal: true,
    }
  }
  //显示登录框
  showModal = () => {
    this.setState({
      showModal: true,
    });
  };


  hideModal = status => {
    this.setState({
      showModal: status,
    });

  };

  render() {
    const { showModal, isLogin } = this.state;
    return (<div className="header">
      <Login showModal={showModal} hideModal={this.hideModal} />
      <div className="logo"></div>
      <ul className="tools">
        {isLogin ?
          <li>
            <i></i>
            REFUSE_C
            </li>
          :
          <li
            onClick={this.showModal}
          >
            登录
          </li>}
        <li>isvip</li>
        <li>换肤</li>
        <li>私信</li>
        <li>设置</li>
      </ul>
    </div>);
  }
}

export default Header;