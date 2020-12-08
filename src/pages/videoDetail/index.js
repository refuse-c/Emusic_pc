/*
 * @Author: REFUSE_C
 * @Date: 2020-11-13 09:23:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 17:42:23
 * @Description
 */

import { mvUrl, videoUrl } from '@/common/api/video';
import { checkNum } from '@/common/utils/format';
import React, { Component } from 'react';
import styles from './css/index.module.scss';
class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '', url: '' }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    this.setState({ id })
    checkNum(id) ? this.queryMvUrl(id) : this.queryVideoUrl(id)
  }

  componentDidUpdate = prevProps => {
    console.log(prevProps)
  }

  // 获取mv url
  queryMvUrl = async id => {
    const res = await mvUrl({ id })
    console.log(res)
    this.setState({ url: res.data.url })
  }

  // 获取视频 url
  queryVideoUrl = async id => {
    const res = await videoUrl({ id })
    console.log(res)
  }


  render() {
    const { url } = this.state;
    return (<div className={styles.video_detail}>
      <video src={url} autoPlay></video>
    </div>);
  }
}

export default VideoDetail;