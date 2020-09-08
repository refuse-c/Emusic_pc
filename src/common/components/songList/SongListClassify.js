/*
 * @Author: REFUSE_C
 * @Date: 2020-09-08 11:19:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-08 18:07:42
 * @Description: 发现-歌单-歌单分类
 */
import React, { Component } from 'react'
import styles from './index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import propTypes from 'prop-types';
class SongListClassify extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    console.log(list)
    console.log(Array.entries(list.categories && list.categories))
    return (
      <div className={[styles.songListClassify, styles.arrow].join(' ')}>
        <div className={styles.title}>添加标签</div>
        <div className={styles.scroll_box}>
          <ScrollView>
            <div className={styles.content}>
              <div className={styles.tag}>全部歌单</div>

              <div>
                {
                  // list.categories && list.categories.map(item => <div key={item}>{item}</div>)
                }
              </div>
              <ul>
                {
                  list.sub && list.sub.map((item, index) => {
                    return (
                      <li className={styles.tag} key={item.name}>{item.name}</li>
                    )
                  })
                }
              </ul>
            </div>
          </ScrollView>
        </div>
      </div >
    );
  }
}
SongListClassify.propTypes = {
  list: propTypes.object
}

export default SongListClassify;