/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-12 17:33:50
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Head from '@components/head';
import MusicList from '@components/musicList';
import ScrollView from 'react-custom-scrollbars';
import { songDetail } from '@/common/api/api';
import { message, Spin } from 'antd';
import { traverseId } from '@/common/utils/tools';
import { album } from '@/common/api/album';
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

  // 获取专辑列表
  queryAlbum = async () => {
    const { id } = this.state;
    const res = await album({ id });
    if (res.code === 200) {
      if (res.songs === 0) {
        message.info('当前歌单无播放歌曲,试试其他的吧')
      }
      this.querySongDetail(res);
    }
  }

  // 歌曲详情
  querySongDetail = async data => {
    const ids = traverseId(data.songs);
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
    this.setState({ list, playlist: data.album });
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.setState({ id: id }, () => this.queryAlbum())
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
              <Head data={playlist} type={4} list={list} />
              <MusicList list={list} history={this.props.history} />
            </div>
          </Spin>
        </ScrollView>
      </div >
    );
  }
}

export default Single;