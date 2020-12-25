/*
 * @Author: REFUSE_C
 * @Date: 2020-12-25 17:22:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-25 17:27:50
 * @Description:
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
class Down extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.down}>down</div>
    );
  }
}

export default Down;