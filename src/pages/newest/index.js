/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 09:51:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 02:19:11
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
      limit: 50,
      offset: 1,
      area: 'ALL',
      total: 0,
      type: 0,
      albumType: 0,  // 新碟上架type   0:　推荐  1:　全部
      menu: ['新歌速递', '新碟上架'],
      topSongData: [],
      // 新碟上架 
      // 推荐
      monthData: [],
      weekData: [],
      // 全部
      topAlbumData: [],

    }
  }

  // 点击菜单
  handleMenu = menuIndex => {
    if (menuIndex) {
      this.setState({ offset: 1 }, () => {
        this.queryTopAlbum();
      })
    } else {
      this.queryTopSong();
    }
    this.setState({ menuIndex })
  }

  // 子组件获取值
  chooseItem = item => {
    const { menuIndex } = this.state;
    this.setState({ type: item.type, area: item.area, offset: 1 }, () => {
      if (menuIndex) {
        this.queryTopAlbum();
      } else {
        this.queryTopSong()
      }
    })

  }

  // 获取新碟上架type 
  chooseAlbumTtype = albumType => {
    this.setState({ albumType });
  }

  // 新歌速递
  queryTopSong = async () => {
    this.setState({ topSongData: [] })
    const { type } = this.state;
    const params = { type }
    const res = await topSong({ ...params });
    if (res.code !== 200) return;
    this.setState({ topSongData: res.data })
  }

  //新碟上架 
  // type: new: 全部 hot: 热门, 默认为 new
  // year: 年, 默认本年
  // month: 月, 默认本月
  // 因暂不支持分页   因此取消分页 limit, offset: (offset - 1) * limit,
  queryTopAlbum = async () => {
    this.setState({
      monthData: [],
      weekData: []
    })
    const params = {
      area: this.state.area
    }
    const res = await topAlbum({ ...params })
    if (res.code !== 200) return;
    this.setState({
      monthData: res.monthData || [],
      weekData: res.weekData || []
    })
  }

  //全部新碟
  queryAllTopAlbum = async () => {
    this.setState({
      total: 0, topAlbumData: []
    })
    const { limit, offset, area } = this.state;
    const params = { limit, offset: (offset - 1) * limit, area }
    const res = await allTopAlbum({ ...params })
    if (res.code !== 200) return;
    const total = res.total;
    const topAlbumData = res.albums;
    this.setState({
      total, topAlbumData
    })
  }


  componentDidMount = () => {
    this.queryTopSong();
    this.queryTopAlbum();
    this.queryAllTopAlbum();
  }
  render() {
    const { area, menu, menuIndex, topAlbumData, topSongData, weekData, monthData, albumType } = this.state;
    return (
      <div className={styles.newest}>
        <div className={styles.type}>
          <ul>
            {
              menu.map((item, index) => {
                const cls = menuIndex === index ? styles.active : ''
                return (
                  <li key={item} className={cls} onClick={() => this.handleMenu(index)}>{item}</li>
                )
              })
            }
          </ul>
        </div>
        <NewestMenu type={menuIndex} fun1={this.chooseItem} fun2={this.chooseAlbumTtype} />
        {
          menuIndex ?
            albumType ?
              <TopAlbum title={`本周新碟`} list={topAlbumData} fun={this.chooseItem} />
              :
              <div>
                {area === 'ALL' ?
                  < TopAlbum title={`本周新碟`} list={weekData} fun={this.chooseItem} />
                  : null}
                <TopAlbum title={`本月新碟`} list={monthData} fun={this.chooseItem} />
              </div>
            :
            <TopSong list={topSongData} fun={this.chooseItem} />
        }
      </div >
    );
  }
}

export default Newest;