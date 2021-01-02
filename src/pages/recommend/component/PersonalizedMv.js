/*
 * @Author: REFUSE_C
 * @Date: 2020-09-03 11:54:25
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:48:11
 * @Description: 个性推荐-推荐mv
 */

import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { formatImgSize } from 'common/utils/format';
import { withRouter } from 'react-router-dom';

class PersonalizedMv extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.personalized_mv}>
        <ul>
          {
            list && list.map(item => {
              return (
                <li key={item.id} onClick={() => history.push({ pathname: `/videoDetail${item.id}` })}>
                  <div
                    className={styles.img_box}
                    style={{
                      background: `url(${formatImgSize(item.picUrl, 250, 140)})  center left / 100% 100% no-repeat`
                    }}
                  >
                    <p className={styles.count}>{item.playCount}</p>
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

PersonalizedMv.propTypes = {
  list: propTypes.array
}
export default withRouter(PersonalizedMv);