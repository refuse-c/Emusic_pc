/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-19 21:10:26
 * @Description: 歌单详情-头部
 * @param {type} 1 歌单 2 歌手 3 用户
 */
import { formatDate, formatImgSize, formatSerialNo, isEmpty } from '@/common/utils/format';
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import ReactMarkdown from 'react-markdown'
import propTypes from 'prop-types';
import { replaceName, routerJump } from '@/common/utils/tools';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentPlayer, currentPlayList } from '@/store/actions';
import { message } from 'antd';
import queryString from 'query-string';
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
      <div className={[styles.top, type === 3 ? styles.top_border : ''].join(' ')}>
        <div className={styles.flex_box}>
          <div className={styles.name_box} >
            {type !== 3 ?
              <span
                className={styles.type}
              > {type === 1 ? '歌单' : '歌手'}</span>
              : null
            }

            <span className={styles.name}>
              {
                type === 1 ?
                  replaceName(data.userId, data.name) :
                  type === 2 ? data.nickname : data.profile && data.profile.nickname
              }
            </span>

            {
              data.profile && data.profile.vipType > 0 ?
                <span className={styles.vipType}></span>
                : null}

            {
              data.profile && data.profile.gender ?
                <span className={data.profile && data.profile.gender === 1 ? styles.man : styles.woman}></span>
                : null
            }

            {
              data && data.level ?
                <span className={styles.level}> Lv.{data && data.level}</span>
                : null
            }
          </div >
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
              >{data.followed ? '已收藏' : '收藏'}
              </div>
              : <div className={styles.userBtn}>
                <div>发私信</div>
                <div>关注</div>
                <div>···</div>
              </div>
          }
        </div>
        <ul className={styles.allAuthTypes}>
          {
            data.profile && data.profile.allAuthTypes && data.profile.allAuthTypes.map((item, index) => {
              return (
                <li key={`item` + index}><span></span>{item.desc}</li>
              )
            })
          }
        </ul>
      </div >
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
          </div> :
          <div className={styles.userCount}>
            <div>
              <span>{data.profile && data.profile.eventCount}</span>
              <span>动态</span>
            </div>
            <div>
              <span>{data.profile && data.profile.follows}</span>
              <span>关注</span>
            </div>
            <div>
              <span>{data.profile && data.profile.followeds}</span>
              <span>粉丝</span>
            </div>
          </div>
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
            : type === 3 ?
              <div className={styles.user_other}>
                {type === 2 ? <div>社交网络：</div> : null}
                {type === 2 ? <div>所在地区：</div> : null}
                {data.profile && data.profile.signature ? <div>个人介绍：{data.profile && data.profile.signature}</div> : null}
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
    const { data = {}, type, history } = this.props;
    return (
      <div className={styles.head}>
        <div className={styles.cover_img}>
          <img src={formatImgSize(type === 1 ? data.coverImgUrl : type === 2 ? data.picUrl : data.profile && data.profile.avatarUrl, 200, 200)} alt="" />
          {type === 2 && data.accountId ?
            <div
              className={styles.accountId}
              onClick={() => routerJump(history, `/userdetail`, queryString.stringify({ uid: data.accountId }))}
            >个人主页</div>
            : null}
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