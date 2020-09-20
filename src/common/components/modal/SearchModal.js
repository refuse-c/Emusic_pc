/*
 * @Author: REFUSE_C
 * @Date: 2020-09-18 16:31:38
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-18 22:46:47
 * @Description: 搜索弹窗
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import ScrollView from 'react-custom-scrollbars';
class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={styles.search_Modal}>
        <ScrollView
          ref={sc => this.sc = sc}
        >

        </ScrollView>
      </div>
    );
  }
}

export default SearchModal;