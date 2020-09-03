/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 09:48:10
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-03 17:48:20
 * @Description:个性推荐-最新音乐
 */
import React, { Component } from 'react'
import propTypes from 'prop-types';
import { formatImgSize, formatSerialNumber } from '@/common/utils/format';
class NewMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderList = () => {
    const { list } = this.props;
    return (
      list && list.map((item, index) => {
        if (index > 9) return false;
        return (
          <li key={item.id}>
            <div className='su'>{formatSerialNumber(index + 1)}</div>
            <div
              className='minfo'
              style={{
                background: `url(${formatImgSize(item.album.picUrl, 40, 40)})  center left / 40px 40px no-repeat`
              }}
            >
              <p className='overflow name'>{item.name}</p>
              <p className='overflow singer'>{item.artists.map(item => item.name + '').join(' / ')}</p>
            </div>
          </li >
        )
      })
    )
  }

  render() {
    return (
      <div className="new_music">
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}


NewMusic.propTypes = {
  list: propTypes.array
}
export default NewMusic;