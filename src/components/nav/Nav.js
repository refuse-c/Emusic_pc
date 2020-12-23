/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 07:39:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-13 02:29:04
 * @Description: 发现-顶部导航
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './css/index.module.scss';
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<div className={styles.nav}>
      {this.props.list.map((item, index) => {
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
Nav.propTypes = {
  list: propTypes.array
}
export default Nav;