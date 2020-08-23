/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-24 07:56:47
 * @Description: 
 */
import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import './App.scss';
import routes from '@/router/router';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import debounce from '@/common/utils/debounce';// 防抖
global.debounce = debounce;
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
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
        <Redirect to="/home/find" />
        {/* <Redirect to="/home/singerdetail30285885/" /> */}
        {/* <Redirect to="/home/find/rankingList" /> */}
        {/* <Redirect to="/home/albumdetail4546" /> */}
        {/* <Redirect to="/player" /> */}
      </Router>
      <Footer />
    </div>
  );
}

export default App;
