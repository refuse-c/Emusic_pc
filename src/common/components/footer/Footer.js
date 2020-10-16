/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-16 11:33:59
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Audio from '@components/audio';
import PlayList from '@components/modal/PlayListModal';
import { connect } from 'react-redux';
import { songUrl } from '@/common/api/api';
import { bindActionCreators } from 'redux';
import { currentPlayer, currentPlayList, modalPower } from '@/store/actions';
import { cutSong } from '@/common/utils/tools';
import { message } from 'antd';
import { formatSongTime } from '@/common/utils/format';
import { IS_SHOW_PLAYLIST } from '@/store/actionTypes';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      url: '',
      isPlay: false,
      orderType: 1,
      currentIndex: 0,
      currentTime: 0, // 当前播放时间
      duration: 0, // 当前音乐总时间
      currentPlayer: {}
    }
  }

  // 获取音乐播放地址
  getSongUrl = async () => {
    const { id } = this.state
    this.setState({ url: '' })
    const res = await songUrl({ id, br: 128000 })
    if (res.code === 200) this.setState({ url: res.data[0].url, isPlay: true })
  }

  // 点击歌单列表清空按钮回调
  playListCallback = () => {
    this.setState({ url: '', isPlay: false })
  }

  // 切歌
  handelCutSong = type => {
    const {
      currentPlayer,
      currentPlayList,
      setCurrentPlayer
    } = this.props;
    const { orderType } = this.state;
    const { id } = currentPlayer;
    const data = cutSong(id, currentPlayList, type, orderType);
    setCurrentPlayer(data)
  }

  // 返回音乐的当前时间 / 总时间
  cabackCurrentTime = (currentTime, duration) => {
    this.setState({ currentTime, duration })
  }

  //  设置播放顺序
  setOrderType = () => {
    const { orderType } = this.state;
    let order = orderType;
    message.destroy();
    switch (orderType) {
      case 1:
        order = 2;
        message.info('随机播放');
        break;
      case 2:
        order = 3;
        message.info('单曲循环');
        break;
      default: order = 1;
        message.info('顺序播放');
        break;
    }
    this.setState({ orderType: order })
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { currentPlayer } = nextProps;
    const { id } = nextProps.currentPlayer;
    if (id !== prevState.id) {
      return {
        id,
        currentPlayer,
        props: {
          id: id,
          currentPlayer: currentPlayer
        },
      };
    }
    return null;
  }

  componentDidUpdate = prevState => {
    const { id } = prevState.currentPlayer;
    if (id !== this.state.id && this.state.id !== undefined) {
      this.getSongUrl();
    }
  }

  render() {
    const { playListStatus } = this.props.modalPower;
    const { url, isPlay, orderType, currentTime, duration, currentPlayer } = this.state;
    return (
      <div className={styles.footer}>
        <Audio
          url={url}
          isPlay={isPlay}
          callback={this.cabackCurrentTime}
          orderType={orderType}
        />

        <PlayList
          isPlay={isPlay}
          playListStatus={playListStatus}
          callback={this.playListCallback}
        />
        <img src={(currentPlayer.al && currentPlayer.al.picUrl) || require('@images/album.png')} alt="" />
        <div className={styles.control}>
          <i className={styles.prev}
            onClick={() => this.handelCutSong(1)}
          ></i>
          <i
            className={isPlay ? styles.pause : styles.play}
            onClick={() => url ? this.setState({ isPlay: !isPlay }) : null}
          ></i>
          <i
            className={styles.next}
            onClick={() => this.handelCutSong(2)}
          ></i>
        </div>
        <div className={styles.progress}>
          <span>{formatSongTime(currentTime, true)}</span>
          <p></p>
          <span>{formatSongTime(duration, true)}</span>
        </div>
        <div className={styles.volume}>
        </div>
        <div className={styles.tool}>
          <i
            className={styles.order}
            onClick={() => this.setOrderType()}>
          </i>
          <i className={styles.Sound_quality}></i>
          <i className={styles.lyrics}></i>
          <i
            className={styles.song_list}
            onClick={() => this.props.handleModalPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus })}
          ></i>
        </div>
      </ div >
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleModalPower: bindActionCreators(modalPower, dispatch),
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);