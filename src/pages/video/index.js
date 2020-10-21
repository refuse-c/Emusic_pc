/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 05:11:05
 * @Description: 视频
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { Route } from 'react-router-dom';
import Nav from '@components/nav/Nav';
import ScrollView from 'react-custom-scrollbars';
import { Spin } from 'antd';


class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      onLoad: false,
      navList: [
        { name: '视频', path: `/video` },
        { name: 'MV', path: `/video/mv` }
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
  render() {
    const { onLoad, navList } = this.state;
    return (
      <div className={styles.videos}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.video_scroll}
          onScroll={this.handleScroll}
        >
          <Nav list={navList} />
          < div className={styles.video_box}>
            <Spin tip="Loading..." spinning={false}>
              {
                this.props.routes.map((route, key) => {
                  if (route.exact) {
                    return (
                      <Route
                        key={key}
                        exact
                        path={route.path}
                        render={(props) => (
                          <route.component {...props} routes={route.routes} onLoad={onLoad} fun={this.scrollToTop} />
                        )}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={key}
                        path={route.path}
                        render={(props) => (
                          <route.component {...props} routes={route.routes} onLoad={onLoad} fun={this.scrollToTop} />
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

export default Videos;