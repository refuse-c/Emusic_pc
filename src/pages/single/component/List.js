/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-16 00:15:07
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
    // {
    //   title: '操作',
    //   key: 'tool',
    //   width: 120,
    //   render: item => item.name
    // },
    {
      title: '音乐标题',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: item => item.name
    },
    {
      title: '歌手',
      key: 'singer',
      ellipsis: true,
      sorter: (a, b) => a.ar[0].name.localeCompare(b.ar[0].name),
      render: item => item.ar.map(item => item.name),
    },
    {
      title: '专辑',
      key: 'album',
      ellipsis: true,
      sorter: (a, b) => a.al.name.localeCompare(b.al.name),
      render: item => item.al.name
    },
    {
      title: '时长',
      key: 'time',
      width: 80,
      sorter: (a, b) => a.dt - b.dt,
      render: item => formatSongTime(item.dt)
    },
  ];

  selectRow = record => {
    console.log(record)
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        <Table
          bordered
          rowKey={"id"}
          size={"small"}
          columns={this.columns}
          dataSource={list}
          pagination={false}
          onRow={record => {
            return {
              onClick: event => { this.selectRow(record) }, // 点击行
              // onDoubleClick: {},
              // onContextMenu: event => { },
              // onMouseEnter: event => { }, // 鼠标移入行
              // onMouseLeave: event => { },
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

export default List;