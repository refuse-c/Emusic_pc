/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 13:48:53
//  * @Description: 
 */
import React, { Component } from "react";
import Header from '@components/header/Header';
import { Route } from 'react-router-dom';
import styles from './css/index.module.scss';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.index}>
        <Header />
        {this.props.routes.map((route, key) => {

          if (route.exact) {
            return (
              <Route
                key={key}
                exact
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            );
          } else {
            return (
              <Route
                key={key}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            );
          }
        })}
      </div>)
  }
}

export default Index;
