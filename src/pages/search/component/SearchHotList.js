/*
 * @Author: REFUSE_C
 * @Date: 2020-09-29 00:04:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-05 18:05:41
 * @Description: 搜索-热搜榜
 */
import styles from '../css/index.module.scss';
import React, { Component } from 'react';
import ScrollView from 'react-custom-scrollbars';
import propTypes from 'prop-types';
class SearchHotList extends Component {
  render() {
    const { data, fun } = this.props;
    return (
      <div className={[styles.hotList, styles.arrow].join(' ')}>
        <ScrollView>
          <div className={styles.title}>热搜榜</div>
          <ul>
            {
              data.map((item, index) => {
                const cls = index < 3 ? styles.active : ''
                return (
                  <li key={'item' + index} className={cls} onClick={() => fun(item.searchWord)}>
                    <p className={styles.num}>{index + 1}</p>
                    <div className={styles.info}>
                      <div>
                        {item.searchWord}
                        <span>{item.score}</span>
                        <img src={item.iconUrl} alt="" />
                      </div>
                      <p>{item.content}</p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </ScrollView>
      </div >
    );
  }
}

SearchHotList.propTypes = {
  data: propTypes.array,
  fun: propTypes.func

}
export default SearchHotList;