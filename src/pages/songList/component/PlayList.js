/*
 * @Author: REFUSE_C
 * @Date: 2020-09-09 22:57:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 12:57:58
 * @Description: 发现-歌单-歌单列表
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
import { formatImgSize } from '@/common/utils/format';
class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <div className={styles.play_list}>
        <ul>
          {list.map(item => {
            return (
              <li key={item.id} >
                <div className={styles.positioning}>
                  <div
                    className={styles.box}
                    style={{
                      background: `url(${formatImgSize(item.coverImgUrl, 200, 200)})  center left / 100% no-repeat`
                    }}
                  >
                  </div>
                </div>
                <div className='name overflows'>{item.name}</div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

PlayList.propTypes = {
  list: propTypes.array
}
export default PlayList;