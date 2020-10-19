/*
 * @Author: REFUSE_C
 * @Date: 2020-10-18 12:03:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-19 22:25:32
 * @Description: 用户详情
 */
import styles from './css/index.module.scss';
import React, { Component } from 'react';
import Head from '@components/head';
import queryString from 'query-string';
import { userDetail } from '@/common/api/user';
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userData: {} // 歌手数据
    }
  }
  componentDidMount = () => {
    const { uid } = queryString.parse(this.props.history.location.search)
    console.log(uid)
    this.getUserDetail(uid);
  }

  //  获取用户详情
  getUserDetail = async (uid) => {
    const res = await userDetail({ uid })
    console.log(res)
    if (res.code === 200) {
      this.setState({ userData: res })
      console.log(res)
    }
  }
  render() {
    const { userData } = this.state;
    console.log(userData)
    return (
      <div className={styles.user_detail}>
        <Head data={userData} type={3} fun={this.getArtistSub} />
        <div className={styles.user_info}>
          <div className={styles.title}>歌单</div>
        </div>
      </div>
    );
  }
}

export default UserDetail;