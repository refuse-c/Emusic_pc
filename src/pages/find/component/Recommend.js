/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:41:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 19:52:38
 * @Description: 个性推荐
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';

import Banner from '@common/components/banner/Banner';
import FindTitle from '@common/components/findTitle/FindTitle';
import SongList from '@common/components/songList/SongList';
import { privatecontent, recommendList } from '@/common/api/api';
import { formatWeek } from '@/common/utils/format';
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalizedList: [], // 每日推荐歌单
      privatecontentList: [], //独家放送
    }
  }

  componentDidMount = () => {
    this.handleRecommendList();
    this.handlePrivatecontentList();
  }

  // 获取每日推荐音乐
  handleRecommendList = async (params = { limit: 9 }) => {
    const date = new Date();
    const recommended = {
      week: formatWeek(date.getDay()),
      day: date.getDate(),
      copywriter: "根据您的音乐口味生成每日更新",
      id: date.getTime(),
      name: "每日歌曲推荐",
      picUrl: 'null',
      type: 'recommended',
    }
    const result = await recommendList({ ...params });
    const personalizedList = result.result || [];
    personalizedList.unshift(recommended);
    this.setState({ personalizedList });
  }

  // 独家放送
  handlePrivatecontentList = async (params = {}) => {
    const result = await privatecontent({ ...params });
    const privatecontentList = result.result;
    this.setState({ privatecontentList });
  }


  render() {
    const { personalizedList } = this.state;
    return (<div className={styles.find_box}>
      <Banner />

      <FindTitle history={this.props.history} title={`推荐歌单`} type={`0`} />
      <SongList list={personalizedList} />
      <FindTitle history={this.props.history} title={`独家放送`} type={`1`} />
      <FindTitle history={this.props.history} title={`最新音乐`} type={`2`} />
      <FindTitle history={this.props.history} title={`推荐MV`} type={`3`} />
      <FindTitle history={this.props.history} title={`主播电台`} type={`4`} />
      <FindTitle history={this.props.history} title={`看看`} type={`5`} />

    </div >);
  }
}

export default Recommend;