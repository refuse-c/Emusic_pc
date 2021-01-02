/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:49:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:54:32
 * @Description:  发现-歌手
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Tag from 'components/tag';
import SingerList from 'components/singer';

import { artistList } from 'common/api/api';
import { Spin } from 'antd';
class Singer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1, // 偏移数量
      limit: 100,// 返回数量, 默认为 30
      type: '-1',
      area: '-1',
      initial: '-1',
      typeList: [
        { ti: '全部', key: '-1' },
        { ti: '男歌手', key: '1' },
        { ti: '女歌手', key: '2' },
        { ti: '乐队', key: '3' },
      ],
      areaList: [
        { ti: '全部', key: '-1' },
        { ti: '华语', key: '7' },
        { ti: '欧美', key: '96' },
        { ti: '日本', key: '8' },
        { ti: '韩国', key: '16' },
        { ti: '其他', key: '0' },
      ],
      initialList: [
        { ti: '热门', key: '-1' },
        { ti: 'A', key: 'a' },
        { ti: 'B', key: 'b' },
        { ti: 'C', key: 'c' },
        { ti: 'D', key: 'd' },
        { ti: 'E', key: 'e' },
        { ti: 'F', key: 'f' },
        { ti: 'G', key: 'g' },
        { ti: 'H', key: 'h' },
        { ti: 'I', key: 'i' },
        { ti: 'J', key: 'j' },
        { ti: 'K', key: 'k' },
        { ti: 'L', key: 'l' },
        { ti: 'M', key: 'm' },
        { ti: 'N', key: 'n' },
        { ti: 'O', key: 'o' },
        { ti: 'P', key: 'p' },
        { ti: 'Q', key: 'q' },
        { ti: 'R', key: 'r' },
        { ti: 'S', key: 's' },
        { ti: 'T', key: 't' },
        { ti: 'U', key: 'u' },
        { ti: 'V', key: 'v' },
        { ti: 'W', key: 'w' },
        { ti: 'X', key: 'x' },
        { ti: 'Y', key: 'y' },
        { ti: 'Z', key: 'z' },
        { ti: '#', key: '0' },
      ],
      list: [], // 歌手列表
      more: true  // 是否可以继续加载
    }
  }

  // handle item 
  chooseItem = (item, type) => {
    type === '1' ?
      this.setState({ area: item.key }, () => {
        this.setState({ list: [], offset: 1 }, () => this.queryArtistList());
      })
      : type === '2' ?
        this.setState({ type: item.key }, () => {
          this.setState({ list: [], offset: 1 }, () => this.queryArtistList());
        })
        : this.setState({ initial: item.key }, () => {
          this.setState({ list: [], offset: 1 }, () => this.queryArtistList());
        })
  }

  // 歌手分类列表
  queryArtistList = async () => {
    const { offset, limit, type, area, initial } = this.state;
    const params = {
      limit, offset: (offset - 1) * limit, type, area, initial
    }
    const res = await artistList({ ...params })

    if (res.code !== 200) return;
    const more = res.more;
    const nowList = res.artists;
    const oldList = this.state.list;
    const newList = oldList.concat(nowList)
    this.setState({ more, list: newList, offset: offset + 1 })
  }


  componentDidMount = () => {
    this.queryArtistList();
  }

  componentDidUpdate = () => {
    const { onLoad } = this.props
    const { more } = this.state;
    if (!more || !onLoad) return;
    this.queryArtistList();
  }


  render() {
    const { type, area, initial, typeList, areaList, initialList, list, more } = this.state;
    return (
      <div className={styles.singer} >
        <div className={styles.tag_box}>
          <Tag title={`语种`} tag={area} list={areaList} type={`1`} fun={this.chooseItem} />
          <Tag title={`分类`} tag={type} list={typeList} type={`2`} fun={this.chooseItem} />
          <Tag title={`热门`} tag={initial} list={initialList} type={`3`} fun={this.chooseItem} />
        </div>
        <SingerList list={list} />
        {
          more ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
      </div >
    );
  }
}

export default Singer;