/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 15:39:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 18:45:38
 * @Description: 歌单详情
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import MusicList from 'components/musicList';
import ScrollView from 'react-custom-scrollbars';
import PlayAll from 'components/playAll/PlayAll';
import { recommendSongs, songDetail } from 'common/api/api';
import { Spin } from 'antd';
import { formatWeek } from 'common/utils/format';

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      list: [],
      loading: true
    }
  }

  // 获取歌单列表
  queryRecommendSongs = async () => {
    const { id } = this.state;
    const res = await recommendSongs({ id });
    res.code === 200 ? this.querySongDetail(res.data.dailySongs) : this.setState({ loading: false });
  }

  // 歌曲详情
  querySongDetail = async data => {
    const ids = data.map(item => item.id).join(',');
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
    this.queryRecommendSongs()
  }

  render() {
    const date = new Date();
    const { queryLikeList, likeListIds } = this.props;
    const { loading, list } = this.state;
    return (
      <div className={styles.single}>
        <ScrollView
          ref={sc => this.sc = sc}
          onScroll={this.handleScroll}
        >
          <Spin tip="Loading..." spinning={loading} >
            <div className={styles.head}>
              <div className={styles.info}>
                <div className={styles.time}>
                  <p>{formatWeek(date.getDay())}</p>
                  <p>{date.getDate()}</p>
                </div>
                <div className={styles.desc}>
                  <h3>每日歌曲推荐</h3>
                  <p>根据你的音乐口味生成，每天06:00更新</p>
                </div>
              </div>
            </div>
            <div className={styles.single_box}>
              <PlayAll list={list} title="播放全部" cls={'play_all_2'} />
              <MusicList list={list} callBack={queryLikeList} likeListIds={likeListIds} />
            </div>
          </Spin>
        </ScrollView>
      </div >
    );
  }
}

export default Single;