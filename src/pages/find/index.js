/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-26 20:31:40
 * @Description: 发现
 */
import React, { Component } from 'react';
import './css/index.scss';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<div className="find">
      <NavLink
        exact
        to={`/find`}
        activeClassName="menu-list-active"
      >
        {`个性推荐`}
      </NavLink>
      <NavLink
        exact
        to={`/find/songlist`}
        activeClassName="menu-list-active"
      >

        {`歌单`
        }
      </NavLink >
      <NavLink
        exact

        to={`/find/radioStation`}
        activeClassName="menu-list-active"
      >

        {`主播电台`}
      </NavLink>
      <NavLink
        exact

        to={`/find/leaderboard`}
        activeClassName="menu-list-active"
      >

        {`排行榜`}
      </NavLink>
      <NavLink
        exact

        to={`/find/singers`}
        activeClassName="menu-list-active"
      >

        {`歌手`}
      </NavLink>
      <NavLink
        exact

        to={`/find/newest`}
        activeClassName="menu-list-active"
      >

        {`最新音乐`}
      </NavLink>
      {
        this.props.routers.map((route, key) => {
          if (route.exact) {
            return (
              <Route
                key={key}
                exact
                path={route.path}
                render={(props) => (
                  <route.component {...props} routers={route.routers} />
                )}
              />
            );
          } else {
            return (
              <Route
                key={key}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routers={route.routers} />
                )}
              />
            );
          }
        })
      }
    </div >);
  }
}

export default Find;