/*
 * @Author: REFUSE_C
 * @Date: 2020-10-15 14:17:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 16:22:46
 * @Description: 播放列表
 */
import { currentPlayer, currentPlayList } from '@/store/actions';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import { formatSongTime } from '@/common/utils/format';
class PlayListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }
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
  render() {
    const { active } = this.state;
    const { currentPlayList, currentPlayer } = this.props;
    const { id } = currentPlayer;
    return (
      <div className={styles.play_list}>
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
        <div className={styles.tool}>
          <p>{`总${currentPlayList.length}首`}</p>
          <p onClick={() => this.handelClear()}>清空</p>
        </div>
        <div className={styles.scroll}>
          <ScrollView>
            <ul>
              {
                currentPlayList.map((item, index) => {
                  const cls1 = id === item.id ? styles.active : null;
                  const cls2 = id === item.id ? styles.icon_play : null;
                  return (
                    <li
                      key={`item` + index}
                      className={cls1}
                      onClick={() => this.props.setCurrentPlayer(item)}
                    >
                      <p className={cls2}></p>
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
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayListModal)
