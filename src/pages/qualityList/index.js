/*
 * @Author: REFUSE_C
 * @Date: 2020-09-18 11:26:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-21 16:49:04
 * @Description: 独家放送-列表
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import List from './component/list';
import { Spin } from 'antd';
import FindTitle from '@common/components/findTitle';
import { highquality } from '@/common/api/api';
import ScrollView from 'react-custom-scrollbars';
import { isEmpty } from '@/common/utils/format';
class Highquality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      onLoad: false,
      more: false, // 是否可以继续加载更多
      limit: 20, // default: 60
    }
  }

  // 获取精品歌单
  queryHighquality = async () => {
    const oldList = this.state.list;
    const before = !isEmpty(oldList) ? oldList.pop().updateTime : '';
    const { limit } = this.state;
    const res = await highquality({ limit, before })
    this.setState({ loading: false })
    if (res.code === 200) {
      console.log(res)
      const nowList = res.playlists;
      const newList = oldList.concat(nowList);
      this.setState({ list: newList, more: res.more })
    }
  }

  // 滚动到底部改变状态触发事件
  handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      this.setState({ onLoad: true }, () => this.setState({ onLoad: false }))
    }
  }

  componentDidMount = () => {
    this.queryHighquality();
  }

  componentDidUpdate = () => {
    const { onLoad, more } = this.state;
    if (onLoad && more) this.setState({ loading: true }, () => this.queryHighquality());
  }

  render() {
    const { history } = this.props;
    const { list, loading } = this.state;
    return (
      <div className={styles.highquality}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <div className={styles.highquality_box}>
            <FindTitle title={`精品歌单`} />
            <List list={list} history={history} />
            {
              loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
            }
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default Highquality;