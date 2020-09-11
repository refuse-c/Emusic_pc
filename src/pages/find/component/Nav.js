/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 07:39:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-11 10:47:15
 * @Description: 发现-顶部导航
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../css/index.module.scss';
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        { name: '个性推荐', path: `/find` },
        { name: '歌单', path: `/find/songlist` },
        { name: '主播电台', path: `/find/radioStation` },
        { name: '排行榜', path: `/find/topList` },
        { name: '歌手', path: `/find/singer` },
        { name: '最新音乐', path: `/find/newest` }
      ]
    }
  }
  render() {
    return (<div className={styles.nav}>
      {this.state.navList.map((item, index) => {
        return (
          <NavLink
            exact
            key={index}
            to={item.path}
            activeClassName={styles.menu_list_active}
          >
            {item.name}
          </NavLink>
        )
      })}
    </div>);
  }
}

export default Nav;