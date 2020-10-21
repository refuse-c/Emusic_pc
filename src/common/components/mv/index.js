/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-21 14:30:48
 * @Description: 个性推荐-推荐mv
 */

import React, { Component } from 'react';
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNo } from '@/common/utils/format';

class MvList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, isMedia } = this.props;
    return (
      <div className={styles.video_list}>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li
                  key={'item' + index}
                  className={isMedia ? styles.item1 : styles.item2}
                >
                  <div
                    className={styles.img_box}
                    style={{
                      background: `url(${formatImgSize(item.cover || item.picUrl || item.imgurl, 250, 140)})  center left / 100% 100% no-repeat`
                    }}
                  >
                    <p className={styles.count}>{formatSerialNo(item.playCount)}</p>
                  </div>
                  <div className={styles.creator}>
                    <p className='overflow'>{item.name}</p>
                    <p className='overflow'>{!isMedia ? item.artistName : null}</p>
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

MvList.propTypes = {
  list: propTypes.array
}
export default MvList;