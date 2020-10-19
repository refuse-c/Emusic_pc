/*
 * @Author: REFUSE_C
 * @Date: 2020-10-18 12:03:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-19 12:39:39
 * @Description: 
 */
import styles from './css/index.module.scss';
import React, { Component } from 'react';
import Head from '@components/head';
import queryString from 'query-string';
import { artists, artistSub, artistDesc } from '@/common/api/singer';
import { message } from 'antd';

class SingerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      artist: {}, // 歌手数据
      menuList: [
        { name: '专辑', path: '/singerdetail' },
        { name: 'MV', path: '/singerdetail/mv' },
        { name: '歌手详情', path: '/singerdetail/desc' },
        { name: '相似歌手', path: '/singerdetail/simi' }
      ],
    }
  }
  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    console.log(id)
    this.getArtistDesc(id);
    this.getArtists(id);
  }
  // 获取歌手描述
  getArtistDesc = async (id) => {
    const res = await artistDesc({ id });
    console.log(res)
  }

  // 获取歌手单曲
  getArtists = async (id) => {
    const res = await artists({ id });
    console.log(res.artist)
    if (res.code === 200) this.setState({ artist: res.artist })
  }
  // 收藏取消歌手  t:操作,1 为收藏,其他为取消收藏
  getArtistSub = async (id, t) => {
    const res = await artistSub({ id, t })
    if (res.code === 200) {
      message.destroy();
      t === 1 ? message.success('收藏成功') : message.success('取消收藏成功');
      this.getArtists(id);
    }
  }
  render() {
    const { artist } = this.state;
    const { history } = this.props;
    console.log(artist)
    return (
      <div className={styles.singer_detail}>
        <Head data={artist} type={2} history={history} fun={this.getArtistSub} />
      </div>
    );
  }
}

export default SingerDetail;