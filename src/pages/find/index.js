/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-28 21:40:03
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
  render() {
    return (
      <div className={styles.find}>
        <ScrollView className={styles.find_scroll}>
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
                        <route.component {...props} routers={route.routers} />
                      )}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={key}
                      path={route.path}
                      render={(props) => (
                        <route.component {...props} routers={route.routers} />
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