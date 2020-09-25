/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-25 16:01:51
 * @Description: 头部 
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import Login from '../modal/LoginModal';
// import SearchModal from '../modal/SearchModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_SKIN } from '@/store/actionTypes';
import { getLocal } from '@/common/utils/tools';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import { searchDefault } from '@/common/api/search';
import { isEmpty } from '@/common/utils/format';
const { Search } = Input;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      defaultKeyword: '',
      searchType: '',
      value: '',
    }
  }
  /**
   * @name: 路由控制上一页 下一页
   * @param {number}  
   */

  go = setp => {
    this.props.history.go(setp)
  }

  // 查询搜索框默认显示的文字 
  querySearchDefault = async () => {
    const res = await searchDefault();
    if (res.code !== 200) return;
    console.log(res.data)
    const { showKeyword: defaultKeyword, searchType } = res.data;
    this.setState({ defaultKeyword, searchType })
  }

  // 搜索框搜索
  onSearch = () => {
    const { value, defaultKeyword } = this.state;
    if (isEmpty(value.trim())) {
      this.setState({ value: defaultKeyword }, () => {
        console.log(this.state.value)
      })
    } else {
      console.log('直接发接口')
    }
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
  }

  componentDidMount = () => {
    this.querySearchDefault();
  }
  render() {
    const { defaultKeyword, searchType } = this.state;
    console.log(defaultKeyword, searchType)
    const { loginStatue } = this.props.modalPower;
    const userInfo = getLocal('userInfo') || {};
    return (<div className={styles.header}>
      <Login showModal={loginStatue} hideModal={this.hideModal} />
      {/* <SearchModal /> */}
      <div className={styles.header_left}>
        <div className={styles.logo}></div>
        <div className={[styles.arrow, styles.arrow_left].join(' ')} onClick={() => this.go(-1)}></div>
        <div className={[styles.arrow, styles.arrow_right].join(' ')} onClick={() => this.go(1)}></div>
        <Search
          size={`small`}
          borderd={`false`}
          allowClear
          onChange={this.onChange}
          onSearch={(e) => this.onSearch(e)}
          loading={false}
          placeholder={defaultKeyword}
        />
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