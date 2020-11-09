/*
 * @Author: REFUSE_C
 * @Date: 2020-10-01 02:13:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-09 14:32:29
 * @Description:搜索
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import MusicList from '@components/musicList';
import queryString from 'query-string';
import { search } from '@/common/api/search';
import ScrollView from 'react-custom-scrollbars';
import { songDetail } from '@/common/api/api';
import { highlightText, traverseId } from '@/common/utils/tools';
import { Pagination } from 'antd';
import AlbumList from '@components/album';
import SingerList from '@components/singer';
import Vertical from '@components/songList/Vertical';

import MvList from '@components/mv';
import { keyToStr } from '@/common/utils/format';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      keywords: '',
      limit: 100,
      offset: 1,
      total: 0,
      list: [], // 单曲
      // 1 即单曲, 取值意义: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合
      menuList: [
        { title: '单曲', key: 1 },
        { title: '歌手', key: 100 },
        { title: '专辑', key: 10 },
        { title: '视频', key: 1014 },
        { title: '歌单', key: 1000 },
        // { title: '歌词', key: 1006 },
        // { title: '主播电台', key: 1009 },
        { title: '用户', key: 1002 },
      ]
    }
  }

  getSearch = async (isFirst = false) => {
    console.log(isFirst)
    const { type, keywords, limit, offset } = this.state;
    const params = { type, keywords, limit, offset: (offset - 1) }
    const res = await search(params);
    if (res.code !== 200) return;
    console.log(res)
    const { songs, songCount, albums, albumCount, artists, artistCount, videos, videoCount, playlists, playlistCount, userprofiles, userprofileCount } = res.result;
    switch (type) {
      case 1: // 单曲
        if (isFirst) this.setState({ total: songCount })
        this.querySongDetail(songs);
        break;

      case 10: // 专辑
        isFirst ? this.setState({ list: albums, total: albumCount }) : this.setState({ list: albums });
        break;

      case 100: // 歌手
        isFirst ? this.setState({ list: artists, total: artistCount }) : this.setState({ list: artists });
        break;

      case 1014: // 视频
        isFirst ? this.setState({ list: videos, total: videoCount }) : this.setState({ list: videos });
        break;
      case 1000: // 歌单
        isFirst ? this.setState({ list: playlists, total: playlistCount }) : this.setState({ list: playlists });
        break;
      // case 1000: // 歌单
      //   isFirst ? this.setState({ list: userprofiles, total: userprofileCount }) : this.setState({ list: userprofiles });
      //   break;
      default: break;
    }

  }

  querySongDetail = async data => {
    const ids = traverseId(data);
    const res = await songDetail({ ids });
    this.setState({ loading: false });
    if (res.code !== 200) return;
    const { songs, privileges } = res;
    // 合并数据
    const list = privileges.reduce((pre, cur) => {
      const item = pre.find(el => el.id === cur.id);
      if (item) Object.assign(item, cur);
      return pre;
    }, songs);
    this.setState({ list });
  }

  // 点击分页组件
  onChange = offset => {
    this.setState({ offset, total: 0, songList: [], loading: true }, () => this.getSearch());
  }

  // 点击类型
  chooseItem = type => {
    console.log(type)
    this.setState({ type, offset: 1, total: 0, list: [], loading: true }, () => this.getSearch(true))
  }

  componentDidMount = () => {
    const { keywords } = queryString.parse(this.props.location.search);
    this.setState({ keywords }, () => this.getSearch(true));
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { keywords } = queryString.parse(nextProps.location.search);
    if (keywords !== prevState.keywords) {
      return {
        keywords: keywords
      };
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.keywords !== prevState.keywords) {
      this.getSearch(true)
    }
  }

  renderDom = () => {
    const { history } = this.props;
    const { type, list, keywords } = this.state;
    switch (type) {
      case 1: return <MusicList list={list} keywords={keywords} history={history} />;
      case 10: return <div style={{ paddingRight: 30 }}><AlbumList list={list} isFullScreen={true} /></div>
      case 100: return <div style={{ paddingRight: 30 }}><SingerList list={list} history={history} isFullScreen={true} /></div>
      case 1014: return <div style={{ paddingRight: 30 }}><MvList list={list} isFullScreen={true} /></div>
      case 1000: return <div><Vertical list={list} history={history} /></div>
      case 1002: return <div><Vertical list={list} history={history} /></div>
      default: break;
    }
  }


  render() {
    const { type, menuList, keywords, limit, offset, total } = this.state;
    return (
      <div className={styles.search}>
        <ScrollView>
          <div
            className={styles.searchInfo}
            dangerouslySetInnerHTML={{
              __html: `搜索${highlightText(keywords, keywords)},找到${total}${keyToStr(type)}`
            }}
          >
          </div>
          <div className={styles.searchNav}>
            <ul>
              {
                menuList.map(item => {
                  const cls = item.key === type ? styles.active : null
                  return (
                    <li
                      key={item.key}
                      className={cls}
                      onClick={() => this.chooseItem(item.key)}
                    >
                      {item.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {
            this.renderDom()
          }
          <div className={styles.pages}>
            <Pagination
              total={total}
              pageSize={limit}
              current={offset}
              hideOnSinglePage={true}
              onChange={this.onChange}
              showSizeChanger={false}
            />
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default Search;