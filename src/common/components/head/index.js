/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-18 23:02:32
 * @Description: 歌单详情-头部
 * @param {type} 1 歌单 2 歌手 3 用户
 */
import { formatDate, formatImgSize, formatSerialNo, isEmpty } from '@/common/utils/format';
import React, { Component } from 'react'
import styles from './css/index.module.scss';
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




  renderTop = (data, type) => {
    const { fun } = this.props;
    return (
      <div className={styles.top}>
        <div className={styles.name_box}>
          {type !== 3 ?
            <span
              className={styles.type}
            > {type === 1 ? '歌单' : '歌手'}</span>
            : null
          }
          <span className={styles.name}>{replaceName(data.userId, data.name)}</span>
        </div>
        {type === 1 ?
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
          :
          type === 2 ?
            <div
              className={[styles.followed, data.followed ? styles.is_followed : styles.not_followed].join(' ')}
              onClick={() => fun(data.id, data.followed ? 2 : 1)}
            >{data.followed ? '已收藏' : '收藏'}</div>
            : '用户'
        }
      </div>
    )
  }

  renderCenter = (data, type) => {
    return (
      type === 1 ?
        <div className={styles.center}>
          <img src={formatImgSize(data.creator && data.creator.avatarUrl, 30, 30)} alt="" />
          <span>{data.creator && data.creator.nickname}</span>
          <span>{data.createTime ? formatDate(data.createTime) + '创建' : ''}</span>
        </div>
        : type === 2 ?
          <div className={styles.artist_count}>
            {data.musicSize ? <div>单曲数：<span>{data.musicSize}</span></div> : null}
            {data.albumSize ? <div>专辑数：<span>{data.albumSize}</span></div> : null}
            {data.mvSize ? <div>MV数：<span>{data.mvSize}</span></div> : null}
          </div> : null
    )
  }

  renderBottom = (data, type) => {
    return (
      <div className={styles.other}>
        {
          type === 1 ?
            <div>
              <div className={styles.tags}>
                标签：
                {
                  !isEmpty(data.tags) ?
                    data.tags.map((item, index) => <span key={'tag' + index}>{item}</span>) : null
                }
              </div>
              <div className={styles.desc}>
                简介：
                {!isEmpty(data.description) ?
                  <ReactMarkdown
                    source={data.description.replace(/\n/g, '\n * ')}
                    escapeHtml={false}  //不进行HTML标签的转化
                  />
                  : null
                }
              </div>
            </div>
            : null
        }
      </div>
    )

  }

  renderBtn = (data, type) => {
    return (
      type === 1 ?
        <div className={styles.btn_group}>
          <button onClick={() => this.playAll()}>播放全部</button>
          <button>收藏({formatSerialNo(data.subscribedCount)})</button>
          <button>分享({formatSerialNo(data.shareCount)})</button>
          <button>下载全部</button>
        </div>
        : null
    )
  }

  render() {
    const { data, type } = this.props;
    return (
      <div className={styles.head}>
        <div className={styles.cover_img}>
          <img src={formatImgSize(data.coverImgUrl || data.picUrl, 200, 200)} alt="" />
          {type === 2 && data.accountId ? <div className={styles.accountId}>个人主页</div> : null}
        </div>

        <div className={styles.single_info}>
          {this.renderTop(data, type)}
          {this.renderCenter(data, type)}
          {this.renderBottom(data, type)}
          {this.renderBtn(data, type)}
        </div>
      </div >
    );
  }
}

Head.propTypes = {
  data: propTypes.object,
  type: propTypes.number,
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