/*
 * @Author: REFUSE_C
 * @Date: 2020-10-18 12:03:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-20 15:40:08
 * @Description: 用户详情
 */
import styles from './css/index.module.scss';
import React, { Component } from 'react';
import Head from 'components/head';
import queryString from 'query-string';
import { userDetail, userPlaylist, userRecord } from 'common/api/user';
import { countriesCode } from 'common/api/api';
import SongList from 'components/songList';
import ScrollView from 'react-custom-scrollbars';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userData: {},// 歌手数据
      countryList: {}, // 地区数据
      createList: [], //创建的歌单
      collectList: [], // 收藏的歌单
      recordList: {}, //最近播放的歌曲
    }
  }
  componentDidMount = () => {
    const { uid } = queryString.parse(this.props.history.location.search)
    this.getUserDetail(uid);
    this.getCountriesCode();
    this.queryUserPlaylist(uid)
    this.getUserRecord(uid);
  }

  //  获取用户详情
  getUserDetail = async (uid) => {
    const res = await userDetail({ uid })
    if (res.code === 200) {
      this.setState({ userData: res })
    }
  }

  // 获取国家编码列表
  getCountriesCode = async uid => {
    const res = await countriesCode({ uid })
    if (res.code === 200) {
      let countryList = []
      res.data.forEach(item => {
        countryList.push.apply(countryList, item.countryList)
      });
      this.setState({ countryList })
    }
  }
  // 获取用户歌单
  queryUserPlaylist = async uid => {
    const res = await userPlaylist({ uid })
    if (res.code !== 200) return;
    const allList = res.playlist;
    let createList = allList.filter(item => item.privacy !== 10 && item.userId === Number(uid));
    let collectList = allList.filter(item => item.privacy !== 10 && item.userId !== Number(uid));
    this.setState({ createList, collectList })
  }

  // 获取用户播放记录
  getUserRecord = async uid => {
    const res = await userRecord({ uid, type: 1 })
    if (res.code !== 200) return;
    console.log(res)
    // this.setState({ createList, collectList })
  }

  render() {
    const { history } = this.props;
    const { userData, createList, collectList } = this.state;
    return (
      <div className={styles.user_detail}>
        <ScrollView>
          <Head data={userData} type={3} fun={this.getArtistSub} />
          <div className={styles.user_info}>
            {createList.length > 0 ? <div className={styles.title}>歌单（{createList.length}）</div> : null}
            <div className={styles.list_box}>
              <SongList history={history} list={createList} isFullScreen={true} />
            </div>
            {collectList.length > 0 ? <div className={styles.title}>创建（{collectList.length}）</div> : null}
            <div className={styles.list_box}>
              <SongList history={history} list={collectList} isFullScreen={true} />
            </div>
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default UserDetail;