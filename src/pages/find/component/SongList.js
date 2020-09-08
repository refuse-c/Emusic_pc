/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-08 23:10:01
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import { catlist, hotList } from '@/common/api/api';

import SongListClassify from '@components/songList/SongListClassify';
import { formatTag } from '@/common/utils/format';


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
    const res = await catlist();
    if (res.code !== 200) return;
    const a = res.sub;
    const b = res.categories;
    const tagList = formatTag(a, b);
    this.setState({ tagList })
  }

  // 获取热门歌单分类
  queryHotPlayList = async () => {
    const res = await hotList();
    const hotPlayList = res.tags || [];
    this.setState({ hotPlayList })
  }



  render() {
    const { tags, tagList } = this.state;
    return (
      <div className={styles.song_list}>
        < div className={styles.all_list_text}>{tags}</div >
        <SongListClassify list={tagList} tag={tags} />
      </div >
    );
  }
}

export default SongList;