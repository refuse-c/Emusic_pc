/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 08:02:12
 * @Description: 发现
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { Route } from 'react-router-dom';
import Nav from '@components/nav/Nav';
import ScrollView from 'react-custom-scrollbars';
import { Spin } from 'antd';


class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      onLoad: false,
      navList: [
        { name: '个性推荐', path: `/find` },
        { name: '歌单', path: `/find/songlist` },
        // { name: '主播电台', path: `/find/radioStation` },
        { name: '排行榜', path: `/find/topList` },
        { name: '歌手', path: `/find/singer` },
        { name: '最新音乐', path: `/find/newest` }
      ]
    }
  }
  // 滚动到顶部
  scrollToTop = e => {
    this.sc.scrollToTop();
  }
  // 滚动到底部改变状态触发事件
  handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight - 100 === e.target.scrollHeight - 100) {
      this.setState({ onLoad: true }, () => this.setState({ onLoad: false }))
    }
  }

  componentDidMount = () => { }

  componentWillUnmount() {
    this.setState = () => false;
  }


  render() {
    const { onLoad, navList } = this.state;
    return (
      <div className={styles.find}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
          onScroll={this.handleScroll}
        >
          <Nav list={navList} />
          < div className={styles.find_box}>
            <Spin tip="Loading..." spinning={false}>
              {
                this.props.routers.map((route, key) => {
                  if (route.exact) {
                    return (
                      <Route
                        key={key}
                        exact
                        path={route.path}
                        render={(props) => (
                          <route.component {...props} routers={route.routers} onLoad={onLoad} fun={this.scrollToTop} />
                        )}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={key}
                        path={route.path}
                        render={(props) => (
                          <route.component {...props} routers={route.routers} onLoad={onLoad} fun={this.scrollToTop} />
                        )}
                      />
                    );
                  }
                })
              }
            </Spin>
          </div>
        </ScrollView>
      </div >);
  }
}

export default Find;