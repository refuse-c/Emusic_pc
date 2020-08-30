/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-30 09:11:07
 * @Description: 
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk))

export default store