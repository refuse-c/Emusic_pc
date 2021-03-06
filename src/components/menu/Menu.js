/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 10:14:46
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-25 11:07:40
 * @Description: 左侧菜单栏
 */
import React, { Component } from 'react';
import ScrollView from 'react-custom-scrollbars';
import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { connect } from 'react-redux';
import { replaceName } from 'common/utils/tools';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { name: 'EMusic' },
        { name: '发现', path: '/home/find/', icon: 'find' },
        { name: '视频', path: '/home/video', icon: 'video' },
        { name: '朋友', path: '/home/friend', icon: 'friend' },
        { name: '我的音乐' },
        { name: '本地音乐', path: '/home/local', icon: 'local' },
        { name: '下载管理', path: '/home/down', icon: 'down' },
        // { name: '最近播放', path: '/home/lately', icon: 'lately' },
        // { name: '播放页', path: '/home/player', icon: 'player' },
      ],
    }
  }


  render() {
    const { userPlayList } = this.props;
    return (<div className={styles.menu}>
      <ScrollView>
        <ul className={styles.menu_list}>
          {this.state.menuList.map((item, index) => {
            return (
              item.path ?
                <NavLink className={styles.menu_a} activeClassName={styles.menu_list_active} key={index} to={item.path}>
                  <li> {item.name}</li>
                </NavLink>
                :
                <h3 key={index}>{item.name}</h3>
            )
          })}
          {userPlayList.map((item, index) => {
            return (
              item.id ?
                <NavLink className={styles.menu_a} exact activeClassName={styles.menu_list_active} key={index} to={`/home/single${item.id}`}>
                  <li> {replaceName(item.userId, item.name)}</li>
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

const mapStateToProps = state => {
  return {
    userPlayList: state.userPlayList,
  }
}
// const mapDispatchToProps = dispatch => {
//   return {}
// }

export default connect(mapStateToProps, null)(Menu)