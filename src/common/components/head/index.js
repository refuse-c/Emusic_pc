/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 12:59:57
 * @Description: 歌单详情-头部
 * @param {type} 1 歌单 2 歌手 3 用户 4 专辑
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
import queryString from 'query-string';
import PlayAll from '@common/components/playAll/PlayAll';
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // 渲染类型
  renderType = type => {
    switch (type) {
      case 1: return '歌单';
      case 2: return '歌手';
      case 4: return '专辑';
      default: break
    }
  }

  // 渲染名字
  renderName = (data, type) => {
    switch (type) {
      case 1: return replaceName(data.userId, data.name);
      case 3: return data.profile && data.profile.nickname
      default: return data.name
    }
  }


  renderTop = (data, type) => {
    const { fun } = this.props;
    return (
      <div className={[styles.top, type === 3 ? styles.top_border : ''].join(' ')}>
        <div className={styles.flex_box}>
          <div className={styles.name_box} >
            {/* 渲染类型 */}
            {type !== 3 ?
              <span
                className={styles.type}
              >{this.renderType(type)}</span>
              : null
            }
            {/* 渲染名字 */}
            <span className={styles.name}>
              {this.renderName(data, type)}
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
              : type === 3 ?
                <div className={styles.userBtn}>
                  <div>发私信</div>
                  <div>关注</div>
                  <div>···</div>
                </div>
                : null
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

  renderCenter = (data, type, history) => {
    return (
      type === 1 ?
        <div className={styles.center}>
          <img src={formatImgSize(data.creator && data.creator.avatarUrl, 30, 30)} alt="" />
          <span onClick={() => routerJump(history, `/home/userdetail`, queryString.stringify({ uid: data.userId }))}
          >
            {data.creator && data.creator.nickname}
          </span>
          <span>{data.createTime ? formatDate(data.createTime) + '创建' : ''}</span>
        </div>
        : type === 2 ?
          <div className={styles.artist_count}>
            {data.musicSize ? <div>单曲数：<span>{data.musicSize}</span></div> : null}
            {data.albumSize ? <div>专辑数：<span>{data.albumSize}</span></div> : null}
            {data.mvSize ? <div>MV数：<span>{data.mvSize}</span></div> : null}
          </div> :
          type === 3 ?
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
                {!isEmpty(data.description) ?
                  <ReactMarkdown
                    source={`简介：` + data.description.replace(/\n/g, '\n * ')}
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
              : type === 4 ?
                <div className={styles.user_other}>
                  <div>歌手：<span>{data.artist && data.artist.name}</span></div>
                  <div>时间：<span>{formatDate(data.publishTime)}</span></div>
                </div>
                : null
        }
      </div>
    )

  }

  renderBtn = (data, type) => {
    return (
      type === 1 || type === 4 ?
        <div className={styles.btn_group}>
          <PlayAll list={this.props.list} title="播放全部" cls={styles.btn} />
          <button className={styles.btn}>收藏({formatSerialNo(data.subscribedCount)})</button>
          <button className={styles.btn}>分享({formatSerialNo(data.shareCount)})</button>
          <button className={styles.btn}>下载全部</button>
        </div>
        : null
    )
  }

  render() {
    const { data = {}, type, history } = this.props;
    return (
      <div className={styles.head}>
        <div className={styles.cover_img}>
          <img src={formatImgSize(type === 1 ? data.coverImgUrl : type === 2 || type === 4 ? data.picUrl : data.profile && data.profile.avatarUrl, 200, 200)} alt="" />
          {type === 2 && data.accountId ?
            <div
              className={styles.accountId}
              onClick={() => routerJump(history, `/home/userdetail`, queryString.stringify({ uid: data.accountId }))}
            >个人主页</div>
            : null}
        </div>

        <div className={styles.single_info}>
          {this.renderTop(data, type)}
          {this.renderCenter(data, type, history)}
          {this.renderBtn(data, type)}
          {this.renderBottom(data, type)}

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