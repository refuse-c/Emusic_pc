/*
 * @Author: REFUSE_C
 * @Date: 2020-09-02 17:37:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 18:03:13
 * @Description: 个性推荐-歌单组件
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';
class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
      <div className={styles.song_list}>
        <ul>
          {
            list && list.map((item) => {
              return (
                item.type === 'recommended' ?
                  < li key={item.id}>
                    <div className={styles.positioning}>
                      <div className={styles.box}>
                        <p className={styles.week}>{item.week}</p>
                        <p className={styles.day}>{item.day}</p>
                      </div>
                    </div >
                    <div className='name'>{item.name}</div>
                  </li >
                  :
                  <li key={item.id} onClick={() => this.jump(item)}>
                    <div className={styles.positioning}>
                      <div className={styles.box}>
                        <img src={formatImgSize(item.picUrl, 200, 200)} alt="" />
                      </div>
                    </div >
                    <div className='name overflows'>{item.name}</div>
                  </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
SongList.propTypes = {
  list: propTypes.array
}
export default SongList;