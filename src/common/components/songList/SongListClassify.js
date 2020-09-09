/*
 * @Author: REFUSE_C
 * @Date: 2020-09-08 11:19:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-09 12:58:55
 * @Description: 发现-歌单-歌单分类
 */
import React, { Component } from 'react'
import styles from './index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import propTypes from 'prop-types';
class SongListClassify extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { tag, list } = this.props;
    console.log(list)
    return (
      <div className={[styles.songListClassify, styles.arrow].join(' ')}>
        <div className={styles.title}>添加标签</div>
        <div className={styles.scroll_box}>
          <ScrollView>
            <div className={styles.content}>
              <div
                className={[tag === '全部歌单' ? styles.tagActive : '', styles.tag].join(' ')}
                onClick={() => this.props.fun('全部歌单')}

              >
                全部歌单
                </div>
              {
                list.map((item, index) => {
                  return (
                    <div
                      key={'item' + index}
                      className={styles.tag_box}
                    >
                      <h3>{item.title}</h3>
                      <ul>
                        {item.list.map((item, index) => {
                          const cls1 = item.name === tag ? styles.tagActive : '';// 是否选中
                          const cls2 = item.hot ? styles.hotActive : '';// 是否热门
                          return (
                            <li
                              key={'item' + index}
                              className={[cls1, cls2, styles.tag].join(' ')}
                              onClick={() => this.props.fun(item.name)}
                            >
                              {item.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              }
            </div>
          </ScrollView>
        </div >
      </div >
    );
  }
}
SongListClassify.propTypes = {
  list: propTypes.array
}

export default SongListClassify;