/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 23:16:43
 * @Description: 歌单详情-头部
 */
import { formatDate, formatImgSize, formatSerialNo, isEmpty } from '@/common/utils/format';
import React, { Component } from 'react'
import styles from '../css/index.module.scss';
import ReactMarkdown from 'react-markdown'
import propTypes from 'prop-types';
import { replaceName } from '@/common/utils/tools';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentPlayer, currentPlayList } from '@/store/actions';
import { message } from 'antd';
class Head extends Component {
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
    if (filterData.length > 0) {
      setCurrentPlayer(filterData[0]);
      setCurrentPlayList(filterData);
      message.info('已添加到播放列表')
    } else {
      message.error('当前歌单暂无可播放音乐')
    }
  }

  render() {
    const { data, type } = this.props;
    return (
      <div className={styles.head}>
        <img className={styles.cover_img} src={formatImgSize(data.coverImgUrl, 200, 200)} alt="" />
        <div className={styles.single_info}>
          <div className={styles.info}>
            <div className={styles.name}>
              <span>{type}</span>
              <span>{replaceName(data.userId, data.name)}</span>
            </div>
            <div className={styles.count}>
              <p>
                <span>歌曲数</span>
                <span>{data.trackCount}</span>
              </p>
              <p>
                <span>播放数</span>
                <span>{formatSerialNo(data.playCount)}</span>
              </p>
            </div>
          </div>
          <div className={styles.creator}>
            <img src={formatImgSize(data.creator && data.creator.avatarUrl, 30, 30)} alt="" />
            <span>{data.creator && data.creator.nickname}</span>
            <span>{data.createTime ? formatDate(data.createTime) + '创建' : ''}</span>
          </div>
          <div className={styles.btn_group}>
            <button onClick={() => this.playAll()}>播放全部</button>
            <button>收藏({formatSerialNo(data.subscribedCount)})</button>
            <button>分享({formatSerialNo(data.shareCount)})</button>
            <button>下载全部</button>
          </div>
          {
            !isEmpty(data.tags) ?
              < div className={styles.tags}>
                标签：
                {
                  data.tags.map((item, index) => <span key={'tag' + index}>{item}</span>)
                }
              </div>
              : null
          }
          {
            !isEmpty(data.description) ?
              < div className={styles.desc}>
                {
                  <ReactMarkdown
                    source={'简介：' + data.description.replace(/\n/g, '\n * ')}
                    escapeHtml={false}  //不进行HTML标签的转化
                  />
                }
              </div>
              : null
          }
        </div>
      </div >
    );
  }
}

Head.propTypes = {
  data: propTypes.object,
  type: propTypes.string,
  list: propTypes.array
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

export default connect(mapStateToProps, mapDispatchToProps)(Head)