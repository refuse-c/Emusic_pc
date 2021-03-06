/*
 * @Author: REFUSE_C
 * @Date: 2020-09-10 12:22:21
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:56:59
 * @Description: 发现-排行榜-官方榜
 */
import React, { Component } from 'react'
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import PlayAll from 'components/playAll/PlayAll';
import { formatDate } from 'common/utils/format';
import { withRouter } from 'react-router-dom';

class OfficialList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.official_list}>
        {
          list.map(item => {
            return (
              <div
                key={item.ToplistType}
                className={styles.item_box}
              >
                <div
                  className={styles.bg}
                  onClick={() => history.push({ pathname: `/home/single${item.id}` })}
                >
                  {formatDate(item.updateTime, '0').substr(5) + '更新'}
                  <div className={styles.btn}>
                    {item.ToplistType !== 'A' ? <PlayAll cls={`play_all_1`} /> : null}
                  </div>
                </div>
                {
                  item.tracks ?
                    <ul>
                      {
                        item.tracks.map((item, index) => {
                          if (index > 7) return false;
                          return (
                            <li
                              key={item.id}
                            >
                              <p className='overflow'>{item.name} <span>{item.alia ? item.alia : ''}</span></p>
                              <p className='overflow'>{item.ar.map(item => item.name).join('/ ')}</p>
                            </li>
                          )
                        })
                      }
                    </ul> :
                    <ul>
                      {
                        item.artists.map((item, index) => {
                          if (index > 7) return false;
                          return (
                            <li
                              key={item.id}
                            >
                              {item.name}
                            </li>
                          )
                        })
                      }
                    </ul>
                }
                <div className={styles.view_all}>查看全部</div>
              </div>
            )
          })
        }
      </div >
    );
  }
}

OfficialList.propTypes = {
  list: propTypes.array
}
export default withRouter(OfficialList);