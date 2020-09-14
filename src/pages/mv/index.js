/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:49:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 21:59:29
 * @Description:  全部mv
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import Tag from '@components/tag';
import FindTitle from '@components/findTitle';
import ScrollView from 'react-custom-scrollbars';
import MvList from '@pages/video/component/MvList';

import { allMv } from '@/common/api/api';
import { Spin } from 'antd';
class Mv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1, // 偏移数量
      limit: 20,// 返回数量, 默认为 30
      area: '全部',// 地区
      type: '全部', // 类型
      order: '上升最快', // 排序
      onLoad: false,
      loading: true,
      areaList: [
        {
          ti: '全部', key: '全部'
        }, {
          ti: '内地', key: '内地'
        }, {
          ti: '港台', key: '港台'
        }, {
          ti: '欧美', key: '欧美'
        }, {
          ti: '日本', key: '日本'
        }, {
          ti: '韩国', key: '韩国'
        }
      ],
      typeList: [
        {
          ti: '全部', key: '全部'
        }, {
          ti: '官方版', key: '官方版'
        }, {
          ti: '原生', key: '原生'
        }, {
          ti: '现场版', key: '现场版'
        }, {
          ti: '网易出品', key: '网易出品'
        }
      ],
      orderList: [
        {
          ti: '上升最快', key: '上升最快'
        }, {
          ti: '最热', key: '最热'
        }, {
          ti: '最新', key: '最新'
        }
      ],
      mvList: [], // mv列表
      hasMore: true  // 是否可以继续加载
    }
  }

  // handle item 
  chooseItem = (item, type) => {
    type === '1' ?
      this.setState({ area: item.key }, () => {
        this.setState({ mvList: [], offset: 1 }, () => this.queryAllMv());
      })
      : type === '2' ?
        this.setState({ type: item.key }, () => {
          this.setState({ mvList: [], offset: 1 }, () => this.queryAllMv());
        })
        : this.setState({ order: item.key }, () => {
          this.setState({ mvList: [], offset: 1 }, () => this.queryAllMv());
        })
  }

  // 全部mv
  queryAllMv = async () => {
    const { offset, limit, type, area, order } = this.state;
    const params = {
      limit, offset: (offset - 1) * limit, type, area, order
    }
    this.setState({ loading: true })
    const res = await allMv({
      ...params
    })

    if (res.code !== 200) return;
    const hasMore = res.hasMore;
    const nowList = res.data;
    const oldList = this.state.mvList;
    const newList = oldList.concat(nowList)
    this.setState({ hasMore, mvList: newList, offset: offset + 1, loading: false })
  }

  componentDidMount = () => {
    this.queryAllMv();
  }

  componentDidUpdate = () => {
    const { hasMore, onLoad } = this.state;
    if (!hasMore || !onLoad) return;
    this.queryAllMv();
  }

  // 滚动到底部改变状态触发事件
  handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      this.setState({ onLoad: true }, () => this.setState({ onLoad: false }))
    }
  }

  render() {
    const { history } = this.props;
    const { type, area, order, typeList, areaList, orderList, mvList, loading } = this.state;
    return (
      <div className={styles.all_mv} >
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <div className={styles.mv_box}>
            <FindTitle history={history} title={`全部MV`} />
            <Tag title={`地区`} tag={area} list={areaList} type={`1`} fun={this.chooseItem} />
            <Tag title={`类型`} tag={type} list={typeList} type={`2`} fun={this.chooseItem} />
            <Tag title={`排序`} tag={order} list={orderList} type={`3`} fun={this.chooseItem} />
            <div className={styles.mv_list_box}>
              <MvList list={mvList} />
            </div>
            {
              loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
            }
          </div>
        </ScrollView>
      </div >
    );
  }
}

export default Mv;