/*
 * @Author: REFUSE_C
 * @Date: 2020-09-09 22:57:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 16:49:49
 * @Description: 发现-歌单-歌单列表
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
import { formatImgSize } from '@/common/utils/format';
class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  // 跳转歌单详情页
  jump = item => {
    this.props.history.push({
      pathname: `/single${item.id}`
    })
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.play_list} >
        <ul>
          {list.map((item, index) => {
            return (
              <li key={'item' + index} onClick={() => this.jump(item)}>
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