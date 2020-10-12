/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-11 14:44:33
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Audio from '@components/audio';
import { connect } from 'react-redux';
import { songUrl } from '@/common/api/api';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      url: '',
      isPlay: false,
      currentPlayer: {}
    }
  }

  // 获取音乐播放地址
  getSongUrl = async () => {
    const { id } = this.state;
    const res = await songUrl({ id })
    if (res.code === 200) this.setState({ url: res.data[0].url, isPlay: true })
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
    if (id !== this.state.id) {
      this.getSongUrl();
    }
  }

  render() {
    const { url, isPlay, currentPlayer } = this.state;
    // console.log(currentPlayer)
    return (
      <div className={styles.footer}>
        <Audio
          url={url}
          isPlay={isPlay}
        />
        <img src={currentPlayer.al && currentPlayer.al.picUrl} alt="" />
        <div className={styles.control}>
          <i className={styles.prev}></i>
          <i
            className={isPlay ? styles.pause : styles.play}
            onClick={() => url ? this.setState({ isPlay: !isPlay }) : null}
          ></i>
          <i className={styles.next}></i>
        </div>
        <div className={styles.progress}>
        </div>
        <div className={styles.volume}>
        </div>
        <div className={styles.tool}>
          <i className={styles.order}></i>
          <i className={styles.Sound_quality}></i>
          <i className={styles.lyrics}></i>
          <i className={styles.song_list}></i>
        </div>
      </ div >
    );
  }
}

const mapStateToprops = state => {
  // console.log(state)
  return {
    currentPlayer: state.currentPlayer,
  }
}
// const mapDispatchToProps = dispatch => { }

export default connect(mapStateToprops, null)(Footer);