/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 20:05:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-30 15:22:52
 * @Description: 播放全部
 */
import React, { Component } from 'react'
import './index.scss';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPlayList, currentPlayer } from 'store/actions';
import { message } from 'antd';
class PlayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // 播放全部
  playAll = () => {
    const {
      list,
      setCurrentPlayer,
      setCurrentPlayList
    } = this.props;
    const filterData = list.filter(item => item.st !== -200); // 筛选出没有版权的音乐
    message.destroy();
    if (filterData.length) {
      console.log(filterData[0])
      setCurrentPlayer(filterData[0]);
      setCurrentPlayList(filterData);
      message.info('已添加到播放列表')
    } else {
      message.error('当前无可播放音乐')
    }
  }

  render() {
    /*
    传入fun时可不传list
    传入list时 length小于1则调用fun方法 
    */
    const { title, cls, fun, list = [] } = this.props;
    return (
      <div
        className={cls}
        onClick={list.length ? this.playAll : fun}
      >
        {title}
      </div>
    );
  }
}

PlayAll.propTypes = {
  title: propTypes.string,
  cls: propTypes.string,
  fun: propTypes.func,
  list: propTypes.array,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayAll)