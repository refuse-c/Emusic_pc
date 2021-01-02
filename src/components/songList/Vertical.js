/*
 * @Author: REFUSE_C
 * @Date: 2020-11-02 09:43:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 17:51:17
 * @Description:  歌单列表组件-竖排    
 */
import { routerJump } from 'common/utils/tools';
import { Table } from 'antd';
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { withRouter } from 'react-router-dom';
class Vertical extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  columns = [
    {
      title: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record, index) => record.name,
      width: '40%',
    },
    {
      title: 'playCount',
      key: 'playCount',
      ellipsis: true,
      render: (text, record, index) => record.playCount,
      width: '20%',
    },
    {
      title: 'nickname',
      key: 'nickname',
      ellipsis: true,
      render: (text, record, index) => record.creator.nickname,
      width: '40%',
    }


  ]

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.vertical}>
        <Table
          bordered
          rowKey={"id"}
          size={"small"}
          columns={this.columns}
          dataSource={list}
          pagination={false}
          // rowClassName={(record, i) => record.st === -200 ? styles.disabled : (currentPlayer.id === record.id) ? styles.active : null}
          onChange={this.onChange}
          className={styles.table}
          onRow={(record, index) => {
            return {
              onClick: event => {
                routerJump(history, `/home/single${record.id}`);
              }, // 点击行
            };
          }}
          locale={{
            cancelSort: '取消排序',
            triggerAsc: '点击升序',
            triggerDesc: '点击降序'
          }}
        />
      </div>
    );
  }
}

export default withRouter(Vertical);