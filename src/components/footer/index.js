/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 20:06:18
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Audio from 'components/audio';
import Player from 'pages/player';
import PlayList from 'components/modal/PlayListModal';
import { connect } from 'react-redux';
import { lyric, songUrl } from 'common/api/api';
import { bindActionCreators } from 'redux';
import { currentPlayer, currentPlayList, currentTime, modalPower } from 'store/actions';
import { cutSong, formatLrc } from 'common/utils/tools';
import { message, Tooltip } from 'antd';
import { formatImgSize, formatSongTime } from 'common/utils/format';
import { IS_SHOW_PLAYER, IS_SHOW_PLAYLIST } from 'store/actionTypes';
import { withRouter } from 'react-router-dom';
import Like from 'components/like';
// electron 键盘事件 
const { ipcRenderer: ipc } = window.require('electron');
let timer1;
let timer2;
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      url: '',
      uid: '',
      isPlay: false,
      orderType: 1,// 播放模式 1 顺序播放 2 随机播放 3 单曲循环
      rangeVal: 0, // 进度条数值
      duration: 0, // 当前音乐总时间
      currentIndex: 0,
      volumeVal: 50,
      audioVolume: 0.5,
      currentPlayer: {},
      lyricText: [],
      rotate: 0,
      isShowVolume: false
    }
  }

  // 通过键盘组合件调整音量
  keyboardSetVolume = (type) => {
    const { volume } = this;
    const { volumeVal } = this.state;
    let val = type === 'Up' ? Number(volumeVal) + 10 : Number(volumeVal) - 10;
    val = val >= 100 ? 100 : val;
    val = val <= 0 ? 0 : val;
    const audioVolume = val / 100;
    clearTimeout(timer2);
    this.setState({ audioVolume, volumeVal: val, isShowVolume: true }, () =>
      timer2 = setTimeout(() => {
        this.setState({ isShowVolume: false })
      }, 1000))
    volume.style.backgroundSize = audioVolume * 100 + `% 100%`;
  }

  // 全局键盘事件
  keyboardEvents = type => {
    switch (type) {
      case 'Up':
      case 'Down':
        this.keyboardSetVolume(type);
        break;
      case 'Left':
      case 'Right':
        type === 'Left' ? this.handelCutSong(1) : this.handelCutSong(2);
        break;
      case 'Space': this.handelIsPlay(); break;
      default: break;
    }
  }

  // 专辑图旋转
  handelIsPlay = () => {
    const { isPlay } = this.state;
    if (isPlay) {
      clearInterval(timer1);
      this.setState({ isPlay: false })
    } else {

      timer1 = setInterval(() => {
        const { rotate } = this.state;
        let num = rotate > 360 ? 0 : rotate + 0.1
        this.setState({ rotate: num })
      }, 10);
      this.setState({ isPlay: true })
    }

  }

  // 获取音乐播放地址
  getSongUrl = async (type = true) => {
    const { id } = this.state
    const res = await songUrl({ id, br: 128000 })
    const { url } = (res.data && res.data[0]) || '';
    this.getLyric(id); // 获取歌词
    if (url && type) {
      clearInterval(timer1);
      timer1 = setInterval(() => {
        const { rotate } = this.state;
        let num = rotate > 360 ? 0 : rotate + 1
        this.setState({ rotate: num })
      }, 30);
    }
    this.setState({ url, isPlay: url && type })
  }

  // 获取音乐播放地址
  getLyric = async id => {
    const res = await lyric({ id })
    const { lrc, klyric, tlyric, nolyric, needDesc } = res;
    const lyricText = nolyric || needDesc ? '' : lrc.lyric || klyric.lyric || tlyric.lyric || '';
    this.setState({ lyricText: formatLrc(lyricText) })
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
    this.range.style.backgroundSize = `0% 100%`;
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

  // 调整歌曲进度
  changeProgress = () => {
    const { max, value } = this.range;
    const { duration } = this.state;
    if (!duration) return;
    const changeCurrentTime = (value / max) * duration;
    global.audio.currentTime = changeCurrentTime;
    this.props.setCurrentTime(changeCurrentTime);
  };

  // 调整音量
  changeVolume = () => {
    clearTimeout(timer2);
    const { volume } = this;
    const volumeVal = volume.value;
    const audioVolume = volume.value / volume.max;
    this.setState({ audioVolume, volumeVal, isShowVolume: true }, () =>
      timer2 = setTimeout(() => {
        this.setState({ isShowVolume: false })
      }, 1000))
    volume.style.backgroundSize = audioVolume * 100 + `% 100%`;
  }

  componentDidMount = () => {
    const that = this;
    const { range, volume } = this;
    const { id, volumeVal } = this.state;
    global.range = range;

    const audioVolume = volumeVal / volume.max;
    this.setState({ audioVolume })
    volume.style.backgroundSize = audioVolume * 100 + `% 100%`;
    if (id) this.getSongUrl(false);
    ipc.on('Up', (e, message) => that.keyboardEvents(message))
    ipc.on('Down', (e, message) => that.keyboardEvents(message))
    ipc.on('Left', (e, message) => that.keyboardEvents(message))
    ipc.on('Right', (e, message) => that.keyboardEvents(message))
    ipc.on('Space', (e, message) => that.keyboardEvents(message))
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


  componentDidUpdate = prevProps => {
    const { id } = prevProps.currentPlayer;
    if (id !== this.state.id && this.state.id !== undefined) {
      this.getSongUrl();
    }
  }

  componentWillUnmount = () => {
    clearInterval(timer1);
    this.setState({ isPlay: false })
  }
  render() {
    const { currentTime, queryLikeList, likeListIds, reloadPlayList } = this.props;
    const { playListStatus, playerStatus } = this.props.modalPower;
    const { id, url, isPlay, orderType, duration, currentPlayer, rangeVal, volumeVal, audioVolume, lyricText, rotate, isShowVolume } = this.state;
    return (
      <div className={styles.footer}>
        <Audio
          url={url}
          volume={audioVolume}
          isPlay={isPlay}
          orderType={orderType}
          callback={this.cabackCurrentTime}
        />

        <PlayList
          isPlay={isPlay}
          playListStatus={playListStatus}
          callback={this.playListCallback}
        />
        <Player
          isPlay={isPlay}
          hasShow={playerStatus}
          lyricText={lyricText}
          data={currentPlayer}
          rotate={rotate}
          likeListIds={likeListIds}
          currentTime={currentTime}
        />
        <div
          className={styles.left}
          onClick={() => {
            if (currentPlayer.al) this.props.handleModalPower({ type: IS_SHOW_PLAYER, data: !playerStatus })
          }}>
          {
            currentPlayer.al ?
              <img
                src={formatImgSize(currentPlayer.al.picUrl, 50, 50) || require('common/images/album.png')} alt="" />
              : null
          }
          <div className={styles.music_info}>
            <div>
              <p className="overflow">{currentPlayer.name} </p>
              {currentPlayer.al ?
                <Like
                  id={id}
                  list={likeListIds || []}
                  callBack={queryLikeList}
                  reloadPlayList={reloadPlayList}
                />
                : null}
            </div>
            <div>
              <p className="overflow">{currentPlayer.ar && currentPlayer.ar.map(item => item.name).join('/ ')}</p>
            </div>
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
              onClick={() => url ? this.handelIsPlay() : null}
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
                onChange={this.changeProgress}
                ref={(range) => (this.range = range)}
                type="range"
                min={0}
                max={1000}
                value={rangeVal || 0}
              />
            </div>
            <span>{formatSongTime(duration, true)}</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.tool}>
            <Tooltip
              visible={isShowVolume}
              title={`current volume:${volumeVal + '/' + 100}`}
            >
              <input
                className={styles.volume}
                onChange={this.changeVolume}
                ref={volume => (this.volume = volume)}
                type="range"
                min={0}
                max={100}
                value={volumeVal || 0}
              />
            </Tooltip>
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
    userInfo: state.userInfo,
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