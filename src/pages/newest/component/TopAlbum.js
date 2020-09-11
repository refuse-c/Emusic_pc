
/*
 * @Author: REFUSE_C
 * @Date: 2020-09-11 17:01:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 17:05:13
 * @Description: 
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
class TopAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list } = this.props;
    // console.log(list)
    return (
      <div className={styles.top_album}>
        top_album
      </div>
    );
  }
}


TopAlbum.propTypes = {
  fun: propTypes.func
}
export default TopAlbum;