/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 20:23:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 09:56:05
 * @Description: FindTitle
 */
import { message } from 'antd';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import queryString from 'query-string';
import styles from './index.module.scss';
import { formatDate } from '@/common/utils/format';
class FindTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  jump = () => {
    const { type, tag } = this.props;
    let params = {};
    switch (type) {
      case 0:
        params = { pathname: `/find/songlist` };
        break;
      case 1:
        message.warning('客官请稍等, <独家放送>页面程序汪还在开发ing');
        break;
      case 2:
        params = { pathname: `/find/newest` };
        break;
      case 3:
        params = { pathname: `/video/mv` };
        break;
      case 4:
        params = {
          pathname: `/find/radioStation`
        };
        break;
      case 5:
        params = {
          pathname: `/allmv`,
          search: queryString.stringify({ area: tag })
        };
        break;
      case 6:
        params = {
          pathname: `/allmv`,
          search: queryString.stringify({ order: '最热' })
        };
        break;
      case 7:
        params = {
          pathname: `/allmv`,
          search: queryString.stringify({ type: '网易出品', order: '最新' })
        };
        break;
      case 8:
        params = {
          pathname: `/topmv`, search: queryString.stringify({ area: tag })
        };
        break;
      default: message.warning(`客官请稍等,<看看>页面程序汪还在开发ing`)
    }
    this.props.history.push({ ...params })
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