/*
 * @Author: REFUSE_C
 * @Date: 2020-09-21 14:36:15
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-21 17:04:54
 * @Description: 精品歌单-列表
 */
import { formatImgSize } from '@/common/utils/format';
import React, { Component } from 'react'
import styles from '../css/index.module.scss';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li
                  key={'item' + index}
                  onClick={() => this.props.history.push({ pathname: `/single${item.id}` })}
                >
                  <p
                    className={styles.cover}
                    style={{ background: `url(${formatImgSize(item.coverImgUrl, 100, 100)}) center center / 100% 100% no-repeat` }}

                  ></p>
                  <div>
                    <p>
                      <span>{item.tag}</span>
                      {item.name}
                    </p>

                    <p>{`by ${item.creator.nickname}`}</p>
                    <p>{item.copywriter}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Index;