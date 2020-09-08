/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-08 17:29:18
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import { catlist, hotList } from '@/common/api/api';

import SongListClassify from '@components/songList/SongListClassify';


class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: {},
      hotPlayList: [],
      tags: '全部歌单'
    }
  }

  componentDidMount = () => {
    this.queryCatList();
    this.queryHotPlayList();
  }

  // 获取歌单分类
  queryCatList = async () => {
    const result = await catlist();
    const tagList = result || {};
    this.setState({ tagList })
  }

  // 获取热门歌单分类
  queryHotPlayList = async () => {
    const result = await hotList();
    const hotPlayList = result.tags || [];
    this.setState({ hotPlayList })
  }



  render() {
    const { tags, tagList } = this.state;
    return (
      <div className={styles.song_list}>
        < div className={styles.all_list_text}>{tags}</div >
        <SongListClassify list={tagList} />
      </div >
    );
  }
}

export default SongList;