/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 22:52:35
 * @Description: 视频-mv-mv排行榜
 */

import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNo } from 'common/utils/format';

class TopMvList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.top_mv_list}>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li key={item.id} onClick={() => history.push({ pathname: `/videoDetail${item.id}` })}>
                  <p className={styles.num}>{formatSerialNo(index + 1)}</p>
                  <div
                    className={styles.cover}
                    style={{ background: `url(${formatImgSize(item.cover, 160, 90)}) center center / 100% 100% no-repeat` }}
                  >
                    <span>热度：{formatSerialNo(item.playCount)}</span>
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
      </div >
    );
  }
}
TopMvList.propTypes = {
  list: propTypes.array
}
export default TopMvList;