/*
 * @Author: REFUSE_C
 * @Date: 2020-08-21 12:50:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-22 11:19:29
 * @Description:底部control
 */
import React, { Component } from 'react';
import styles from './index.module.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.footer}>
        <img src="" alt="" />
        <div className={styles.control}>
          <i className={styles.prev}></i>
          <i className={styles.pause}></i>
          <i className={styles.next}></i>
        </div>
        <div className={styles.progress}>
        </div>
        <div className={styles.volume}>
        </div>
        <div className={styles.tool}>
          <i className={styles.order}></i>
          <i className={styles.Sound_quality}></i>
          <i className={styles.lyrics}></i>
          <i className={styles.song_list}></i>
        </div>
      </ div >
    );
  }
}

export default Footer;