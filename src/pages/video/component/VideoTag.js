/*
 * @Author: REFUSE_C
 * @Date: 2020-09-08 11:19:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 00:34:18
 * @Description: 视频-视频-歌单分类
 */
import React, { Component } from 'react'
import styles from '../css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
import propTypes from 'prop-types';
class VideoTag extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { tag, list } = this.props;
    return (
      <div className={[styles.video_tag, styles.arrow].join(' ')}>
        <div className={styles.title}>添加标签</div>
        <div className={styles.scroll_box}>
          <ScrollView>
            <div className={styles.content}>
              <div
                className={[tag === '全部视频' ? styles.tagActive : '', styles.tag].join(' ')}
                onClick={() => this.props.fun('全部视频', 'allVideo')}
              >
                全部视频
                </div>
              <ul>
                {list.map(item => {
                  const cls1 = item.name === tag ? styles.tagActive : '';// 是否选中
                  return (
                    <li
                      key={item.id}
                      className={[cls1, styles.tag].join(' ')}
                      onClick={() => this.props.fun(item)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollView>
        </div >
      </div >
    );
  }
}
VideoTag.propTypes = {
  tag: propTypes.string,
  list: propTypes.array
}

export default VideoTag;