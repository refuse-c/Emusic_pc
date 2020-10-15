/*
 * @Author: REFUSE_C
 * @Date: 2020-10-10 15:55:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 17:53:15
 * @Description 播放组件
 */
import { currentPlayer, currentPlayList } from '@/store/actions';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount = () => {
    // 当前音乐播放完毕自动播放下一曲
    this.audio.addEventListener('ended', () => {
      const {
        currentPlayer,
        currentPlayList,
        setCurrentPlayer
      } = this.props;
      const { id } = currentPlayer;
      const listLength = currentPlayList.length;
      let index = currentPlayList.findIndex(item => id === item.id);
      index++;
      index = index === listLength ? 0 : index;
      setCurrentPlayer(currentPlayList[index])
    });
  }

  componentDidUpdate = () => {
    const { isPlay, url } = this.props;
    if (!url) return;
    isPlay ? this.audio.play() : this.audio.pause();
  }

  render() {
    const { url } = this.props;
    return (
      <audio
        src={url}
        loop={false}
        ref={(audio => this.audio = audio)}
        crossOrigin="anonymous">
        {/* <source ref={(source => this.source = source)} src={url}></source> */}
      </audio>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);