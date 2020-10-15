/*
 * @Author: REFUSE_C
 * @Date: 2020-10-05 15:05:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-05 20:17:58
 * @Description: 搜索-建议
 */
import React, { Component } from 'react';
import styles from '../css/index.module.scss';
import propTypes from 'prop-types';
import { highlightText } from '@/common/utils/tools';
class SearchSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { data, fun, keywords } = this.props;
    return (
      <div className={[styles.suggest, styles.arrow].join(' ')}>
        <p>搜索" <span className='highlight'>{keywords}</span> "的相关结果</p>
        {/* 歌手 */}
        {data.artists ?
          <div className={styles.render_box}>
            <h3>歌手</h3>
            <ul>
              {
                data.artists.map((item, index) => {
                  return (
                    <li
                      key={'item' + index}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(keywords, item.name)
                      }}
                    >
                    </li>
                  )
                })
              }
            </ul>
          </div> : null
        }

        {/* 单曲 */}
        {data.songs ?
          <div className={styles.render_box}>
            <h3>单曲</h3>
            <ul>
              {
                data.songs.map((item, index) => {
                  return (
                    <li
                      key={'item' + index}
                      dangerouslySetInnerHTML={{
                        __html: `${highlightText(keywords, item.name)} - ${highlightText(keywords, item.artists[0].name)}`
                      }}
                    >
                    </li>
                  )
                })
              }
            </ul>
          </div> : null
        }

        {/* 专辑 */}
        {data.albums ?
          <div className={styles.render_box}>
            <h3>专辑</h3>
            <ul>
              {
                data.albums.map((item, index) => {
                  return (
                    <li
                      key={'item' + index}
                      dangerouslySetInnerHTML={{
                        __html: `${highlightText(keywords, item.name)} - ${highlightText(keywords, item.artist.name)}`
                      }}
                    >
                    </li>
                  )
                })
              }
            </ul>
          </div> : null
        }

        {/* 歌单 */}
        {data.playlists ?
          <div className={styles.render_box}>
            <h3>歌单 </h3>
            <ul>
              {
                data.playlists.map((item, index) => {
                  return (
                    <li
                      key={'item' + index}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(keywords, item.name)
                      }}
                    >
                    </li>
                  )
                })
              }
            </ul>
          </div> : null
        }

      </div>
    );
  }
}
SearchSuggest.propTypes = {
  data: propTypes.object,
  keywords: propTypes.string,
  fun: propTypes.func
}
export default SearchSuggest;