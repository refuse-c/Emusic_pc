/*
 * @Author: REFUSE_C
 * @Date: 2020-10-10 15:55:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-02 18:46:20
 * @Description 播放组件
 */
import { cutSong } from '@/common/utils/tools';
import { currentPlayer, currentPlayList, currentTime } from '@/store/actions';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount = () => {
    const { audio } = this;
    global.audio = audio;
    const { callback } = this.props;
    // 当前音乐播放完毕自动播放下一曲
    audio.addEventListener('ended', () => {
      const {
        currentPlayer,
        currentPlayList,
        setCurrentPlayer
      } = this.props;
      const { id } = currentPlayer;
      global.range.style.backgroundSize = `0% 100%`;
      const data = cutSong(id, currentPlayList, 2, 1);
      setCurrentPlayer(data)
    });
    audio.volume = 0.5;
    // 监听播放
    audio.addEventListener('timeupdate', () => {
      const { currentTime, duration } = audio;
      callback && callback(duration);
      this.props.setCurrentTime(currentTime)
    });

    this.audio.addEventListener('playing', () => {

    });

    this.audio.addEventListener('pause', () => {

    });

  }

  componentDidUpdate = () => {
    const { isPlay, url } = this.props;
    if (!url) return;
    isPlay ? this.audio.play() : this.audio.pause();
  }




  render() {
    const { url, orderType } = this.props;
    return (
      <audio
        src={url}
        crossOrigin="anonymous"
        loop={orderType === 3 ? true : false}
        ref={(audio => this.audio = audio)}
      >
      </audio>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentTime: state.currentTime,
    currentPlayList: state.currentPlayList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: bindActionCreators(currentTime, dispatch), // 当前播放歌单列表
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);