/*
 * @Author: REFUSE_C
 * @Date: 2020-10-21 10:36:37
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-21 16:24:58
 * @Description: 
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import MvList from '@components/mv';
import { artistMv } from '@/common/api/singer';
import { Spin } from 'antd';
import queryString from 'query-string';

class Mv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mvs: [],
      limit: 50,
      offset: 1,
      hasMore: true,
    }
  }

  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    this.getArtistMv(id);
  }
  componentDidUpdate = () => {
    const { hasMore } = this.state;
    const { onLoad, id } = this.props;
    if (onLoad && hasMore) this.getArtistMv(id);
  }
  // 获取歌手描述
  getArtistMv = async (id) => {
    const { limit, offset } = this.state;
    const params = {
      id,
      limit,
      offset: (offset - 1) * limit
    }
    const res = await artistMv({ ...params });
    if (res.code === 200) {
      const oldList = this.state.mvs;
      const { mvs, hasMore } = res;
      const newList = oldList.concat(mvs);
      this.setState({ mvs: newList, hasMore, offset: offset + 1 })
    }
  }
  render() {
    const { mvs, hasMore } = this.state;
    return (
      <div className={styles.mv}>
        <MvList list={mvs} isMedia={true} />
        {
          hasMore ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
      </div>
    );
  }
}

export default Mv;