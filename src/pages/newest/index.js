/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 09:51:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 17:10:35
 * @Description: 发现-最新音乐
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import NewestMenu from './component/NewestMenu';
import TopSong from './component/TopSong';
import TopAlbum from './component/TopAlbum';
import { allTopAlbum, topAlbum, topSong } from '@/common/api/api';
class Newest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 0,
      menu: ['新歌速递', '新碟上架'],
      limit: 50,
      offset: 1,
      area: 'ALL',
      type: 0,
      topSongList: [],
      topAlbumList: [],

    }
  }

  chooseItem = item => {
    console.log(item)
    const { menuIndex } = this.state;
    if (!menuIndex) {
      this.setState({ type: item.type, area: item.area, offset: 1 }, () => {
        this.queryTopAlbum();
      })
    } else {
      this.queryTopSong();
    }
  }

  // 新歌速递
  queryTopSong = async () => {
    const { type } = this.state;
    const params = { type }
    const res = await topSong({ ...params });
    console.log(res)
    if (res.code !== 200) return;
    this.setState({ topSongList: res.data })
  }

  //新碟上架 
  // type: new: 全部 hot: 热门, 默认为 new
  // year: 年, 默认本年
  // month: 月, 默认本月
  queryTopAlbum = async () => {
    const { limit, offset, area } = this.state;
    const params = { limit, offset: (offset - 1) * limit, area }
    const res = await topAlbum({ ...params })
    console.log(res)
  }

  //全部新碟
  queryAllTopAlbum = async () => {
    const { limit, offset, area } = this.state;
    const params = { limit, offset: (offset - 1) * limit, area }
    const res = await allTopAlbum({ ...params })
    console.log(res)
  }


  componentDidMount = () => {
    this.queryTopSong();
  }
  render() {
    const { menu, menuIndex } = this.state;
    return (
      <div className={styles.newest}>
        <div className={styles.type}>
          <ul>
            {
              menu.map((item, index) => {
                const cls = menuIndex === index ? styles.active : ''
                return (
                  <li key={item} className={cls} onClick={() => this.setState({ menuIndex: index })}>{item}</li>
                )
              })
            }
          </ul>
        </div>
        <NewestMenu fun={this.chooseItem} />
        {
          menuIndex ?
            <TopAlbum fun={this.chooseItem} />
            :
            <TopSong fun={this.chooseItem} />
        }
      </div>
    );
  }
}

export default Newest;