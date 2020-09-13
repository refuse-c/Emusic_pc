/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 02:06:06
 * @Description: 搜索
 */
import { Input } from 'antd';
import React, { Component } from 'react';
import './css/index.scss';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="search">
        <Input
          type='search'
        />
      </div>
    );
  }
}

export default Search;