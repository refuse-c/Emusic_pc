/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-21 16:52:36
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { taglist, hotTag, playList, qualityTag } from '@/common/api/api';
import SongListClassify from './component/SongListClassify';
import SongList from '@components/songList';
import { formatTag } from '@/common/utils/format';
import { Spin, Pagination } from 'antd';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [], // 全部标签
      hotTagList: [], // 热门标签
      songList: [], // 歌单列表
      tag: '全部歌单',
      showModal: false,
      limit: 40,
      offset: 1,
      total: 0,
      loading: true,
      qualityTagList: [],
      qualityList: [{
        name: "精品歌单倾心推荐,给最懂音乐的你",
        type: 'quality',
        id: 'refuse5201314',
        description: "精品歌单",
        coverImgUrl: require('@images/quality.png')
      }],
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

  // 获取歌单列表
  queryPlayList = async () => {
    const { tag, limit, offset, qualityList } = this.state;
    let songList = [];
    let hasQuality = this.hasQuality(tag); // 是否有精品歌单
    const params = {
      order: 'hot',
      cat: tag === '全部歌单' ? '全部' : tag,
      limit: offset === 1 && hasQuality ? limit - 1 : limit,
      offset: (offset - 1) * limit
    }
    const defaultList = hasQuality ? qualityList : [];
    const res = await playList(params);
    this.setState({ loading: false });
    if (res.code !== 200) return;
    const { total, playlists } = res;
    offset === 1 ? songList = defaultList.concat(playlists) : songList = playlists;
    this.setState({ total, songList }, () => this.props.fun()) // 滚动到顶部
  }

  //点击tag
  chooseTag = tag => {
    this.setState({ tag, showModal: false, offset: 1, songList: [], total: 0, loading: true }, () => this.queryPlayList());
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
    const { history } = this.props;
    const { tag, loading, showModal, tagList, hotTagList, songList, limit, offset, total } = this.state;
    return (
      <div className={styles.song_list}>
        <div
          className={styles.all_list_text}
          onClick={() => this.setState({ showModal: true })}
        >
          {tag}
        </div >
        <div className={styles.hot_tag}>
          <span> 热门标签：</span>
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
        {<SongList tag={tag} list={songList} history={history} />}
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
          showModal ?
            <div className={styles.modal}>
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