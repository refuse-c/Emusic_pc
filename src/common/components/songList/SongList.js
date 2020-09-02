/*
 * @Author: REFUSE_C
 * @Date: 2020-09-02 17:37:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-02 20:08:25
 * @Description: 歌单组件
 */
import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';
class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderList = () => {
    const { list } = this.props;
    return (
      list && list.map((item) => {
        return (
          item.type === 'recommended' ?
            < li key={item.id} >
              <div className='positioning'>
                <div className='box'>
                  <p className='week'>{item.week}</p>
                  <p className='day'>{item.day}</p>
                </div>
              </div>
              <div className='name'>{item.name}</div>
            </li >
            :
            < li key={item.id} >
              <div className="positioning">
                <div className='box'>
                  <img src={formatImgSize(item.picUrl, 200, 200)} alt="" />
                </div>
              </div>
              <div className='name'>{item.name}</div>
            </li >
        )
      })
    )
  }

  render() {
    return (
      <div className="song_list">
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}
SongList.propTypes = {
  list: PropTypes.array
}
export default SongList;