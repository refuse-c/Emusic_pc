/*
 * @Author: REFUSE_C
 * @Date: 2020-10-21 10:36:37
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-12 16:33:22
 * @Description: 
 */
import { artistAlbum } from 'common/api/singer';
import React, { Component } from 'react'
import styles from '../css/index.module.scss';
import queryString from 'query-string';
import AlbumList from 'components/album';
import { Spin } from 'antd';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: [],
      limit: 50,
      offset: 1,
      more: true,
    }
  }

  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    this.getArtistAlbum(id);
  }

  componentDidUpdate = () => {
    const { more } = this.state;
    const { onLoad, id } = this.props;
    if (onLoad && more) this.getArtistAlbum(id);
  }

  // 获取歌手专辑
  getArtistAlbum = async (id) => {
    const { limit, offset, albumData } = this.state;
    const params = {
      id,
      limit,
      offset: (offset - 1) * limit
    }
    this.setState({ loading: true })
    const res = await artistAlbum({ ...params });
    this.setState({ loading: false })
    if (res.code === 200) {
      const oldList = albumData;
      const { hotAlbums, more } = res;
      const newList = oldList.concat(hotAlbums);
      this.setState({ albumData: newList, more, offset: offset + 1 });
    }
  }

  render() {
    const { albumData, more } = this.state;
    const { history } = this.props;
    return (
      <div className={styles.album}>
        <AlbumList history={history} list={albumData} isFullScreen={true} />
        {
          more ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
      </div>
    );
  }
}

export default Album;