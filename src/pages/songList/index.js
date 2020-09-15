/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 23:18:37
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { taglist, hotTag, playList } from '@/common/api/api';
import SongListClassify from './component/SongListClassify';
import PlayList from './component/PlayList';
import { formatTag } from '@/common/utils/format';
import { Spin, Pagination } from 'antd';


class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [], // 全部标签
      hotTagList: [], // 热门标签
      playlist: [], // 歌单列表
      tag: '全部歌单',
      showModal: false,
      limit: 40,
      offset: 1,
      total: 0,
      loading: true
    }
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
    const hotTagList = res.tags;
    this.setState({ hotTagList })
  }

  // 获取歌单列表
  queryPlayList = async () => {
    const { tag, limit, offset } = this.state;
    const params = {
      order: 'hot',
      cat: tag === '全部歌单' ? '全部' : tag,
      limit: offset === 1 ? limit - 1 : limit,//取出歌单数量 50
      offset: (offset - 1) * limit
    }
    let playlist = [];
    let defaultList = [{
      name: "精品歌单倾心推荐,给最懂音乐的你",
      type: 'boutique',
      id: 'refuse5201314',
      description: "精品歌单",
      coverImgUrl: ''
    }]
    const res = await playList(params);
    const { total, playlists } = res;
    offset === 1 ? playlist = defaultList.concat(playlists) : playlist = playlists;
    this.setState({ total, playlist, loading: false }, () => this.props.fun()) // 滚动到顶部
  }

  //点击tag
  chooseTag = tag => {
    this.setState({ tag, showModal: false, offset: 1, playlist: [], total: 0, loading: true }, () => this.queryPlayList());
  }

  // 点击分页组件
  onChange = offset => {
    this.setState({ offset, total: 0, playlist: [], loading: true }, () => this.queryPlayList());
  }

  componentDidMount = () => {
    this.queryTaglist();
    this.queryHotTagList();
    this.queryPlayList();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { history } = this.props;
    const { tag, loading, showModal, tagList, hotTagList, playlist, limit, offset, total } = this.state;
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
        {<PlayList list={playlist} history={history} />}
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

export default SongList;