/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-20 21:36:11
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Audio from 'components/audio';
import Player from 'pages/player';
import PlayList from 'components/model/PlayListModel';
import { connect } from 'react-redux';
import { lyric, songUrl } from 'common/api/api';
import { bindActionCreators } from 'redux';
import { currentPlayer, currentPlayList, currentTime, modelPower } from 'store/actions';
import { cutSong, formatLrc, getLocal, setLocal } from 'common/utils/tools';
import { message, Tooltip } from 'antd';
import { formatImgSize, formatSongTime } from 'common/utils/format';
import { IS_SHOW_PLAYER, IS_SHOW_PLAYLIST } from 'store/actionTypes';
import { withRouter } from 'react-router-dom';
import Like from 'components/like';
import { createFromIconfontCN } from '@ant-design/icons';
// 在 iconfont.cn 上生成
const MyIcon = createFromIconfontCN({ scriptUrl: 'http://at.alicdn.com/t/font_2338340_uxl5hou588b.js' });
// electron 键盘事件 
const { ipcRenderer: ipc } = window.require('electron');
let timer1;
let timer2;
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      url: '',
      uid: '',
      isPlay: false,
      orderType: 1,// 播放模式 1 顺序播放 2 随机播放 3 单曲循环
      rangeVal: 0, // 进度条数值
      duration: 0, // 当前音乐总时间
      currentIndex: 0,
      volumeVal: getLocal('volume') || 50,
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
    clearTimeout(timer2);
    setLocal('volume', volumeVal);
    this.setState({ volumeVal: val, isShowVolume: true }, () =>
      timer2 = setTimeout(() => {
        this.setState({ isShowVolume: false })
      }, 1000))
    if (volume) volume.style.backgroundSize = val + `% 100%`;
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
    const { id } = this.props.currentPlayer;
    const res = await songUrl({ id, br: 128000 })
    if (res.code !== 200) return;
    const { url } = (res.data && res.data[0]) || '';
    this.getLyric(id); // 获取歌词
    if (url && type) {
      clearInterval(timer1);
      timer1 = setInterval(() => {
        const { rotate } = this.state;
        let num = rotate > 360 ? 0 : rotate + 0.1
        this.setState({ rotate: num })
      }, 10);
    }
    this.setState({ url, isPlay: url && type })
  }

  // 获取歌词地址
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
  handelCutSong = types => {
    const {
      currentPlayer,
      currentPlayList,
      setCurrentPlayer
    } = this.props;
    const { range } = this;
    if (!range) return;
    const { orderType } = this.state;
    const { id, name, type } = currentPlayer;
    const data = cutSong(id, name, currentPlayList, types, orderType);
    range.style.backgroundSize = `0% 100%`;
    if (type === 'local') this.setState({ isPlay: true })
    setCurrentPlayer(data);
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
    setLocal('volume', volumeVal);
    this.setState({ volumeVal, isShowVolume: true }, () =>
      timer2 = setTimeout(() => {
        this.setState({ isShowVolume: false })
      }, 1000))
    volume.style.backgroundSize = volumeVal + `% 100%`;
  }

  componentDidMount = () => {
    const that = this;
    const { range, volume } = this;
    const { volumeVal } = this.state;
    const { id, type, url } = this.props.currentPlayer;
    global.range = range;
    volume.style.backgroundSize = volumeVal + `% 100%`;
    if (type === 'local') {
      this.setState({ url })
    } else {
      if (id) this.getSongUrl(false);
    }

    ipc.on('Up', (e, message) => that.keyboardEvents(message))
    ipc.on('Down', (e, message) => that.keyboardEvents(message))
    ipc.on('Left', (e, message) => that.keyboardEvents(message))
    ipc.on('Right', (e, message) => that.keyboardEvents(message))
    ipc.on('Space', (e, message) => that.keyboardEvents(message))
  }

  componentDidUpdate = prevProps => {
    const { id, name, type, url } = this.props.currentPlayer;
    if (type === 'local') {
      if (name !== prevProps.currentPlayer.name) {
        this.setState({ isPlay: true, url }, () => {
          clearInterval(timer1);
          timer1 = setInterval(() => {
            const { rotate } = this.state;
            let num = rotate > 360 ? 0 : rotate + 0.1
            this.setState({ rotate: num })
          }, 10);
        })
      }
    } else {
      if (id !== prevProps.currentPlayer.id) {
        this.getSongUrl();
      }
    }
  }

  componentWillUnmount = () => {
    clearInterval(timer1);
    this.setState({ isPlay: false })
  }
  render() {
    const { playListStatus, playerStatus } = this.props.modelPower;
    const { currentTime, queryLikeList, likeListIds, reloadPlayList, currentPlayer } = this.props;
    const { url, isPlay, orderType, duration, rangeVal, volumeVal, lyricText, rotate, isShowVolume } = this.state;
    return (
      <div className={styles.footer}>
        <Audio
          url={url}
          volume={volumeVal / 100 || 0}
          isPlay={isPlay}
          orderType={orderType}
          callback={this.cabackCurrentTime}
        />

        <PlayList
          isPlay={isPlay}
          hasShow={playListStatus}
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
            if (currentPlayer.al) this.props.handleModelPower({ type: IS_SHOW_PLAYER, data: !playerStatus })
          }}>
          {
            currentPlayer.al ?
              <img
                src={currentPlayer.al.picUrl ? formatImgSize(currentPlayer.al.picUrl, 50, 50) : require('common/images/defaultAlbumImg.jpg').default} alt="" />
              : null
          }
          <div className={styles.music_info}>
            <div>
              <p className="overflow">{currentPlayer.name} </p>
              {currentPlayer.al && currentPlayer.type !== 'local' ?
                <Like
                  id={currentPlayer.id}
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
          <ul className={styles.control_btn}>
            <li>
              <MyIcon
                type={orderType === 1 ? `icon-liebiaoxunhuan` : orderType === 2 ? `icon-suijibofang` : `icon-danquxunhuan`}
                onClick={() => this.setOrderType()} />
            </li>

            <li>
              <MyIcon
                rotate={180}
                type={`icon-next`}
                onClick={() => this.handelCutSong(1)}
              />
            </li>
            <li>
              <MyIcon

                type={isPlay ? `icon-bofangzanting` : `icon-bofang`}
                onClick={() => url ? this.handelIsPlay() : null}
              />
            </li>
            <li>
              <MyIcon
                type={`icon-next`}
                onClick={() => this.handelCutSong(2)}
              />
            </li>
            <li>
              <MyIcon
                type={`icon-ci`}
                onClick={() => console.log('show/hide lrc')}
              />
            </li>
          </ul>
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
            <MyIcon
              className={styles.volumeBox}
              type={Number(volumeVal) === 0 ? `icon-jingyin` : `icon-shengyin`}
            />
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
            <div className={styles.list}>
              <MyIcon
                type={`icon-list`}
                onClick={() => this.props.handleModelPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus })}
              />
            </div>
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
    modelPower: state.modelPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: bindActionCreators(currentTime, dispatch), // 当前播放歌单列表
    handleModelPower: bindActionCreators(modelPower, dispatch),
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

const box = connect(mapStateToProps, mapDispatchToProps)(Footer);
export default withRouter(box);