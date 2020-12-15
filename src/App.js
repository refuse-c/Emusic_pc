/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-14 19:56:10
 * @Description: 
 */
import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

import './App.scss';
import routes from '@/router/router';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import debounce from './common/utils/debounce';// 防抖
global.debounce = debounce;
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {routes.map((route, key) => {
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
        {/* <Redirect exact from='/' to='/find' /> */}
        <Redirect exact from='/' to='/videoDetail490C4BEF78853D8CB24D68F2C2B969B6' />
        {/* <Redirect exact from='/' to='/search?keywords=南风' /> */}
        {/* <Redirect exact from='/' to='/userdetail?uid=287070050' /> */}
        <Footer />
      </Router>
    </div >
  );
}

export default (App);