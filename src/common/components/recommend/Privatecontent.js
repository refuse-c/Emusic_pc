/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 10:16:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-04 22:33:14
 * @Description:个性推荐-独家放送
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';

class Privatecontent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderList = () => {
    const { list } = this.props;
    return (
      list && list.map(item => {
        return (
          <li key={item.id}>
            <div
              className="img_box"
              style={{
                background: `url(${formatImgSize(item.picUrl, 360, 200)})  center left / 100% 100% no-repeat`
              }}
            >
            </div>
            <div className="name">{item.name}</div>
          </li>
        )
      })
    )
  }


  render() {
    return (
      <div className="privatecontent">
        <ul>
          {
            this.renderList()
          }
        </ul>
      </div>
    );
  }
}


Privatecontent.propTypes = {
  list: propTypes.array
}

export default Privatecontent;