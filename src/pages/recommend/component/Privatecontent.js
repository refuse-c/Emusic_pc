/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 10:16:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-08 22:50:36
 * @Description:个性推荐-独家放送
 */

import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize } from 'common/utils/format';

class Privatecontent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.privatecontent}>
        <ul>
          {
            list && list.map(item => {
              return (
                <li key={item.id} onClick={() => history.push({ pathname: `/videoDetail${item.id}` })}>
                  <div
                    className={styles.img_box}
                    style={{
                      background: `url(${formatImgSize(item.picUrl, 360, 200)})  center left / 100% 100% no-repeat`
                    }}
                  >
                  </div>
                  <div className='name'>{item.name}</div>
                </li>
              )
            })
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