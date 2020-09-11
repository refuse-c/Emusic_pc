/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 23:03:48
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 10:49:42
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import qs from 'query-string';
class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    const url = window.location.href;
    const { id } = qs.parseUrl(url).query;
    console.log(id)
  }
  render() {
    return (
      <div className={styles.singe}>singe</div>
    );
  }
}

export default Single;