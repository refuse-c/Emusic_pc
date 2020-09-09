/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 00:50:05
 * @Description: 发现
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { Route } from 'react-router-dom';
import Nav from './component/Nav';
import ScrollView from 'react-custom-scrollbars';
import { Spin } from 'antd';


class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  // 滚动到顶部
  scrollToTop = e => {
    this.sc.scrollToTop();
  }

  componentDidMount = () => { }
  render() {
    return (
      <div className={styles.find}>
        <ScrollView
          ref={sc => this.sc = sc}
          className={styles.find_scroll}
        >
          <Nav />
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
                        <route.component {...props} routers={route.routers} fun={this.scrollToTop} />
                      )}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={key}
                      path={route.path}
                      render={(props) => (
                        <route.component {...props} routers={route.routers} fun={this.scrollToTop} />
                      )}
                    />
                  );
                }
              })
            }
          </Spin>
        </ScrollView>
      </div >);
  }
}

export default Find;