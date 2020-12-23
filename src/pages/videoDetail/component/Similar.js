/*
 * @Author: REFUSE_C
 * @Date: 2020-12-15 20:10:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-16 14:06:06
 * @Description: 视频--相似视频
 */
import { } from 'common/api/video';
import { formatImgSize } from 'common/utils/format';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../css/index.module.scss';
class Similar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data, type } = this.props;
    return (
      <div className={styles.similar}>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index}
                onClick={() => this.props.history.push({ pathname: `/videoDetail${type === 1 ? item.id : item.vid}` })}
              >
                <img src={formatImgSize(type === 1 ? item.cover : item.coverUrl, 140, 80)} alt="" />
                <div className={styles.similarInfo}>
                  <p className="overflows">{type === 1 ? item.name : item.title}</p>
                  <p className="overflows">by <span>{type === 1 ? item.artistName : type === 2 ? item.creator[0].userName : ''}</span></p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Similar);