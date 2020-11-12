
/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 17:01:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-12 16:30:39
 * @Description: 专辑列表
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './css/index.module.scss';
import { formatDate, formatImgSize } from '@/common/utils/format';
import { routerJump } from '@/common/utils/tools';
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, list, isFullScreen, history } = this.props;
    return (
      <div className={styles.album}>
        {isFullScreen ? null : <h3>{title}</h3>}
        <ul className={isFullScreen ? styles.list1 : styles.list2}>
          {
            list.map((item, index) => {
              return (
                <li
                  onClick={() => routerJump(history, `/album${item.id}`)}
                  key={`item` + index}
                  className={isFullScreen ? styles.item1 : styles.item2}
                >
                  <div className={styles.positioning}>
                    <img src={formatImgSize(item.picUrl, 200, 200)} alt="" />
                  </div>
                  <p className='overflows'>{item.name}</p>
                  <p className='overflow'>{isFullScreen ? formatDate(item.publishTime) : item.artist.name}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}


Album.propTypes = {
  list: propTypes.array,
  fun: propTypes.func
}
export default Album;