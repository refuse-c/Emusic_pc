/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-06 00:30:43
 * @Description: 
 */
import React from 'react';
import './App.scss';
import routes from 'router/router';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import debounce from './common/utils/debounce'; // 防抖
global.debounce = debounce;

function App() {
  return (<div className="App"> <Router> {
    routes.map((route, key) => {
      if (route.exact) {
        return (<Route key={
          key
        }

          exact path={
            route.path
          }

          render={
            (props) => (<route.component {
              ...props
            }

              routes={
                route.routes
              }

            />)
          }

        />);
      }

      else {
        return (<Route key={
          key
        }

          path={
            route.path
          }

          render={
            (props) => (<route.component {
              ...props
            }

              routes={
                route.routes
              }

            />)
          }

        />);
      }
    }

    )
  }


    {/* <Redirect exact from='/' to='/home/local/' /> */}
    {/* <Redirect exact from='/' to='/home/mylove/' /> */}
    {/* <Redirect exact from='/' to='/videoDetail10908736' /> */}
    <Redirect exact from='/' to='/home/single2971245150' />


  </Router> </div >);
}

export default (App);