/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 20:23:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 22:40:59
 * @Description: FindTitle
 */
import { message } from 'antd';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './index.module.scss';
import { formatDate } from '@/common/utils/format';
class FindTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  jump = () => {
    const type = this.props.type;
    switch (type) {
      case 0: this.props.history.push({ pathname: `/find/songlist` }); break;
      case 1: message.warning('客官请稍等, <独家放送>页面程序汪还在开发ing'); break;
      case 2: this.props.history.push({ pathname: `/find/newest` }); break;
      case 3: message.warning('客官请稍等,<推荐mv>页面程序汪还在开发ing'); break;
      case 4: this.props.history.push({ pathname: `/find/radioStation` }); break;
      case 8: this.props.history.push({ pathname: `/topmv` }); break;
      default: message.warning(`客官请稍等,<看看>页面程序汪还在开发ing`)
    }
  }
  render() {
    const { tag, type, list, fun, title, date } = this.props;
    return (
      <div className={styles.find_title}>
        <div>
          <h2>{title}</h2>
          <ul>
            {
              list ?
                list.map(item => {
                  const cls = tag === item.ti ? styles.active : ''
                  return (
                    <li key={item.ti} className={cls} onClick={() => fun(item.ti, type)}>{item.ti}</li>
                  )
                })
                :
                null
            }
          </ul>
        </div>
        {
          type ? <span onClick={this.jump.bind(this)}>更多</span> : null
        }
        {
          date ? <p>最近更新：{formatDate(date)}</p> : null
        }
      </div >
    );
  }
}


FindTitle.propTypes = {
  tag: propTypes.string,
  fun: propTypes.func,
  type: propTypes.number,
  list: propTypes.array,
  title: propTypes.string,
  date: propTypes.number,
}

export default FindTitle;