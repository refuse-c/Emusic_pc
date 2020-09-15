/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-15 18:08:19
 * @Description: 歌单详情-头部
 */
import { formatSerialNo, formatSongTime } from '@/common/utils/format';
import { Table } from 'antd';
import React, { Component } from 'react'
import styles from '../css/index.module.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  columns = [
    {
      title: '序号',
      key: 'index',
      render: (text, record, index) => `${formatSerialNo(index + 1)}`,
      width: 60,
    },
    {
      title: '操作',
      dataIndex: 'tool',
      width: 120,
    },
    {
      title: '音乐标题',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '歌手',
      key: 'singer',
      ellipsis: true,
      render: item => item.ar.map(item => item.name),
      sorter: (a, b) => a.name - b.name
    },
    {
      title: '专辑',
      key: 'album',
      ellipsis: true,
      render: item => item.al.name,
      sorter: (a, b) => a.al.name - b.al.name
    },
    {
      title: '时长',
      key: 'time',
      render: item => formatSongTime(item.dt),
      width: 80,
      sorter: (a, b) => a.dt - b.dt
    },
  ];
  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        <Table
          border={true}
          columns={this.columns}
          dataSource={list}
          pagination={false}
        />
      </div>
    );
  }
}

export default List;