/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 11:43:26
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-19 18:17:12
 * @Description: 头部 
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import LoginModel from 'components/login';
import { connect } from 'react-redux';
import SearchInput from 'pages/search/component/SearchInput';
import { bindActionCreators } from 'redux';
import { modelPower } from 'store/actions';
import { IS_SHOW_LOGIN, IS_SHOW_PLAYER, IS_SHOW_PLAYLIST } from 'store/actionTypes';
import { routerJump } from 'common/utils/tools';
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
      showColor: false,
      globalColor: '#EC4141',
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

  //修改颜色
  handleChange = c => {
    const { r, g, b } = c.rgb;
    const color = `rgba(${r},${g},${b},1)`;
    const color1 = `rgba(${r},${g},${b},0.1)`;
    const color2 = `rgba(${r},${g},${b},0.2)`;
    const color3 = `rgba(${r},${g},${b},0.3)`;
    const color4 = `rgba(${r},${g},${b},0.4)`;
    const color5 = `rgba(${r},${g},${b},0.5)`;
    const color6 = `rgba(${r},${g},${b},0.6)`;
    const color7 = `rgba(${r},${g},${b},0.7)`;
    const color8 = `rgba(${r},${g},${b},0.8)`;
    const color9 = `rgba(${r},${g},${b},0.9)`;
    // this.setState({ globalColor: color.hex });

    document.getElementsByTagName('body')[0].style.setProperty('--color', color)
    document.getElementsByTagName('body')[0].style.setProperty('--color1', color1)
    document.getElementsByTagName('body')[0].style.setProperty('--color2', color2)
    document.getElementsByTagName('body')[0].style.setProperty('--color3', color3)
    document.getElementsByTagName('body')[0].style.setProperty('--color4', color4)
    document.getElementsByTagName('body')[0].style.setProperty('--color5', color5)
    document.getElementsByTagName('body')[0].style.setProperty('--color6', color6)
    document.getElementsByTagName('body')[0].style.setProperty('--color7', color7)
    document.getElementsByTagName('body')[0].style.setProperty('--color8', color8)
    document.getElementsByTagName('body')[0].style.setProperty('--color9', color9)

  }

  componentDidMount = () => {

  }

  render() {
    const { isDrag, showColor, globalColor } = this.state;
    const { queryLoginStatus, userInfo } = this.props;
    const { loginStatus } = this.props.modelPower;
    return (
      <div
        className={styles.header}
        style={{ WebkitAppRegion: isDrag ? 'drag' : 'no-drag' }}
        onClick={() => this.props.handelHideModel()}
      >
        { showColor ? <div className={styles.colorBox} >
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
          <li onClick={() => this.setState({ showColor: !showColor })} >换肤</li>
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