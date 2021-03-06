/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:48:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:57:15
 * @Description: 发现-排行榜
 */
import React, { Component } from 'react'
import { artistTop, playlistDetail, topList } from 'common/api/api';
import styles from './css/index.module.scss';
import FindTitle from 'components/findTitle';
import OfficialList from './component/OfficialList';
// import GlobalList from './component/GlobalList';
import SongList from 'components/songList';

class TopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialList: [], // 官方榜
      globalList: [], // 全球榜
    }
  }

  // 所有榜单
  queryTopList = async () => {
    const res = await topList();
    if (res.code !== 200) return;
    let officialList = res.list.filter(item => item.ToplistType); // 官方榜
    officialList.push({ ToplistType: 'A' })
    const globalList = res.list.filter(item => !item.ToplistType); // 全球榜

    this.queryAListDetails(officialList)
    this.setState({ globalList });
  }

  // 歌手榜单
  queryArtistTop = async () => {
    let res = await artistTop();
    if (res.code !== 200) return;
    res.list.ToplistType = 'A';
    return res.list || {}
  }

  // 获取歌单详情
  queryTopListDetails = async (id) => {
    const params = { id: id }
    const res = await playlistDetail({ ...params })
    return res.playlist || {};
  }

  queryAListDetails = (list) => {
    const promises = list.map(item => item.ToplistType === 'A' ? this.queryArtistTop() : this.queryTopListDetails(item.id));
    Promise.all(promises)
      .then(officialList => {
        this.setState({ officialList })
      })
  }


  componentDidMount = () => {
    this.queryTopList();
    this.queryArtistTop();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { officialList, globalList } = this.state;
    return (<div className={styles.find_box}>
      <FindTitle title={`官方榜`} />
      <OfficialList list={officialList} fun={this.jump} />
      <FindTitle title={`全球榜`} />
      <SongList list={globalList} />
    </div >);
  }
}

export default TopList;