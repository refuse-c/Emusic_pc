/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 18:50:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-22 11:02:17
 * @Description 布局
 */
import React, { Component } from 'react';
import styles from './index.module.scss';
import Menu from 'components/menu/Menu';
import { Route } from 'react-router-dom';
import Footer from 'components/footer';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoadData: false
    }
  }


  callBack = () => {
    this.setState({ onLoadData: true }, () => this.setState({ onLoadData: false }))
  }

  render() {
    const { onLoadData } = this.state;
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
                      <route.component {...props} onLoadData={onLoadData} routes={route.routes} />
                    )}
                  />
                );
              } else {
                return (
                  <Route
                    key={key}
                    path={route.path}
                    render={(props) => (
                      <route.component {...props} onLoadData={onLoadData} routes={route.routes} />
                    )}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={styles.footer} >
          <Footer callBack={this.callBack} />
        </div>
      </div>
    );
  }
}

export default Home;