/*
 * @Author: REFUSE_C
 * @Date: 2020-09-18 11:26:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 22:43:33
 * @Description: 独家放送-列表
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import MvList from '@components/mv';
import { Spin } from 'antd';
import FindTitle from '@common/components/findTitle';
import { privatecontentList } from '@/common/api/api';
import ScrollView from 'react-custom-scrollbars';
class PrivatecontentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      onLoad: false,
      more: false, // 是否可以继续加载更多
      limit: 30, // default: 60
      offset: 0,// default: 0
    }
  }

  // 获取独家放送列表
  queryPrivatecontentList = async () => {
    const { limit, offset } = this.state;

    const res = await privatecontentList({ limit, offset })
    this.setState({ loading: false })
    if (res.code === 200) {
      const oldList = this.state.list;
      const nowList = res.result;
      const newList = oldList.concat(nowList);
      this.setState({ list: newList, more: res.more, offset: offset + 1 })
    }
  }

  // 滚动到底部改变状态触发事件
  handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      this.setState({ onLoad: true }, () => this.setState({ onLoad: false }))
    }
  }

  componentDidMount = () => {
    this.queryPrivatecontentList();
  }

  componentDidUpdate = () => {
    const { onLoad, more } = this.state;
    if (onLoad && more) this.setState({ loading: true }, () => this.queryPrivatecontentList());
  }

  render() {
    const { list, loading } = this.state;
    const { history } = this.props;
    return (
      <div className={styles.privatecontent}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <div className={styles.privatecontent_box}>
            <FindTitle title={`独家放送`} />
            <MvList history={history} list={list} />
            {
              loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
            }
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default PrivatecontentList;