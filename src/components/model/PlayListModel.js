/*
 * @Author: REFUSE_C
 * @Date: 2020-10-15 14:17:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-31 09:54:36
 * @Description: 播放列表
 */
import { currentPlayer, currentPlayList, modelPower } from 'store/actions';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import { formatSerialNo, formatSongTime } from 'common/utils/format';
import { IS_SHOW_PLAYLIST } from 'store/actionTypes';
class PlayListModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      // id: '',
    }
  }
  // 根据index的变化滚动
  scrollTop = () => {
    const { currentPlayer, currentPlayList } = this.props;
    const index = currentPlayList.findIndex(item => item.type === 'local' ? currentPlayer.name === item.name : currentPlayer.id === item.id);
    this.sc.scrollTop((index - 7) * 30);
  }

  // 清空播放列表
  handelClear = () => {
    const {
      callback,
      setCurrentPlayer,
      setCurrentPlayList
    } = this.props;
    callback && callback(); //清空播放地址并停止播放
    setCurrentPlayer({});
    setCurrentPlayList([]);
  }

  componentDidUpdate = prevState => {
    const { hasShow, currentPlayer } = this.props;
    const { id, name, type } = currentPlayer;
    if (type === 'local') {
      if (name !== prevState.currentPlayer.name || hasShow) {
        this.scrollTop();
      }
    } else {
      if (id !== prevState.currentPlayer.id || hasShow) {
        this.scrollTop();
      }
    }
  }


  render() {
    const { active } = this.state;
    const { currentPlayList, currentPlayer, isPlay, hasShow } = this.props;
    const { id, name } = currentPlayer;
    return (
      <div
        className={styles.play_list}
        // style={{ height: hasShow ? 'calc(100vh - 130px)' : '0px' }}
        style={{ transform: hasShow ? `scale(1)` : `scale(0)` }}>
        <ul className={styles.title}>
          <li
            className={active === 0 ? styles.active : null}
            onClick={() => this.setState({ active: 0 })}
          >播放列表</li>
          <li
            className={active === 1 ? styles.active : null}
            onClick={() => this.setState({ active: 1 })}
          >历史记录</li>
        </ul>
        <p
          className={styles.close}
          onClick={() => this.props.handleModelPower({ type: IS_SHOW_PLAYLIST, data: false })}
        ></p>
        <div className={styles.tool}>
          <p>{`总${currentPlayList.length}首`}</p>
          <p onClick={() => this.handelClear()}>清空</p>
        </div>
        <div className={styles.scroll}>
          <ScrollView
            ref={sc => this.sc = sc}
          >
            <ul>
              {
                currentPlayList.map((item, index) => {
                  const cls1 = (item.type === 'local' ? name === item.name : id === item.id) ? styles.active : null;
                  const cls2 = (item.type === 'local' ? name === item.name : id === item.id) ? (isPlay ? styles.icon_play : styles.icon_pause) : null;
                  return (
                    <li
                      key={`item` + index}
                      className={cls1}
                      onClick={() => this.props.setCurrentPlayer(item)}
                    >
                      <p className={cls2}>{cls2 ? '' : formatSerialNo(index + 1)}</p>
                      <p className='overflow'>{item.name}</p>
                      <p className='overflow'>{item.ar.map(item => item.name)}</p>
                      <p>{formatSongTime(item.dt)}</p>
                    </li>
                  )
                })
              }
            </ul>
          </ScrollView>
        </div>
      </div >
    );
  }
}


const mapStateToProps = state => {
  return {
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
    modelPower: state.modelPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleModelPower: bindActionCreators(modelPower, dispatch),
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListModel)
