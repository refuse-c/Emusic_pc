/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 17:41:46
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import queryString from 'query-string';
import Head from './component/Head';
import List from './component/List';
import ScrollView from 'react-custom-scrollbars';

import { playlistDetail } from '@/common/api/api';
class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount = () => {
    const data = queryString.parse(this.props.history.location.search)
    this.setState({ id: data.id }, () => this.queryListDetail())
  }

  // 获取歌单列表
  queryListDetail = async () => {
    const params = { id: this.state.id }
    const res = await playlistDetail({ ...params })
    console.log(res)
    this.setState({ list: res.playlist.tracks })
  }

  render() {
    const { list } = this.state;
    return (
      <div className={styles.single}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <div className={styles.single_box}>
            <Head />
            <List list={list} />
          </div>

        </ScrollView>
      </div>
    );
  }
}

export default Single;