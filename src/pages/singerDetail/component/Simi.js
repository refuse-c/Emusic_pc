/*
 * @Author: REFUSE_C
 * @Date: 2020-10-21 10:36:37
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-21 16:26:06
 * @Description: 
 */
import { artistSimi } from '@/common/api/singer';
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import SinfgerList from '@components/singer';
import queryString from 'query-string';

class Simi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simiData: []
    }
  }

  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    this.getArtistSimi(id);
  }
  // 获取歌手描述
  getArtistSimi = async (id) => {
    const res = await artistSimi({ id });
    if (res.code === 200) {
      const simiData = res.artists;
      this.setState({ simiData });
    }
  }

  render() {
    const { simiData } = this.state;
    return (
      <div className={styles.simi}>

        <SinfgerList list={simiData} history={this.props.history} isMedia={true} />
      </div>
    );
  }
}

export default Simi;