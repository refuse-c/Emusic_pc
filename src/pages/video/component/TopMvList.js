/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 16:21:01
 * @Description: 视频-mv-mv排行榜
 */

import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNo } from '@/common/utils/format';

class TopMvList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list } = this.props;
    console.log(list)
    return (
      <div className={styles.top_mv_list}>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li key={item.id}>
                  <p className={styles.num}>{formatSerialNo(index + 1)}</p>
                  <div className={styles.cover}>
                    <img src={formatImgSize(item.cover, 160, 90)} alt="" />
                  </div>
                  <div>
                    <p className='overflow'>{item.name}</p>
                    <p className='overflow'>{item.artistName}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
// artistId: 12138269
// artistName: "毛不易"
// artists: Array(1)
// 0: { id: 12138269, name: "毛不易" }
// length: 1
// __proto__: Array(0)
// briefDesc: null
// cover: "http://p1.music.126.net/ox4iqRTq3tbyWHakmzqi3A==/109951165227777129.jpg"
// desc: null
// duration: 0
// id: 10951822
// lastRank: 1
// mark: 0
// name: "我会守在这里"
// playCount: 2947126
// score: 475927
TopMvList.propTypes = {
  list: propTypes.array
}
export default TopMvList;