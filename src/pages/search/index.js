/*
 * @Author: REFUSE_C
 * @Date: 2020-10-01 02:13:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-27 17:38:25
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
        { title: '单曲', key: '1' },
        { title: '歌手', key: '100' },
        { title: '专辑', key: '10' },
        { title: '视频', key: '1014' },
        { title: '歌单', key: '1000' },
        { title: '歌词', key: '1006' },
        { title: '主播电台', key: '1009' },
        { title: '用户', key: '1004' },
      ]
    }
  }

  getSearch = async (isFirst = false) => {
    console.log(isFirst)
    const { type, keywords, limit, offset } = this.state;
    const params = { type, keywords, limit, offset: offset * limit - limit }
    const res = await search(params);
    if (res.code !== 200) return;
    console.log(res.result)
    const { songs, songCount: total } = res.result;
    console.log(total)
    if (isFirst) this.setState({ total });

    this.querySongDetail(songs)
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

  componentDidMount = () => {
    const { keywords } = queryString.parse(this.props.location.search);
    this.setState({ keywords }, () => this.getSearch(true))
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




  render() {
    const { menuList, keywords, list, limit, offset, total } = this.state;
    console.log(list, total)
    return (

      <div className={styles.search}>
        <ScrollView>
          <div
            className={styles.searchInfo}
            dangerouslySetInnerHTML={{
              __html: `搜索${highlightText(keywords, keywords)},找到${total}首单曲`
            }}
          >
          </div>
          <div className={styles.searchNav}>
            <ul>
              {
                menuList.map(item => {
                  return (
                    <li key={item.key}>{item.title}</li>
                  )
                })
              }
            </ul>
          </div>
          <MusicList list={list} keywords={keywords} />
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