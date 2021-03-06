/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:56:40
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { taglist, hotTag, playList, qualityTag, highquality } from 'common/api/api';
import SongListClassify from './component/SongListClassify';
import SongList from 'components/songList';
import { formatImgSize, formatTag } from 'common/utils/format';
import { Spin, Pagination } from 'antd';
import { routerJump } from 'common/utils/tools';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [], // 全部标签
      hotTagList: [], // 热门标签
      songList: [], // 歌单列表
      tag: '全部歌单',
      showModel: false,
      limit: 40,
      offset: 1,
      total: 0,
      loading: true,
      qualityTagList: [],
      qualityList: {},
    }
  }

  // 获取精品歌单tag
  queryQualityTag = async params => {
    const res = await qualityTag(params);
    if (res.code !== 200) return;
    let qualityTagList = [];
    res.tags.map(item => qualityTagList.push(item.name))
    this.setState({ qualityTagList });
  }
  // 获取歌单分类
  queryTaglist = async () => {
    const res = await taglist();
    if (res.code !== 200) return;
    const a = res.sub;
    const b = res.categories;
    const tagList = formatTag(a, b);
    this.setState({ tagList })
  }

  // 获取热门歌单分类
  queryHotTagList = async () => {
    const res = await hotTag();
    if (res.code !== 200) return;
    this.setState({ hotTagList: res.tags })
  }

  // 获取精品歌单
  queryHighquality = async (cat) => {
    const res = await highquality({ cat, limit: 1, before: '' })
    this.setState({ loading: false })
    if (res.code !== 200) return;
    this.setState({ qualityList: res.playlists[0] || {} });
  }

  // 获取歌单列表
  queryPlayList = async () => {
    const { tag, limit, offset } = this.state;
    let hasQuality = await this.hasQuality(tag); // 是否有精品歌单
    const params = {
      order: 'hot',
      cat: tag === '全部歌单' ? '全部' : tag,
      limit: offset === 1 && hasQuality ? limit - 1 : limit,
      offset: (offset - 1) * limit
    }
    hasQuality ? this.queryHighquality(tag) : this.setState({ qualityList: [] });
    const res = await playList(params);
    this.setState({ loading: false });
    if (res.code !== 200) return;
    const { total, playlists } = res;
    this.setState({ total, songList: playlists }, () => this.props.fun()) // 滚动到顶部
  }

  //点击tag
  chooseTag = tag => {
    this.setState({ tag, showModel: false, offset: 1, songList: [], total: 0, loading: true }, () => this.queryPlayList());
  }

  // 是否有精品歌单
  hasQuality = tag => {
    if (tag === '全部歌单') return true;
    const { qualityTagList } = this.state;
    return qualityTagList.includes(tag);
  }
  // 点击分页组件
  onChange = offset => {
    this.setState({ offset, total: 0, songList: [], loading: true }, () => this.queryPlayList());
  }

  componentDidMount = () => {
    this.queryQualityTag();
    this.queryTaglist();
    this.queryHotTagList();
    this.queryPlayList();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { tag, loading, showModel, tagList, hotTagList, songList, limit, offset, total, qualityList } = this.state;
    return (
      <div className={styles.song_list}>
        {qualityList.name ?
          <div className={styles.boutique} onClick={() => routerJump(this.props.history, `/home/qualityList${tag}`)}>
            <img className={styles.boutiquebg} src={formatImgSize(qualityList.coverImgUrl, 140, 140)} alt="" />
            <div className={styles.boutiquebg_content}>
              <img className={styles.coverImgUrl} src={formatImgSize(qualityList.coverImgUrl, 140, 140)} alt="" />
              <div className={styles.boutiquebg_info}>
                <p>精品歌单</p>
                <p>{qualityList.name}</p>
                <p>{qualityList.copywriter}</p>
              </div>
            </div>

          </div>
          : null
        }

        <div className={styles.hot_tag}>
          <div
            className={styles.all_list_text}
            onClick={() => this.setState({ showModel: true })}
          >
            {tag}
          </div>
          <ul>
            {hotTagList.map(item => {
              const cls = tag === item.name ? styles.active : '';
              return (<li
                key={item.name}
                className={cls}
                onClick={() => this.chooseTag(item.name)}
              >
                {item.name}
              </li>)
            })}
          </ul>
        </div>
        { <SongList tag={tag} list={songList} />}
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
        {
          loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
        {
          showModel ?
            <div className={styles.model}>
              <SongListClassify list={tagList} tag={tag} fun={this.chooseTag} />
            </div>
            :
            null
        }
      </div >
    );
  }
}

export default Index;