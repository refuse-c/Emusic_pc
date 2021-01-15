/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-16 01:00:50
 * @Description 布局
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Menu from 'components/menu/Menu';
import { Route } from 'react-router-dom';
import Footer from 'pages/footer';
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
  queryLikeList = () => {
    const uid = getSession('uid');
    if (!uid) return;
    likeList({ uid }).then(res => {
      const likeListIds = res.ids || [];
      console.log(likeListIds)
      this.setState({ likeListIds })
    })
  }

  // 是否需要重载歌单
  isreloadPlayList = () => {
    this.setState({ reloadPlayStatus: true }, () => this.setState({ reloadPlayStatus: false }))
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.queryLikeList();
    }, 2000);
  }

  render() {
    const { likeListIds, reloadPlayStatus } = this.state;
    const { handelHideModel } = this.props;
    return (
      <div className={styles.home} >
        <div className={styles.top} onClick={() => handelHideModel && handelHideModel()}>
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