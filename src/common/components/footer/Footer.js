/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 14:02:04
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Audio from '@components/audio';
import PlayList from '@components/modal/PlayListModal';
import { connect } from 'react-redux';
import { songUrl } from '@/common/api/api';
import { bindActionCreators } from 'redux';
import { currentPlayer, currentPlayList, currentTime, modalPower } from '@/store/actions';
import { cutSong } from '@/common/utils/tools';
import { message } from 'antd';
import { formatSongTime } from '@/common/utils/format';
import { IS_SHOW_PLAYLIST } from '@/store/actionTypes';
import { withRouter } from 'react-router-dom';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      url: '',
      isPlay: false,
      orderType: 1,// 播放模式 1 顺序播放 2 随机播放 3 单曲循环
      rangeVal: 0, // 进度条数值
      duration: 0, // 当前音乐总时间
      currentIndex: 0,
      currentPlayer: {},
    }
  }

  // 获取音乐播放地址
  getSongUrl = async (type = true) => {
    const { id } = this.state
    const res = await songUrl({ id, br: 128000 })
    if (res.code === 200) this.setState({ url: res.data[0].url, isPlay: type })
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
    global.range.style.backgroundSize = `0% 100%`;
    setCurrentPlayer(data)
  }

  // 返回音乐的当前时间 / 总时间
  cabackCurrentTime = (duration) => {
    const { range } = this;
    if (!range) return;
    const { currentTime } = this.props;
    const cdColumn = currentTime / duration;
    const rangeVal = cdColumn * range.max || 0;
    range.style.backgroundSize = cdColumn * 100 + `% 100%`;
    this.setState({ duration, rangeVal })
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

  handelTogglePlayer = () => {
    const url = window.location.href;
    if (url.indexOf('player') !== -1) { this.props.history.go(-1) } else {

      this.props.history.push({ pathname: `/home/player` })
    }
  }
  changeInput = () => {
    const { max, value } = this.range;
    const { duration } = this.state;
    if (!duration) return;
    const changeCurrentTime = (value / max) * duration;
    global.audio.currentTime = changeCurrentTime;
    this.props.setCurrentTime(changeCurrentTime);
  };

  componentDidMount = () => {
    global.range = this.range;
    const { id } = this.state;
    if (id) this.getSongUrl(false);

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

  componentWillUnmount = () => {
    this.setState({ isPlay: false })
  }
  render() {
    const { currentTime } = this.props;
    const { playListStatus } = this.props.modalPower;
    const { url, isPlay, orderType, duration, currentPlayer, rangeVal } = this.state;
    return (
      <div className={styles.footer}>
        <Audio
          url={url}
          isPlay={isPlay}
          orderType={orderType}
          callback={this.cabackCurrentTime}
        />

        <PlayList
          isPlay={isPlay}
          playListStatus={playListStatus}
          callback={this.playListCallback}
        />
        <div className={styles.left} onClick={() => this.handelTogglePlayer()}>
          {currentPlayer.al ? <img src={currentPlayer.al.picUrl || require('@images/album.png')} alt="" /> : null}
          <div className={styles.music_info}>
            <p className="overflow">{currentPlayer.name}</p>
            <p className="overflow">{currentPlayer.ar && currentPlayer.ar.map(item => item.name).join('/ ')}</p>
          </div>
        </div>
        <div className={styles.control}>
          <div className={styles.control_btn}>
            <i
              className={orderType === 1 ? styles.order : orderType === 2 ? styles.random : styles.cycle}
              onClick={() => this.setOrderType()}>
            </i>
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
            <i
              className={styles.lrc}
              onClick={() => console.log('show/hide lrc')}
            ></i>

          </div>
          <div className={styles.progress}>
            <span>{formatSongTime(currentTime, true)}</span>
            <div className={styles.progress_box}>
              <input
                className={styles.range}
                onChange={this.changeInput}
                ref={(range) => (this.range = range)}
                type="range"
                min="0"
                max="1000"
                value={rangeVal || 0}
              />
            </div>
            <span>{formatSongTime(duration, true)}</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.tool}>
            <i
              className={styles.list}
              onClick={() => this.props.handleModalPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus })}
            ></i>
          </div>
        </div>
      </ div >
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime,
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: bindActionCreators(currentTime, dispatch), // 当前播放歌单列表
    handleModalPower: bindActionCreators(modalPower, dispatch),
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

const box = connect(mapStateToProps, mapDispatchToProps)(Footer);
export default withRouter(box);