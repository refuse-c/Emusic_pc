/*
 * @Author: REFUSE_C
 * @Date: 2020-10-17 00:13:09
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-20 21:47:17
 * @Description: 
 */
import React, { Component } from 'react';

import styles from './css/index.module.scss';
class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.resizeListener();
  }

  resizeListener() {
    // console.log(this.range.width)
  }
  render() {
    // const { currentTime } = this.props;
    return (
      <div
        className={styles.range}
        ref={range => this.range = range}
      >
        <div
          className={styles.buffer}
          ref={buffer => this.buffer = buffer}
        ></div>
        <div
          className={styles.progress}
          ref={progress => this.progress = progress}
        ></div>
        <div
          className={styles.point}
          ref={point => this.point = point}
        ></div>
      </div>
    );
  }
}

export default Range;