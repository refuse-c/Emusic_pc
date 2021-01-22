/*
 * @Author: REFUSE_C
 * @Date: 2020-12-25 17:22:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-22 14:23:56
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
    ipc.on("asynchronous-reply", function (event, list) {
      console.log(list)
      // 这里的arg是从主线程请求的数据
      message.destroy();
      message.info('检索本地音乐已完成');
      that.setState({ list }, () => setLocal('list', list))
    });
  }

  onChange = e => {
    const data = e.target.files;
    if (!data.length) return;
    const { path, name } = e.target.files[0]
    const currentPath = path.split(name)[0];
    setLocal('currentPath', currentPath);
    ipc.send("asynchronous-message", currentPath)
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
            <div>
              选择目录
            <input
                type="file"
                directory={`true`}
                webkitdirectory={`true`}
                onChange={this.onChange} alt="" />
            </div>
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