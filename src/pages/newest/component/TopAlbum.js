
/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 17:01:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 01:49:26
 * @Description: 
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
import { formatImgSize } from '@/common/utils/format';
class TopAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, list } = this.props;
    return (
      <div className={styles.top_album}>
        <h3>{title}</h3>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li key={item.id}>
                  <div className={styles.positioning}>
                    <img src={formatImgSize(item.picUrl, 200, 200)} alt="" />
                  </div>
                  <p className='overflows'>{item.name}</p>
                  <p className='overflow'>{item.artist.name}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}


TopAlbum.propTypes = {
  list: propTypes.array,
  fun: propTypes.func
}
export default TopAlbum;