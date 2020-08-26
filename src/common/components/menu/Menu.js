/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 10:14:46
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-26 20:40:22
 * @Description: 左侧菜单栏
 */
import React, { Component } from 'react';
import './menu.scss';
import ScrollView from 'react-custom-scrollbars';
import { NavLink } from 'react-router-dom';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { name: 'EMusic' },
        { name: '搜索', path: '/search', icon: 'search' },
        { name: '发现', path: '/find/', icon: 'find' },
        { name: '视频', path: '/video', icon: 'video' },
        { name: '朋友', path: '/friend', icon: 'friend' },
        { name: '我的音乐' },
        { name: '本地音乐', path: '/local', icon: 'local' },
        { name: '下载管理', path: '/down', icon: 'down' },
        { name: '最近播放', path: '/lately', icon: 'lately' },
        { name: '播放页', path: '/player', icon: 'player' },
      ],
    }
  }


  render() {
    return (<div className="menu">
      <ScrollView>
        <ul className="menu-list">
          {this.state.menuList.map((item, index) => {
            return (
              item.path ?
                <NavLink activeClassName="menu-list-active" key={index} to={item.path}>
                  <li> {item.name}</li>
                </NavLink>
                :
                <h3 key={index}>{item.name}</h3>
            )
          })}
        </ul>
      </ScrollView>

    </div >);
  }
}

export default Menu;