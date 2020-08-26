/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-26 20:51:26
 * @Description 布局
 */
import React, { Component } from 'react';
import './index.scss';
import Menu from '@components/menu/Menu';
import { Route } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      < div className="home" >
        <div className="left">
          <Menu />
        </div>
        <div className="right">
          {this.props.routers.map((route, key) => {
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
          })}
        </div>
      </div >
    );
  }
}

export default Home;