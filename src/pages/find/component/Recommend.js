/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:41:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-03 17:39:55
 * @Description: 个性推荐
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';

import Banner from '@common/components/banner/Banner';
import FindTitle from '@common/components/findTitle/FindTitle';
import SongList from '@common/components/recommend/SongList';
import NewMusic from '@common/components/recommend/NewMusic';
import Privatecontent from '@common/components/recommend/Privatecontent';
import PersonalizedMv from '@common/components/recommend/PersonalizedMv';

import { banner, newMusic, personalizedMv, privatecontent, recommendList } from '@/common/api/api';
import { formatWeek } from '@/common/utils/format';
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [], // 轮播图
      personalizedList: [], // 每日推荐歌单
      privatecontentList: [], // 独家放送
      newMusicList: [], // 最新音乐
      personalizedMvList: [], //推荐mv
    }
  }

  componentDidMount = () => {
    this.queryBanner();
    this.queryRecommendList();
    this.queryPrivatecontentList();
    this.queryNewMusic();
    this.queryPersonalizedMv();
  }

  // 轮播图
  queryBanner = async () => {
    const result = await banner();
    const bannerList = result.banners || [];
    this.setState({ bannerList })
  }

  // 获取每日推荐音乐
  queryRecommendList = async (params = { limit: 9 }) => {
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
  queryPrivatecontentList = async () => {
    const result = await privatecontent();
    const privatecontentList = result.result || [];
    this.setState({ privatecontentList });
  }

  // 最新音乐
  queryNewMusic = async (params = { limit: 10 }) => {
    const result = await newMusic({ ...params })
    const newMusicList = result.data || [];
    this.setState({ newMusicList });
  }

  // 推荐mv
  queryPersonalizedMv = async () => {
    const result = await personalizedMv()
    const personalizedMvList = result.result || [];
    this.setState({ personalizedMvList });
  }

  render() {
    const { bannerList, personalizedList, privatecontentList, newMusicList, personalizedMvList } = this.state;
    return (<div className={styles.find_box}>
      <Banner list={bannerList} />

      <FindTitle history={this.props.history} title={`推荐歌单`} type={`0`} />
      <SongList list={personalizedList} />

      <FindTitle history={this.props.history} title={`独家放送`} type={`1`} />
      <Privatecontent list={privatecontentList} />

      <FindTitle history={this.props.history} title={`最新音乐`} type={`2`} />
      <NewMusic list={newMusicList} />

      <FindTitle history={this.props.history} title={`推荐MV`} type={`3`} />
      <PersonalizedMv list={personalizedMvList} />

      <FindTitle history={this.props.history} title={`主播电台`} type={`4`} />
      
      <FindTitle history={this.props.history} title={`看看`} type={`5`} />

    </div >);
  }
}

export default Recommend;