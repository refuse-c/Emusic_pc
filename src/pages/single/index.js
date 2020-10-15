/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 16:39:49
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Head from './component/Head';
import MusicList from '@components/musicList';
import ScrollView from 'react-custom-scrollbars';

import { playlistDetail, songDetail } from '@/common/api/api';
import { Spin } from 'antd';
class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      list: [],
      playlist: {},
      loading: true
    }
  }

  // 获取歌单列表
  queryPlayListDetail = async () => {
    const { id } = this.state;
    const res = await playlistDetail({ id });
    res.code === 200 ? this.querySongDetail(res) : this.setState({ loading: false });
  }

  // 歌曲详情
  querySongDetail = async data => {
    const ids = data.playlist.trackIds.map(item => item.id).join(',');
    const res = await songDetail({ ids });
    this.setState({ loading: false });
    if (res.code !== 200) return;
    const { songs, privileges } = res;
    // 合并数据
    const list = privileges.reduce((pre, cur) => {
      const item = pre.find(el => el.id === cur.id);
      if (item) Object.assign(item, cur);
      return pre;
    }, songs);
    this.setState({ list, playlist: data.playlist });
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    this.setState({ id }, () => this.queryPlayListDetail())
  }

  static getDerivedStateFromProps = (props, state) => {
    const stateId = state.id;
    const propsId = props.match.params.id;
    if (stateId !== propsId) {
      return {
        id: propsId
      };
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.id !== prevState.id) {
      this.queryPlayListDetail();
      this.setState({ loading: true, list: [] })
    }
  }

  render() {
    const { loading, playlist, list } = this.state;
    return (
      <div className={styles.single}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <Spin tip="Loading..." spinning={loading} >
            <div className={styles.single_box}>
              <Head data={playlist} type={`歌单`} list={list} />
              <MusicList list={list} />
            </div>
          </Spin>
        </ScrollView>
      </div >
    );
  }
}

export default Single;