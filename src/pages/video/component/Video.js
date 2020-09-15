/*
 * @Author: REFUSE_C
 * @Date: 2020-09-13 02:34:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 23:18:49
 * @Description: 视频-视频
 */
import React, { Component } from 'react';
import VideoList from './VideoList';
import { Spin } from 'antd';
import { hotVideoTag, allVideoTag, allVideo, videoGroup } from '@/common/api/api';
import styles from '../css/index.module.scss';
import VideoTag from './VideoTag';
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '全部视频',
      tagId: '',
      offset: 0,
      hasmore: false,
      showModal: false,
      loading: true,
      hotVideoTagList: [],
      allVideoTagList: [],
      videoDataList: []
    }
  }

  // 获取热门视频标签
  queryHotVideoTag = async () => {
    const res = await hotVideoTag();
    if (res.code !== 200) return;
    const hotVideoTagList = res.data;
    this.setState({ hotVideoTagList });
  }

  // 获取全部标签
  queryVideoTag = async () => {
    const res = await allVideoTag();
    if (res.code !== 200) return;
    const allVideoTagList = res.data;
    this.setState({ allVideoTagList });
  }

  // 获取全部视频
  queryAllVideo = async () => {
    const { offset, videoDataList } = this.state;
    const params = { offset: offset * 8 }
    const res = await allVideo({ ...params });
    this.setState({ loading: false }); // 关闭等待层
    if (res.code !== 200) return;
    const oldList = videoDataList;
    const nowList = res.datas;
    const newList = oldList.concat(nowList);
    const hasmore = res.hasmore;
    this.setState({
      hasmore, offset: offset + 1, videoDataList: newList
    }, () => {
      const { offset } = this.state;
      if (offset === 1) {
        this.queryAllVideo();
      }
    })
  }

  // 获取tag下的视频
  queryVideoGroup = async () => {
    const { tagId, offset, videoDataList } = this.state;
    const params = { id: tagId, offset: offset * 8 }
    const res = await videoGroup({ ...params });
    this.setState({ loading: false }); // 关闭等待层
    if (res.code !== 200) return;
    const oldList = videoDataList;
    const nowList = res.datas;
    const newList = oldList.concat(nowList);
    const hasmore = res.hasmore;
    this.setState({
      hasmore, offset: offset + 1, videoDataList: newList
    }, () => {
      const { offset } = this.state;
      if (offset === 1) {
        this.queryVideoGroup();
      }
    })
  }

  //点击tag
  chooseTag = (item, allVideo) => {
    let tag = '';
    let tagId = '';
    if (allVideo) {
      tag = item
    } else {
      tag = item.name;
      tagId = item.id;
    }
    this.setState({ tag: tag, tagId: tagId, loading: true, showModal: false, offset: 0, hasmore: false, videoDataList: [] }, () => {
      allVideo ? this.queryAllVideo() : this.queryVideoGroup();
    });
  }

  componentDidMount = () => {
    this.queryAllVideo();
    this.queryVideoTag();
    this.queryHotVideoTag();
  }

  componentDidUpdate = () => {
    const { onLoad } = this.props;
    const { hasmore, tag } = this.state;
    if (!hasmore || !onLoad) return;
    this.setState({ loading: true }, () => tag === '全部视频' ? this.queryAllVideo() : this.queryVideoGroup())

  }


  componentWillUnmount() {
    this.setState = () => false;
  }


  render() {
    const { tag, hotVideoTagList, allVideoTagList, showModal, videoDataList, loading } = this.state;
    return (
      <div className={styles.video}>
        <div
          className={styles.all_list_text}
          onClick={() => this.setState({ showModal: true })}
        >
          {tag}
        </div >
        <div className={styles.hot_tag}>
          <span> 热门标签：</span>
          <ul>
            {hotVideoTagList.map(item => {
              const cls = tag === item.name ? styles.active : '';
              return (<li
                key={item.name}
                className={cls}
                onClick={() => this.chooseTag(item)}
              >
                {item.name}
              </li>)
            })}
          </ul>
        </div>
        <VideoList list={videoDataList} />
        {
          loading ?
            <div className='loading'>
              <Spin style={{ color: '#666' }} tip="Loading..."></Spin>
            </div>
            : ''
        }
        {
          showModal ?
            <div className={styles.modal}>
              <VideoTag list={allVideoTagList} tag={tag} fun={this.chooseTag} />
            </div>
            :
            null
        }

      </div >
    );
  }
}

export default Video;