/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-26 20:35:14
 * @Description: 
 */
import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import './App.scss';
import routers from '@/router/router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import debounce from '@/common/utils/debounce';// 防抖
global.debounce = debounce;
function App() {
  return (
    <div className="App">
      <Header />

      <Router>

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
      </Router>
      <Footer />
    </div >
  );
}

export default App;
