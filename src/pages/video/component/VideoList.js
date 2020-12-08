/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 22:53:43
 * @Description: 个性推荐-推荐mv
 */

import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.video_list}>
        <ul>
          {
            list.map((item, index) => {
              const data = item.data;
              return (
                <li key={'list' + index} onClick={() => history.push({ pathname: `/videoDetail${data.vid}` })}>
                  <div
                    className={styles.img_box}
                    style={{
                      background: `url(${formatImgSize(data.coverUrl, 250, 140)})  center left / 100% 100% no-repeat`
                    }}
                  >
                    <p className={styles.count}>{data.praisedCount || data.playCount}</p>
                  </div>
                  <div className={styles.creator}>
                    <p className='overflow'>{data.title || data.name}</p>
                    {
                      data.creator ? <p className='overflow'>by {data.creator.nickname}</p> : null
                    }
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

VideoList.propTypes = {
  list: propTypes.array
}
export default VideoList;