/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 19:49:04
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Head from 'components/head';
import MusicList from 'components/musicList';
import ScrollView from 'react-custom-scrollbars';
import { playlistDetail, songDetail } from 'common/api/api';
import { message, Spin } from 'antd';
import { setSession, traverseId } from 'common/utils/tools';
class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      list: [],
      playlist: {},
      loading: false,
    }
  }

  // 获取歌单列表
  queryPlayListDetail = async () => {
    const { id } = this.state;
    this.setState({ loading: true, list: [] })
    setSession('currentSingleId', id || '');
    const res = await playlistDetail({ id });
    if (res.code === 200) {
      if (res.playlist.trackIds.length === 0) {
        message.info('当前歌单无播放歌曲,试试其他的吧')
      }
      this.querySongDetail(res);
    }
  }

  // 歌曲详情
  querySongDetail = async data => {
    const ids = traverseId(data.playlist.trackIds);
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
    const id = this.props.match.params.id;
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
    const { status } = this.props;
    if (this.state.id !== prevState.id) {
      this.queryPlayListDetail();
    }
    // 重载歌单
    if (status) this.queryPlayListDetail();

  }

  render() {
    const { history, queryLikeList, likeListIds, reloadPlayList } = this.props;
    const { id, loading, playlist, list } = this.state;
    return (
      <div className={styles.single}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <Spin tip="Loading..." spinning={loading} >
            <div className={styles.single_box}>
              <Head data={playlist} type={1} list={list} history={history} />
              <MusicList
                singleId={id}
                list={list}
                callBack={queryLikeList}
                likeListIds={likeListIds}
                reloadPlayList={reloadPlayList}
              />
            </div>
          </Spin>
        </ScrollView>
      </div >
    );
  }
}

export default Single;