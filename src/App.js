/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-25 17:21:01
 * @Description: 
 */
import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Menu from '@components/menu/Menu';
import './App.scss';
import routes from '@/router/router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import debounce from '@/common/utils/debounce';// 防抖
global.debounce = debounce;
function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <Menu />
        {routes.map((route, key) => {
          console.log(route)
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
      </Router>
      <Footer />
    </div>
  );
}

export default App;
