/*
 * @Author: REFUSE_C
 * @Date: 2020-11-02 09:43:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-11 16:53:49
 * @Description:  歌单列表组件-竖排    
 */
import { highlightText, routerJump } from '@/common/utils/tools';
import { Table } from 'antd';
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import queryString from 'query-string';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  columns = [
    {
      title: 'nickname',
      key: 'nickname',
      ellipsis: true,
      render: (text, record, index) =>
        <p dangerouslySetInnerHTML={{
          __html: highlightText(this.props.keywords, record.nickname)
        }}></p>,
      width: '20%',
      sorter: (a, b) => a.nickname.localeCompare(b.nickname),
    },
    {
      title: 'signature',
      key: 'signature',
      align: 'right',
      ellipsis: true,
      render: (text, record, index) => Number(record.userType) === 4 ? '网易音乐人' : record.signature,
      width: '40%',
    }
  ]

  render() {
    const { list, history } = this.props;
    return (
      <div className={styles.userList}>
        <Table
          bordered
          rowKey={"id"}
          size={"small"}
          columns={this.columns}
          dataSource={list}
          pagination={false}
          onChange={this.onChange}
          className={styles.table}
          onRow={(record, index) => {
            return {
              onClick: event => {
                routerJump(history, `/userdetail`, queryString.stringify({ uid: record.userId }));
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

export default UserList;