/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 12:22:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 16:05:01
 * @Description: 发现-排行榜-官方榜
 */
import { formatImgSize } from '@/common/utils/format';
import React, { Component } from 'react'

import styles from './index.module.scss';
class GlobalList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <div className={styles.global_list}>
        <ul>
          {list.map(item => {
            return (
              < li key={item.id} >
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

export default GlobalList;