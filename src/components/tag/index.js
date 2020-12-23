/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 11:35:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 17:26:58
 * @Description: 歌手-分类类型
 */

import React, { Component } from 'react';
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { title, tag, list, fun, type } = this.props;
    return (
      <div className={styles.tag}>
        <h3>{title}：</h3>
        <ul>
          {
            list.map(item => {
              const cls = tag === item.key ? styles.active : ''
              return (
                <li
                  key={item.key}
                  className={cls}
                  onClick={() => fun(item, type)}
                >
                  {item.ti}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

Tag.propTypes = {
  title: propTypes.string,
  tag: propTypes.string,
  list: propTypes.array,
  fun: propTypes.func,
  type: propTypes.string
}
export default Tag;