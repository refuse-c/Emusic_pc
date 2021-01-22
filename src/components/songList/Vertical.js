/*
 * @Author: REFUSE_C
 * @Date: 2020-11-02 09:43:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-22 13:40:13
 * @Description:  歌单列表组件-竖排    
 */
import { routerJump } from 'common/utils/tools';
import { Table } from 'antd';
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { withRouter } from 'react-router-dom';
import { formatImgSize, formatSerialNo } from 'common/utils/format';
class Vertical extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  columns = [
    {
      title: 'coverImgUrl',
      key: 'coverImgUrl',
      ellipsis: true,
      render: (text, record, index) => <img style={{ position: 'relative', top: 7, borderRadius: 4 }} src={formatImgSize(record.coverImgUrl, 60, 60)} alt="" />,
      width: 80,
    },

    {
      title: 'name',
      key: 'name',
      ellipsis: true,
      render: (text, record, index) => record.name,
      width: '25%',
    },

    {
      title: 'nickname',
      key: 'nickname',
      ellipsis: true,
      render: (text, record, index) => record.creator.nickname,
      width: '25%',
    },
    {
      title: 'trackCount',
      key: 'trackCount',
      ellipsis: true,
      render: (text, record, index) => `${record.trackCount}首`,
      width: '15%',
    },
    {
      title: 'playCount',
      key: 'playCount',
      ellipsis: true,
      render: (text, record, index) => `${formatSerialNo(record.playCount)}`,
      width: '15%',
    },


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
          onChange={this.onChange}
          className={styles.table}
          onRow={record => {
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