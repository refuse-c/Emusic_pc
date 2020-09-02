/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 17:57:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 19:25:52
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'antd/dist/antd.css';
import 'reset.css';
import App from './App';
import '@common/utils/rem';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >
  , document.getElementById('root')
);