/*
 * @Author: REFUSE_C
 * @Date: 2020-10-18 12:03:33
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 12:58:23
 * @Description: 
 */
import styles from './css/index.module.scss';
import React, { Component } from 'react';
import Head from '@components/head';
import queryString from 'query-string';
import { artists, artistSub } from '@/common/api/singer';
import { message } from 'antd';
import ScrollView from 'react-custom-scrollbars';
import { NavLink, Route } from 'react-router-dom';

class SingerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      onLoad: false,
      artist: {}, // 歌手数据
      menuList: [
        { name: '专辑', path: '/home/singerdetail' },
        { name: 'MV', path: '/home/singerdetail/mv' },
        { name: '歌手详情', path: '/home/singerdetail/desc' },
        { name: '相似歌手', path: '/home/singerdetail/simi' }
      ],
    }
  }
  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    this.setState({ id })
    this.getArtists(id);
  }


  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { id } = queryString.parse(nextProps.location.search)
    if (id !== nextProps.id) {
      return {
        id: id,
      };
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.id !== prevState.id) {
      this.getArtists(this.state.id);
    }
  }


  componentWillUnmount() {
    this.setState = () => false;
  }

  // 滚动到底部改变状态触发事件
  handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 10) {
      this.setState({ onLoad: true }, () => this.setState({ onLoad: false }))
    }
  }

  // 获取歌手单曲
  getArtists = async (id) => {
    const res = await artists({ id });
    if (res.code === 200) this.setState({ artist: res.artist })
  }
  // 收藏取消歌手  t:操作,1 为收藏,其他为取消收藏
  getArtistSub = async (id, t) => {
    const res = await artistSub({ id, t })
    if (res.code === 200) {
      message.destroy();
      t === 1 ? message.success('收藏成功') : message.success('取消收藏成功');
      this.getArtists(id);
    }
  }

  render() {
    const { id, artist, menuList, onLoad } = this.state;
    const { history, routes } = this.props;
    return (
      <div className={styles.singer_detail}>
        <ScrollView onScroll={this.handleScroll}>
          <Head data={artist} type={2} history={history} fun={this.getArtistSub} />
          <div className={styles.singer_nav}>
            <ul>
              {
                menuList.map(item => {
                  return (
                    <NavLink
                      exact
                      activeClassName={styles.active}
                      key={item.path}
                      to={`${item.path}?id=${id}`}
                    >
                      <li>{item.name}</li>
                    </NavLink>
                  )
                })
              }
            </ul>
          </div>
          <div className={styles.singer_content}>
            {routes.map((route, key) => {
              return (
                <Route
                  exact
                  key={key}
                  path={route.path}
                  render={(props) => (
                    <route.component
                      {...props}
                      id={id}
                      onLoad={onLoad}
                      routes={route.routes}
                    />
                  )}
                />
              );
            })}
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default SingerDetail;