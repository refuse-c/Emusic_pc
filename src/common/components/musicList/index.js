/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-21 09:24:35
 * @Description: 歌单列表
 */
import { formatSerialNo, formatSongTime } from '@/common/utils/format';
import { message, Table } from 'antd';
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [] // 点击排序后的新列表
    }
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
      render: item => <div className='item'>
        <p>{item.name}</p>
        {/* {item.fee === 1 ? <i>VIP</i> : null}
        {item.dl === 999000 ? <i>SQ</i> : null}
        {item.mv !== 0 ? <i>MV</i> : null} */}
        {item.fee === 1 ? <i className={styles.vip}></i> : null}
        {item.dl === 999000 ? <i className={styles.sq}></i> : null}
        {item.mv !== 0 ? <i className={styles.mv}></i> : null}
      </div >
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
    if (record.st === -200) {
      message.error('因合作方要求，该资源暂时下架')
    } else {
      console.log(record)
    }

    // privilege.fee
    // 8、0：免费
    // 4：所在专辑需单独付费
    // 1：VIP可听
    // privilege.cs: 云盘
    // privilege.st：-200无版权
  }
  onChange = (pagination, filters, sorter, extra) => {
    this.setState({ newList: extra.currentDataSource })
  }
  // 控制样式
  setClassName = (record) => {
    return record.st === -200 ? styles.active : ''
  }

  render() {
    const { list } = this.props;
    return (
      <Table
        bordered
        rowKey={"id"}
        size={"small"}
        columns={this.columns}
        dataSource={list}
        pagination={false}
        rowClassName={this.setClassName}
        onChange={this.onChange}
        className={styles.table}
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
    );
  }
}
MusicList.propTypes = {
  list: propTypes.array
}
export default MusicList;