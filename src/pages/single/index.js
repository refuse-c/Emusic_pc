/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 18:01:46
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Head from './component/Head';
import List from './component/List';
import ScrollView from 'react-custom-scrollbars';

import { playlistDetail } from '@/common/api/api';
import { Spin } from 'antd';
class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
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
    console.log(prevState)
    if (this.state.id !== prevState.id) {
      this.queryListDetail();
      this.setState({ loading: true })
    }
  }

  // 获取歌单列表
  queryListDetail = async () => {
    const params = { id: this.state.id }
    const res = await playlistDetail({ ...params })
    if (res.code !== 200) return;
    this.setState({ playlist: res.playlist, loading: false })
  }

  render() {
    const { playlist, loading } = this.state;
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
              <List list={playlist.tracks} />
            </div>
          </Spin>
        </ScrollView>

      </div >
    );
  }
}

export default Single;