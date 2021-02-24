/*
 * @Author: REFUSE_C
 * @Date: 2020-10-01 02:13:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-24 20:47:14
 * @Description:搜索
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import queryString from 'query-string';
import { search } from 'common/api/search';
import ScrollView from 'react-custom-scrollbars';
import { songDetail } from 'common/api/api';
import AlbumList from 'components/album';
import SingerList from 'components/singer';
import UserList from 'components/userList';
import MusicList from 'components/musicList';
import MvList from 'components/mv';
import Vertical from 'components/songList/Vertical';
import { keyToStr } from 'common/utils/format';
import { Pagination, Spin } from 'antd';
import { highlightText, traverseId } from 'common/utils/tools';

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
      loading: true,
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

  componentDidMount = () => {
    const { keywords } = queryString.parse(this.props.location.search);
    this.setState({ keywords }, () => this.getSearch());
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
      this.getSearch();
    }
  }


  // 滚动到顶部
  scrollToTop = e => {
    this.sc.scrollToTop();
  }

  getSearch = async () => {

    this.setState({ loading: true })
    const { type, keywords, limit, offset } = this.state;
    const params = { type, keywords, limit, offset: (offset - 1) * limit }
    const res = await search(params);
    if (type !== 1) {
      this.setState({ loading: false })
    }
    if (res.code !== 200) return;
    this.scrollToTop();
    const { songs, songCount, albums, albumCount, artists, artistCount, videos, videoCount, playlists, playlistCount, userprofiles, userprofileCount
    } = res.result;
    switch (type) {
      case 1: // 单曲
        this.setState({ total: songCount || (songs ? songs.length : 0) })
        songs ? this.querySongDetail(songs) : this.setState({ loading: false });

        break;

      case 10: // 专辑
        this.setState({ list: albums, total: albumCount || (albums ? albums.length : 0) })
        break;

      case 100: // 歌手
        this.setState({ list: artists, total: artistCount || (artists ? artists.length : 0) })
        break;

      case 1014: // 视频
        this.setState({ list: videos, total: videoCount || (videos ? videos.length : 0) })
        break;
      case 1000: // 歌单
        this.setState({ list: playlists, total: playlistCount || (playlists ? playlists.length : 0) })
        break;
      case 1002: // 用户
        this.setState({ list: userprofiles, total: userprofileCount || (userprofiles ? userprofiles.length : 0) })
        break;
      default: break;
    }
  }

  querySongDetail = async data => {
    const ids = traverseId(data);
    const res = await songDetail({ ids });
    this.setState({ loading: true });
    if (res.code !== 200) return;
    const { songs, privileges } = res;
    // 合并数据
    const list = privileges.reduce((pre, cur) => {
      const item = pre.find(el => el.id === cur.id);
      if (item) Object.assign(item, cur);
      return pre;
    }, songs);
    this.setState({ list, loading: false });
  }

  // 点击分页组件
  onChange = offset => {
    this.setState({ offset, total: 0, songList: [], loading: true }, () => this.getSearch());
  }

  // 点击类型
  chooseItem = type => {
    this.setState({ type, offset: 1, total: 0, list: [], loading: true }, () => this.getSearch())
  }

  renderDom = () => {
    const { queryLikeList, likeListIds } = this.props;
    const { type, list, keywords } = this.state;
    switch (type) {
      case 1: return <MusicList list={list} keywords={keywords} callBack={queryLikeList} likeListIds={likeListIds} />;
      case 10: return <div style={{ paddingRight: 30 }}><AlbumList list={list} isFullScreen={true} /></div>
      case 100: return <div style={{ paddingRight: 30 }}><SingerList list={list} isFullScreen={true} /></div>
      case 1014: return <div style={{ paddingRight: 30 }}><MvList list={list} isFullScreen={true} /></div>
      case 1000: return <div><Vertical list={list} /></div>
      case 1002: return <div><UserList list={list} /></div>

      default: break;
    }
  }


  render() {
    const { type, menuList, keywords, limit, offset, total, loading } = this.state;
    return (
      <div className={styles.search}>
        <ScrollView ref={sc => this.sc = sc}>
          <Spin tip="Loading..." spinning={loading}>
            <div
              className={styles.searchInfo}
              dangerouslySetInnerHTML={{
                __html: total ? `搜索${highlightText(keywords, keywords)},找到${total}${keyToStr(type)}` : `没有找到与${highlightText(keywords, keywords)}相关的内容哦`
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
          </Spin>
        </ScrollView>
      </div>
    );
  }
}

export default Search;