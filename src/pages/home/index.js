/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 13:48:40
 * @Description 布局
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Menu from '@components/menu/Menu';
import { Route } from 'react-router-dom';
import Footer from '@components/footer/Footer';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.home} >
        <div className={styles.top}>
          <div className={styles.left}>
            <Menu />
          </div>
          <div className={styles.right}>
            {this.props.routes.map((route, key) => {

              if (route.exact) {
                return (
                  <Route
                    key={key}
                    // exact
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
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;