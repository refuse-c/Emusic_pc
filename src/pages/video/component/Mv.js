/*
 * @Author: REFUSE_C
 * @Date: 2020-09-13 02:34:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-21 13:52:58
 * @Description: 视频-视频
 */
import React, { Component } from 'react';
import { firstMv, hotMv, wycpMv, topMv } from '@common/api/api';
import MvList from '@components/mv';
import TopMvList from './TopMvList';
import FindTitle from '@common/components/findTitle';
class Mv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag1: '内地',
      tag2: '内地',
      limit: 8,
      firstMvList: [],
      hotMvList: [],
      wycpMvList: [],
      topMvList: [],
      menuList: [
        { ti: '内地' },
        { ti: '港台' },
        { ti: '欧美' },
        { ti: '日本' },
        { ti: '韩国' },
      ],
    }
  }

  // 获取最新mv
  queryFirstMv = async () => {
    const { tag1, limit } = this.state;
    const res = await firstMv({ area: tag1, limit });
    if (res.code !== 200) return;
    this.setState({ firstMvList: res.data })
  }

  // 热播MV
  queryHotMv = async () => {
    const res = await hotMv();
    if (res.code !== 200) return;
    this.setState({ hotMvList: res.result })
  }

  // 网易出品
  queryWycpMv = async () => {
    const { limit } = this.state;
    const res = await wycpMv({ limit });
    if (res.code !== 200) return;
    this.setState({ wycpMvList: res.data })
  }

  //MV排行榜
  queryTopMv = async () => {
    const { tag2 } = this.state;
    const res = await topMv({ area: tag2, limit: 10 });
    if (res.code !== 200) return;
    this.setState({ topMvList: res.data })
  }

  componentDidMount = () => {
    this.queryFirstMv();
    this.queryHotMv();
    this.queryWycpMv();
    this.queryTopMv();
  }

  // 获取子组件的值
  obtainChildItem = (item, type) => {
    this.setState(type === 5 ? { tag1: item } : { tag2: item }, () => {
      type === 5 ? this.queryFirstMv() : this.queryTopMv();
    })
  }
  render() {
    const { history } = this.props;
    const { tag1, tag2, menuList, firstMvList, hotMvList, wycpMvList, topMvList } = this.state;
    return (
      <div className="mv">
        <FindTitle history={history} type={5} tag={tag1} fun={this.obtainChildItem} title={`最新MV`} list={menuList} />
        <MvList list={firstMvList} />

        <FindTitle history={history} type={6} title={`热播MV`} />
        <MvList list={hotMvList} />

        <FindTitle history={history} type={7} title={`网易出品`} />
        <MvList list={wycpMvList} />

        <FindTitle history={history} type={8} tag={tag2} fun={this.obtainChildItem} title={`MV排行榜`} list={menuList} />
        <TopMvList list={topMvList} />
      </div>
    );
  }
}

export default Mv;