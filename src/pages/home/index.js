/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 19:53:17
 * @Description 布局
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Menu from 'components/menu/Menu';
import { Route } from 'react-router-dom';
import Footer from 'components/footer';
import { likeList } from 'common/api/like';
import { getSession } from 'common/utils/tools';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeListIds: [],
      reloadPlayStatus: false
    }
  }


  // 查询全部喜欢的音乐
  queryLikeList = async () => {
    const uid = getSession('uid');
    if (!uid) return;
    const res = await likeList({ uid })
    const likeListIds = res.ids || [];
    this.setState({ likeListIds })
  }

  // 是否需要重载歌单
  isreloadPlayList = () => {
    this.setState({ reloadPlayStatus: true }, () => this.setState({ reloadPlayStatus: false }))
  }

  componentDidMount = () => {
    this.queryLikeList();
  }

  render() {
    const { likeListIds, reloadPlayStatus } = this.state;
    const { handelHideModal } = this.props;
    return (
      <div className={styles.home} >
        <div className={styles.top} onClick={() => handelHideModal && handelHideModal()}>
          <div className={styles.left}>
            <Menu />
          </div>
          <div className={styles.right}>
            {this.props.routes.map((route, key) => {

              if (route.exact) {
                return (
                  <Route
                    key={key}
                    // exact
                    path={route.path}
                    render={(props) => (
                      <route.component {...props}
                        routes={route.routes}
                        likeListIds={likeListIds}
                        status={reloadPlayStatus}
                        queryLikeList={this.queryLikeList}
                        reloadPlayList={this.isreloadPlayList}
                      />
                    )}
                  />
                );
              } else {
                return (
                  <Route
                    key={key}
                    path={route.path}
                    render={(props) => (
                      <route.component {...props}
                        routes={route.routes}
                        likeListIds={likeListIds}
                        status={reloadPlayStatus}
                        queryLikeList={this.queryLikeList}
                        reloadPlayList={this.isreloadPlayList}
                      />
                    )}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={styles.footer} >
          <Footer
            callBack={this.callBack}
            likeListIds={likeListIds}
            queryLikeList={this.queryLikeList}
            reloadPlayList={this.isreloadPlayList}
          />
        </div>
      </div>
    );
  }
}

export default Home;