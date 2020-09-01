/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 10:51:25
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import store from './store';
import 'reset.css';
import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >
  , document.getElementById('root')
);