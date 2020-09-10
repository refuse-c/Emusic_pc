/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 20:05:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 20:22:50
 * @Description: 播放全部
 */
import React, { Component } from 'react'
import './index.scss';
import propTypes from 'prop-types';
class PlayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { title, cls, fun } = this.props;
    return (
      <div
        className={cls}
        onClick={fun}
      >
        {title}
      </div>
    );
  }
}

PlayAll.propTypes = {
  title: propTypes.string,
  cls: propTypes.string,
  fun: propTypes.func,
}
export default PlayAll;