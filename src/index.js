/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-31 14:26:18
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import 'reset.css';
import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >
  , document.getElementById('root')
);