/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-04 18:01:24
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import { catlist, hotList } from '@/common/api/api';
import { message, Popconfirm } from 'antd';


class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catList: {},
      hotPlayList: [],
      allListText: '全部歌单'
    }
  }

  componentDidMount = () => {
    this.queryCatList();
    this.queryHotPlayList();
  }

  // 获取歌单分类
  queryCatList = async () => {
    const result = await catlist();
    const catList = result || {};
    this.setState({ catList })
  }

  // 获取热门歌单分类
  queryHotPlayList = async () => {
    const result = await hotList();
    const hotPlayList = result.tags || [];
    this.setState({ hotPlayList })
  }

  confirm = () => {
    message.info('Clicked on Yes.');
  }

  render() {
    const { allListText } = this.state;
    return (
      <div className={styles.song_list}>
        <Popconfirm placement="bottom" title={'11111111111111'} onConfirm={this.confirm} okText="Yes" cancelText="No">

          打撒打撒阿萨
        </Popconfirm>
        < div className={styles.all_list_text}>{allListText}</div >
      </div >
    );
  }
}

export default SongList;