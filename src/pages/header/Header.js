/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-05 14:12:20
 * @Description: 头部 
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import LoginModel from 'components/login';
import { connect } from 'react-redux';
import SearchInput from 'pages/search/component/SearchInput';
import { bindActionCreators } from 'redux';
import { modelPower } from 'store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_PLAYER, IS_SHOW_PLAYLIST, IS_SHOW_SKIN } from 'store/actionTypes';
import { getLocal, routerJump, setLocal } from 'common/utils/tools';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'common/utils/format';
import { Tooltip } from 'antd';
import { BlockPicker } from 'react-color';
// 使用electron 最小化 关闭 
const { ipcRenderer: ipc } = window.require('electron');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrag: true,
      globalColor: getLocal('globalColor') || '#ec4141',
    }
  }
  /**
   * @name: 路由控制上一页 下一页
   * @param {number}  
   */
  go = setp => {
    const { playListStatus, playerStatus } = this.props.modelPower;
    if (playListStatus) { this.props.handleModelPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus }) }
    if (playerStatus) { this.props.handleModelPower({ type: IS_SHOW_PLAYER, data: !playerStatus }); return };
    this.props.history.go(setp)
  }

  callBack = id => {
    this.props.queryUserPlaylist(id)
  }
  // 是否可拖动
  handleDrag = isDrag => {
    this.setState({ isDrag })
  }

  // 是否跳转到page love
  jumpLove = () => {
    const { history } = this.props;
    const url = window.location.href.indexOf('mylove');
    url !== -1 ? history.go(-1) : routerJump(history, `/home/mylove`);
  }

  // 设置颜色
  handleChange = color => {
    let { r, g, b } = color.rgb;
    for (let index = 0; index < 10; index++) {
      const num = index === 0 ? '' : `,0.${index}`;
      setLocal(`color${index === 0 ? '' : index}`, `rgba(${r},${g},${b}${num})`)
      document.getElementsByTagName('body')[0].style.setProperty(`--color${index === 0 ? '' : index}`, `rgba(${r},${g},${b}${num})`)
    }
    // 设置取色器的颜色
    setLocal('globalColor', color.hex);
    this.setState({ globalColor: color.hex });
  }

  componentDidMount = () => {
    // 获取缓存的色值
    if (getLocal(`globalColor`)) {
      for (let index = 0; index < 10; index++) {
        const num = index === 0 ? '' : index;
        document.getElementsByTagName('body')[0].style.setProperty(`--color${num}`, getLocal(`color${num}`))
      }
    }
  }

  render() {
    const { isDrag, globalColor } = this.state;
    const { queryLoginStatus, userInfo } = this.props;
    const { loginStatus, skinStatus } = this.props.modelPower;
    return (
      <div
        className={styles.header}
        style={{ WebkitAppRegion: isDrag ? 'drag' : 'no-drag' }}
        onClick={() => this.props.handelHideModel()}
      >
        { skinStatus ? <div className={styles.colorBox} onClick={e => e.stopPropagation()}>
          <BlockPicker color={globalColor} onChange={this.handleChange} />
        </div > : null}

        <LoginModel
          hasShow={loginStatus}
          hideModel={this.hideModel}
          callBack={this.callBack}
          queryLoginStatus={queryLoginStatus}
        />
        <div className={styles.header_left}>
          <div
            className={styles.logo}
            onClick={this.jumpLove}
          ></div>
          <div
            onClick={() => this.go(-1)}
            className={[styles.arrow, styles.arrow_left].join(' ')}
          ></div>
          <div
            onClick={() => this.go(1)}
            className={[styles.arrow, styles.arrow_right].join(' ')}
          ></div>
          <SearchInput func={this.handleDrag} />
        </div>
        <ul className={styles.header_right}>
          {!isEmpty(userInfo) ?
            <Tooltip title={`点击此处退出登录`}>
              <li onClick={() => this.props.logout()}>
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
            <li onClick={() => this.props.handleModelPower({ type: IS_SHOW_LOGIN, data: true })}>
              登录
          </li>
          }
          <li onClick={() => this.props.handleModelPower({ type: IS_SHOW_SKIN, data: true })} >换肤</li>
          <li>私信</li>
          <li onClick={() => this.props.history.push({ pathname: "/home/setting" })}>设置</li>
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
      </div >
    );
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
    handleModelPower: bindActionCreators(modelPower, dispatch)
  }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Header));