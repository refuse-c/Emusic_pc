/*
 * @Author: REFUSE_C
 * @Date: 2020-09-02 17:37:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 12:56:56
 * @Description: 歌单组件
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNo } from 'common/utils/format';
import { routerJump } from 'common/utils/tools';
class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreDesc: false,
    }
  }

  // 跳转歌单详情页
  jump = item => {
    let pathname = '';
    const { tag, history } = this.props;
    switch (item.type) {
      case 'recommended': pathname = `/home/recommendSong`; break;
      case 'quality': pathname = `/home/qualityList${tag}`; break;
      default: pathname = `/home/single${item.id}`; break;
    }
    routerJump(history, pathname);
  }

  componentDidMount = () => {
    // 监听窗口大小变化
    window.addEventListener('resize', this.resizeListener)
  }

  resizeListener = () => {
    // const clientWidth = this.ul.clientWidth;
    // const width = (clientWidth - 25) / 5;
    // this.setState({ width })
    // console.log(width)

  }

  render() {
    // const { width } = this.state;
    const { list, type } = this.props;
    const cls = type === 'recommend' ? styles.recommend : styles.positioning;
    return (
      <div className={styles.song_list}>
        <ul ref={ul => this.ul = ul}>
          {
            list && list.map((item) => {
              return (
                item.type === 'recommended' ?
                  <li
                    key={item.id}
                    onClick={() => this.jump(item)}
                  >
                    <div className={cls}>
                      <div className={styles.desc}>
                        <p>{item.copywriter}</p>
                      </div>
                      <div className={styles.box}>
                        <p className={styles.week}>{item.week}</p>
                        <p className={styles.day}>{item.day}</p>
                      </div>
                    </div >
                    <div className={styles.name}>{item.name}</div>
                  </li >
                  :
                  <li
                    key={item.id}
                  >
                    <div
                      className={cls}
                      onClick={() => this.jump(item)}
                    >
                      {item.type === 'quality' ? null : <div className={styles.count}>{formatSerialNo(item.playCount)}</div>}
                      <div className={styles.desc}>
                        <p>{item.copywriter}</p>
                      </div>
                      <div
                        className={styles.box}
                        style={{
                          background: `url(${formatImgSize(item.coverImgUrl || item.picUrl, 200, 200)})  center left / 100% no-repeat`
                        }}
                      >
                      </div>
                    </div>
                    <div className={styles.name}>{item.name}</div>
                  </li>
              )
            })
          }
        </ul >
      </div >
    );
  }
}
SongList.propTypes = {
  tag: propTypes.string,
  type: propTypes.string,
  list: propTypes.array
}
export default SongList;