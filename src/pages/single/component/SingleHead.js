/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 23:00:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 23:24:53
 * @Description: 歌曲列表头部
 */
import React, { Component } from 'react';
import styles from '../index.module.scss';

class SingleHead extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.single_head}>single_head</div>
    );
  }
}

export default SingleHead;
