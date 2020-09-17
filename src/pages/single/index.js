/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-17 21:32:10
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Head from './component/Head';
import List from './component/List';
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

  componentDidMount = () => {
    const id = this.props.match.params.id
    this.setState({ id }, () => this.queryListDetail())
  }

  static getDerivedStateFromProps(props, state) {
    const stateId = state.id;
    const propsId = props.match.params.id;
    if (stateId !== propsId) {
      return {
        id: propsId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      this.queryListDetail();
      this.setState({ loading: true, list: [] })
    }
  }

  // 获取歌单列表
  queryListDetail = async () => {
    const params = { id: this.state.id };
    const res = await playlistDetail({ ...params });
    if (res.code !== 200) { this.setState({ loading: false }); }
    const arr = res.playlist.trackIds;
    const ids = arr.map(item => item.id).join(',');
    this.querySongDetail({ ids: ids });
    this.setState({ playlist: res.playlist });
  }

  // 歌曲详情
  querySongDetail = async params => {
    const res = await songDetail(params);
    this.setState({ loading: false });
    if (res.code !== 200) return;
    const songs = res.songs;
    const privileges = res.privileges;
    const list = privileges.reduce((pre, cur) => {
      const target = pre.find(ee => ee.id === cur.id)
      if (target) Object.assign(target, cur)
      return pre
    }, songs)
    this.setState({ list });
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
              <Head data={playlist} type={`歌单`} />
              <List list={list} />
            </div>
          </Spin>
        </ScrollView>

      </div >
    );
  }
}

export default Single;