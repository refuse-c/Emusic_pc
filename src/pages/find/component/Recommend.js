/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:41:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-30 11:01:43
 * @Description: 个性推荐
 */
import React, { Component } from 'react';
import Banner from '@common/components/banner/Banner';
import FindTitle from '@common/components/findTitle/FindTitle';

import styles from '../css/index.module.scss';
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<div className={styles.find_box}>
      <Banner />

      <FindTitle history={this.props.history} title={`推荐歌单`} type={`0`} />
      <FindTitle history={this.props.history} title={`独家放送`} type={`1`} />
      <FindTitle history={this.props.history} title={`最新音乐`} type={`2`} />
      <FindTitle history={this.props.history} title={`推荐MV`} type={`3`} />
      <FindTitle history={this.props.history} title={`主播电台`} type={`4`} />
      <FindTitle history={this.props.history} title={`看看`} type={`5`} />
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
      </ul>
    </div>);
  }
}

export default Recommend;