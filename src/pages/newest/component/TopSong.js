/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 17:01:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 01:51:10
 * @Description: 发现-最新音乐-新歌速递
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
import { formatImgSize, formatSongTime } from '@/common/utils/format';
class TopSong extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.top_song}>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={item.id}>
                <p>{index + 1}</p>
                <p>
                  <img src={formatImgSize(item.album.picUrl, 40, 40)} alt="" />
                </p>
                <p>{item.name}</p>
                <p>{item.artists.map(item => item.name).join('/ ')}</p>
                <p>{item.album.name}</p>
                <p>{formatSongTime(item.duration)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}


TopSong.propTypes = {
  list: propTypes.array,
  fun: propTypes.func
}
export default TopSong;