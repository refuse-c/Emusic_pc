/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-17 11:05:37
 * @Description: 
 */
import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

import './App.scss';
import routers from '@/router/router';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import debounce from '@/common/utils/debounce';// 防抖
global.debounce = debounce;
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {routers.map((route, key) => {
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
        <Redirect exact from='/' to='/single2210176391' />
        <Footer />
      </Router>
    </div >
  );
}

export default (App);

// privilege.fee
// 8、0：免费
// 4：所在专辑需单独付费
// 1：VIP可听
// privilege.cs: 云盘
// privilege.st：-200无版权