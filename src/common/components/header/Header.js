/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-26 02:47:39
 * @Description: 头部 
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import Login from '../modal/LoginModal';
import { connect } from 'react-redux';
import Searchs from '@pages/search';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_SKIN } from '@/store/actionTypes';
import { getLocal } from '@/common/utils/tools';
import { withRouter } from 'react-router-dom';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
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
    return (<div className={styles.header}>
      <Login showModal={loginStatue} hideModal={this.hideModal} />
      <div className={styles.header_left}>
        <div className={styles.logo}></div>
        <div className={[styles.arrow, styles.arrow_left].join(' ')} onClick={() => this.go(-1)}></div>
        <div className={[styles.arrow, styles.arrow_right].join(' ')} onClick={() => this.go(1)}></div>
        <Searchs />
      </div>
      <ul className={styles.header_right}>
        {userInfo ?
          <li onClick={() => this.props.handleModalPower({ type: IS_SHOW_LOGIN, data: true })}>
            <p className={styles.avatar} style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}></p>
            <p className={styles.nickname}>
              {userInfo.nickname}
              <span className={styles.vip}></span>
              <span className={styles.arrow}></span>
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