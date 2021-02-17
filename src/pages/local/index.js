/*
 * @Author: REFUSE_C
 * @Date: 2020-12-25 17:22:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-17 14:59:57
 * @Description:
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { currentPlayList, currentPlayer } from 'store/actions';
import { getLocal, setLocal } from 'common/utils/tools';
import MusicList from 'components/musicList';
import ScrollView from 'react-custom-scrollbars';
import PlayAll from 'components/playAll/PlayAll';
import { message } from 'antd';
const { ipcRenderer: ipc } = window.require('electron');

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      list: getLocal('list') || []
    }
  }

  componentDidMount = () => {
    const that = this;
    // 这里是接收主进程传递过来的参数，这里的on要对应主进程send过来的名字
    ipc.on("asynchronous-reply", function (event, list, currentPath) {
      // 这里的arg是从主线程请求的数据
      message.destroy();
      list.length ? message.info(`一共为你找到${list.length}首音乐,快来听听...`) : message.info('糟糕,什么都没找到,换个目录再试试吧...');
      that.setState({ list }, () => { setLocal('list', list); setLocal('currentPath', currentPath) })
    });
  }

  refreshLocalData = () => {
    const currentPath = getLocal('currentPath');
    if (currentPath) {
      ipc.send("asynchronous-message", currentPath)
    }
  }

  render() {
    const { list } = this.state;
    const length = list.length;
    return (
      <div className={styles.local} >
        <ScrollView className={styles.local_scroll}>
          <div className={styles.title}>
            <h3>本地音乐 {length ? <span>共{length}首</span> : null} <span onClick={this.refreshLocalData}>refresh</span> </h3>
            <div onClick={() => ipc.send("asynchronous-message")}>选择目录</div>
          </div>
          <PlayAll list={list} title="播放全部" cls={'play_all_2'} />
          <MusicList list={list} type='local' />
        </ScrollView>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    userPlayList: state.userPlayList,
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}
const box = connect(mapStateToProps, mapDispatchToProps)(Local)
export default withRouter(box)