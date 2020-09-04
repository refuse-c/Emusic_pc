/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 19:05:56
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-03 22:09:29
 * @Description: 轮播图
 */
import React, { Component } from 'react';
import './index.scss';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  prePic = () => {
    const { list } = this.props;
    console.log(list)
  }

  renderBanner = () => {
    const { list } = this.props;
    return (
      list && list.map((item) => {
        return (
          <li key={item.encodeId}>
            <img src={formatImgSize(item.imageUrl, 520, 200)} alt="" />
          </li>
        )
      })
    )
  }

  render() {
    return (
      <div className="banner">
        {
          <ul>
            {this.renderBanner()}
          </ul>
        }
      </div>
    );
  }
}
Banner.propTypes = {
  list: propTypes.array
}
export default Banner;