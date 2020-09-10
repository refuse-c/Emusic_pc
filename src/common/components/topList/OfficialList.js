/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 12:22:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 18:07:15
 * @Description: 发现-排行榜-官方榜
 */
import React, { Component } from 'react'
import styles from './index.module.scss';

import { formatDate } from '@/common/utils/format';

class officialList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    console.log(list)
    return (
      <div className={styles.official_list}>
        {
          list.map((item, index) => {
            return (
              <div
                key={item.ToplistType}
                className={styles.item_box}
              >
                <div
                  className={styles.bg}
                  style={{
                    background: `url(${require('@images/text' + index + '.png')}) center left 20px / 120px no-repeat,url(${require('@images/' + index + '.png')}) center center / 100% 100% no-repeat`
                  }}
                >
                  {formatDate(item.updateTime, '0').substr(5) + '更新'}
                </div>
                {
                  item.tracks ?
                    <ul>
                      {
                        item.tracks.map((item, index) => {
                          if (index > 7) return false;
                          return (
                            <li
                              key={item.id}
                            >
                              {item.name}
                            </li>
                          )
                        })
                      }
                    </ul> :
                    <ul>
                      {
                        item.artists.map((item, index) => {
                          if (index > 7) return false;
                          return (
                            <li
                              key={item.id}
                            >
                              {item.name}
                            </li>
                          )
                        })
                      }
                    </ul>
                }

                <div className={styles.view_all}>查看全部</div>
              </div>
            )
          })
        }
      </div >
    );
  }
}

export default officialList;