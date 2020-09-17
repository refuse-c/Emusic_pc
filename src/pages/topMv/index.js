/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 19:49:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-17 18:25:03
 * @Description:  全部mv
 */
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import FindTitle from '@components/findTitle';
import ScrollView from 'react-custom-scrollbars';
import TopMvList from '@pages/video/component/TopMvList';
import queryString from 'query-string';
import { topMv } from '@/common/api/api';
import { Spin } from 'antd';
class TopMv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: '内地',// 地区
      loading: true,
      updateTime: 0, // 更新时间
      areaList: [
        {
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
      topMvList: [], // mv列表
      hasMore: true  // 是否可以继续加载
    }
  }

  // handle item 
  chooseItem = item => {
    this.setState({ area: item, topMvList: [], loading: true }, () => this.queryTopMv())
  }

  //MV排行榜
  queryTopMv = async () => {
    const { area } = this.state;
    const res = await topMv({ area: area, limit: 50 });
    this.setState({ loading: false });
    if (res.code !== 200) return;
    this.setState({ topMvList: res.data, updateTime: res.updateTime })
  }


  componentDidMount = () => {
    const data = queryString.parse(this.props.history.location.search)
    if (data) {
      const area = data.area ? data.area : '内地';
      this.setState({ area }, () => this.queryTopMv());
    }
  }


  render() {
    const { area, areaList, topMvList, loading, updateTime } = this.state;
    return (
      <div className={styles.all_mv} >
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <div className={styles.mv_box}>
            <FindTitle tag={area} fun={this.chooseItem} title={`MV排行榜`} list={areaList} date={updateTime} />
            <div className={styles.mv_list_box}>
              <TopMvList list={topMvList} />
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

export default TopMv;