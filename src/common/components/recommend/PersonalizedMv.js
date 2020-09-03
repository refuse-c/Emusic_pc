/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-03 17:46:52
 * @Description: 个性推荐-推荐mv
 */

import React, { Component } from 'react'
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';

class PersonalizedMv extends Component {
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
                background: `url(${formatImgSize(item.picUrl, 250, 140)})  center left / 100% 100% no-repeat`
              }}
            >
              <p className='count'>{item.playCount}</p>
            </div>
            <div className="name">{item.name}</div>
          </li>
        )
      })
    )
  }

  render() {
    return (
      <div className="personalized_mv">
        <ul>
          {
            this.renderList()
          }
        </ul>
      </div>
    );
  }
}

PersonalizedMv.propTypes = {
  list: propTypes.array
}
export default PersonalizedMv;