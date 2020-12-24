/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 17:34:58
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
      onLoadData: false,
      likeListIds: []
    }
  }


  // 查询全部喜欢的音乐
  queryLikeList = async () => {
    console.log('我刚刚执行了一次')
    const uid = getSession('uid');
    if (!uid) return;
    const res = await likeList({ uid })
    const likeListIds = res.ids || [];
    this.setState({ likeListIds })
  }

  componentDidMount = () => {
    this.queryLikeList();
  }
  // callBack = () => {
  //   this.setState({ onLoadData: true }, () => this.setState({ onLoadData: false }))
  // }

  render() {
    const { onLoadData, likeListIds } = this.state;
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
                      <route.component {...props} queryLikeList={this.queryLikeList} likeListIds={likeListIds} onLoadData={onLoadData} routes={route.routes} />
                    )}
                  />
                );
              } else {
                return (
                  <Route
                    key={key}
                    path={route.path}
                    render={(props) => (
                      <route.component {...props} queryLikeList={this.queryLikeList} likeListIds={likeListIds} onLoadData={onLoadData} routes={route.routes} />
                    )}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={styles.footer} >
          <Footer callBack={this.callBack} queryLikeList={this.queryLikeList} likeListIds={likeListIds} />
        </div>
      </div>
    );
  }
}

export default Home;