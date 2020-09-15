/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 09:51:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 14:05:48
 * @Description: 发现-最新音乐
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import NewestMenu from './component/NewestMenu';
import TopSong from './component/TopSong';
import TopAlbum from './component/TopAlbum';
import { Spin } from 'antd';
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
      loading: true
    }
  }

  // 点击菜单
  handleMenu = menuIndex => {
    this.setState({ offset: 1, loading: true, menuIndex }, () => {
      menuIndex ? this.queryTopAlbum() : this.queryTopSong();
    })
  }

  // 子组件获取值
  chooseItem = item => {
    const { menuIndex } = this.state;
    this.setState({
      type: item.type, area: item.area, offset: 1, monthData: [], weekData: [], loading: true
    }, () => {
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
    this.setState({ topSongData: res.data, loading: false })
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
      loading: false,
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
      total, topAlbumData, loading: false
    })
  }


  componentDidMount = () => {
    this.queryTopSong();
    this.queryTopAlbum();
    this.queryAllTopAlbum();
  }
  render() {
    const { area, loading, menu, menuIndex, topAlbumData, topSongData, weekData, monthData, albumType } = this.state;
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
          loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
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