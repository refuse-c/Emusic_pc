/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:45:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-09 14:12:11
 * @Description: 歌单
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import { taglist, hotTag } from '@/common/api/api';

import SongListClassify from '@components/songList/SongListClassify';
import { formatTag } from '@/common/utils/format';


class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      hotTagList: [],
      tag: '全部歌单',
      showModal: false,
    }
  }

  componentDidMount = () => {
    this.queryTaglist();
    this.queryHotTagList();
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
    const hotTagList = res.tags || [];
    this.setState({ hotTagList })
  }

  //点击tag
  chooseTag = tag => {
    this.setState({ tag, showModal: false })
  }


  render() {
    const { tag, showModal, tagList, hotTagList } = this.state;
    console.log(hotTagList)
    return (
      <div className={styles.song_list}>
        < div
          className={styles.all_list_text}
          onClick={() => this.setState({ showModal: true })}
        >
          {tag}
        </div >
        <div className={styles.hot_tag}>
          <span>
            热门标签：</span>
          <ul>
            {hotTagList.map(item =>
              <li
                key={item.name}
              >
                {item.name}
              </li>
            )}
          </ul>
        </div>
        {
          showModal ?
            <SongListClassify list={tagList} tag={tag} fun={this.chooseTag} />
            :
            null
        }

      </div >
    );
  }
}

export default SongList;