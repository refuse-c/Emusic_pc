/*
 * @Author: REFUSE_C
 * @Date: 2020-11-13 09:23:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-16 14:37:33
 * @Description
 */

import { mvDetail, mvUrl, videoDetail, videoUrl, mvSimi, vidoeSimi } from 'common/api/video';
import { checkNum, formatDate, formatImgSize, formatSerialNo } from 'common/utils/format';
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import Similar from './component/Similar';
class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      url: '',
      data: {},
      simiData: [], // 相似视频
      type: null // 1 mv 2 video
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    this.setState({ id })
    checkNum(id) ? this.queryMvDetail(id) : this.queryVideoDetail(id);
    checkNum(id) ? this.queryMvSimi(id) : this.queryVidoeSimi(id);
  }


  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { id } = nextProps.match.params;
    if (id !== prevState.id) {
      return {
        id,
        props: {
          id
        }
      };
    }
    return null;
  }

  componentDidUpdate = prevState => {
    const { id } = this.state;
    const prevId = prevState.match.params.id;
    if (id !== prevId) {
      checkNum(id) ? this.queryMvDetail(id) : this.queryVideoDetail(id);
      checkNum(id) ? this.queryMvSimi(id) : this.queryVidoeSimi(id);
    }
  }

  // 获取相似的mv
  queryMvSimi = async mvid => {
    const res = await mvSimi({ mvid })
    this.setState({ simiData: res.mvs })
  }

  // 获取相似的视频
  queryVidoeSimi = async id => {
    const res = await vidoeSimi({ id })
    if (res.code !== 200) return;
    this.setState({ simiData: res.data })
  }


  //  获取mv数据
  queryMvDetail = async (id) => {
    const res = await mvDetail({ mvid: id })
    if (res.code !== 200) return;
    this.queryMvUrl(id);
    this.setState({ data: res.data, type: 1 })
  }

  //  获取视频数据
  queryVideoDetail = async (id) => {
    const res = await videoDetail({ id })
    if (res.code !== 200) return;
    this.queryVideoUrl(id);
    this.setState({ data: res.data, type: 2 })
  }


  // 获取mv url
  queryMvUrl = async id => {
    const res = await mvUrl({ id })
    if (res.code !== 200) return;
    this.setState({ url: res.data.url })
  }

  // 获取视频 url
  queryVideoUrl = async id => {
    const res = await videoUrl({ id })
    if (res.code !== 200) return;
    const url = res.urls[0].url;
    this.setState({ url })
  }


  render() {
    const { url, data, type, id, simiData } = this.state;
    return (
      <div className={styles.video_detail}>
        {/* <div className={styles.aa}></div> */}
        <ScrollView className={styles.video_scroll}>
          <div className={styles.scroll_box}>
            {/* 左边部分 */}
            <div className={styles.video_left}>
              <h3>{type === 1 ? 'mv详情' : type === 2 ? '视频详情' : '视频获取失败'}</h3>
              <video src={url} controls ></video>
              <div className={styles.video_info}>
                <div className={styles.user_info}>
                  <div>
                    <img src={formatImgSize((data.cover && data.cover), 50, 50) || (data.creator && data.creator.avatarUrl)} alt="" />
                    <span>{(data.artistName && data.artistName) || (data.creator && data.creator.nickname)}</span>
                  </div>
                  {type === 2 ? <p>关注</p> : null}
                </div>
                <p className={styles.title}>{(data.name && data.name) || (data.title && data.title)}</p>
                <div className={styles.play_time}>
                  <p>发布：{formatDate(data && data.publishTime)}</p>
                  <p>播放：{formatSerialNo(type === 1 ? data.playCount : type === 2 ? data.playTime : '')}</p>
                </div>
                <ul className={styles.video_tag}>
                  {
                    data && data.videoGroup && data.videoGroup.map((item, index) => {
                      return (
                        <li key={index}>{item.name}</li>
                      )
                    })}
                </ul>
                <div className={styles.tool}>
                  <div>
                    <button>赞{data.praisedCount || ''}</button>
                    <button>收藏{data.subscribeCount || ''}</button>
                    <button>分享{data.shareCount || ''}</button>
                  </div>
                  <p>举报</p>
                </div>
              </div>
            </div>
            {/* 右边部分 */}
            <div className={styles.video_right}>
              <h3>相关推荐</h3>
              <Similar type={type} id={id} data={simiData || []} />
              {/* <div className={styles.simi_music}>
                <h3>相似音乐</h3>

              </div> */}
            </div>
          </div>
        </ScrollView>
      </div >);
  }
}

export default VideoDetail;