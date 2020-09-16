/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 13:47:00
 * @Description:
 */
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);


export default store;