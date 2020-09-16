/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:48:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 17:53:13
 * @Description: 发现-排行榜
 */
import React, { Component } from 'react'
import { artistTop, playlistDetail, topList } from '@/common/api/api';
import styles from './css/index.module.scss';
import FindTitle from '@common/components/findTitle';
import OfficialList from './component/OfficialList';
import GlobalList from './component/GlobalList';

class TopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialList: [], // 官方榜
      globalList: [], // 全球榜
    }
  }

  // 跳转歌单详情页
  jump = item => {
    this.props.history.push({
      pathname: `/single${item.id}`
    })
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
    const { history } = this.props;
    const { officialList, globalList } = this.state;
    return (<div className={styles.find_box}>
      <FindTitle title={`官方榜`} />
      <OfficialList history={history} list={officialList} fun={this.jump} />
      <FindTitle title={`全球榜`} />
      <GlobalList history={history} list={globalList} fun={this.jump} />
    </div >);
  }
}

export default TopList;