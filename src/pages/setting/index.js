/*
 * @Author: REFUSE_C
 * @Date: 2021-01-03 15:05:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-03 15:21:53
 * @Description:
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.setting}>
        <ScrollView className={styles.setting_scroll}>
          <div className={styles.setting_content}>
            <div className={styles.title}>
              <h3>设置</h3>
            </div>
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default Setting;