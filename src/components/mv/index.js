/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 23:09:24
 * @Description: 个性推荐-推荐mv
 */

import React, { Component } from 'react';
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNo } from 'common/utils/format';

class MvList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, isFullScreen, history } = this.props;
    return (
      <div className={styles.video_list}>
        <ul>
          {
            list.map((item, index) => {
              console.log(item)
              return (
                <li
                  key={'item' + index}
                  onClick={() => history.push({ pathname: `/videoDetail${item.id || item.vid}` })}
                  className={isFullScreen ? styles.item1 : styles.item2}
                >
                  <div
                    className={styles.img_box}
                    style={{
                      background: `url(${formatImgSize(item.cover || item.picUrl || item.imgurl || item.coverUrl, 250, 140)})  center left / 100% 100% no-repeat`
                    }}
                  >
                    <p className={styles.count}>{formatSerialNo(item.playCount)}</p>
                  </div>
                  <div className={styles.creator}>
                    <p className='overflow'>{item.name || item.title}</p>
                    <p className='overflow'>{!isFullScreen ? item.artistName || item.creator[0].userName || '' : null}</p>
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