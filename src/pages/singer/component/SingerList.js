/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 12:56:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 13:26:03
 * @Description: 发现-歌手-歌手列表
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';

class SingerList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <div className={styles.singer_list}>
        <ul>
          {list.map(item => {
            return (
              <li key={item.id} >
                <div className={styles.positioning}>
                  <div
                    className={styles.box}
                    style={{
                      background: `url(${formatImgSize(item.picUrl, 200, 200)})  center left / 100% no-repeat`
                    }}
                  >
                  </div>
                </div>
                <div className='name overflows'>{item.name}</div>
              </li>
            )
          })}
        </ul>
      </div >
    );
  }
}

SingerList.propTypes = {
  list: propTypes.array
}

export default SingerList;