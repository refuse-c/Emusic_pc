/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-19 21:19:33
 * @Description: 歌单列表
 */
import { formatLocalName, formatSerialNo, formatSongTime } from 'common/utils/format';
import { message, Table } from 'antd';
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPlayList, currentPlayer } from 'store/actions';
import { highlightText, routerJump } from 'common/utils/tools';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Like from 'components/like';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [], // 点击排序后的新列表
    }
  }
  onLineColumns = [
    {
      title: '序号',
      key: '1',
      render: (text, record, index) => `${formatSerialNo(index + 1)}`,
      width: 60,
    },
    {
      title: '操作',
      key: '2',
      width: 60,
      render: item => <div className="btn_box">
        <Like
          id={item.id}
          list={this.props.likeListIds}
          callBack={this.props.callBack}
          reloadPlayList={this.props.reloadPlayList}
        />
        <i className="download"></i>
      </div>
    },
    {
      title: '音乐标题',
      key: '3',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: item => <div className='item'>
        <p
          dangerouslySetInnerHTML={{
            __html: highlightText(this.props.keywords, item.name)
          }}
        ></p>
        {/* {item.fee === 1 ? <i>VIP</i> : null}
        {item.dl === 999000 ? <i>SQ</i> : null}
        {item.mv !== 0 ? <i>MV</i> : null} */}
        {item.fee === 1 ? <i className={styles.vip}></i> : null}
        {item.dl === 999000 ? <i className={styles.sq}></i> : null}
        {item.mv !== 0 ? <i onClick={() => this.props.history.push({ pathname: `/videoDetail${item.mv}` })} className={styles.mv} ></i> : null}
      </div >
    },
    {
      title: '歌手',
      key: '4',
      ellipsis: true,
      sorter: (a, b) => a.ar[0].name.localeCompare(b.ar[0].name),
      render: item => item.ar.map((item, index) =>
        <span
          key={`item` + index}
          className={styles.singerText}
          onClick={() => routerJump(this.props.history, `/home/singerdetail`, queryString.stringify({ id: item.id }))}
          dangerouslySetInnerHTML={{
            __html: highlightText(this.props.keywords, item.name)
          }}
        >
        </span>
      ),
    },
    {
      title: '专辑',
      key: '5',
      ellipsis: true,
      sorter: (a, b) => a.al.name.localeCompare(b.al.name),
      render: item =>
        <span
          className={styles.singerText}
          onClick={() => routerJump(this.props.history, `/home/album${item.al.id}`)}
          dangerouslySetInnerHTML={{
            __html: highlightText(this.props.keywords, item.al.name)
          }}
        ></span>
    },
    {
      title: '时长',
      key: '6',
      width: 80,
      sorter: (a, b) => a.dt - b.dt,
      render: item => formatSongTime(item.dt)
    },
  ];
  localColumns = [
    {
      title: '序号',
      key: '7',
      render: (text, record, index) => `${formatSerialNo(index + 1)}`,
      width: 60,
    },
    {
      title: '音乐标题',
      key: '8',
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: item => <div className='item'>
        <p>{formatLocalName(item.name)}</p>
      </div >
    },
    {
      title: '歌手',
      key: '9',
      ellipsis: true,
      sorter: (a, b) => a.ar[0].name.localeCompare(b.ar[0].name),
      render: item => item.ar.map((item, index) =>
        <span key={`i` + index} className={styles.singerText}>{item.name} </span>
      ),
    },
    {
      title: '专辑',
      key: '10',
      ellipsis: true,
      sorter: (a, b) => a.al.name.localeCompare(b.al.name),
      render: item => <span className={styles.singerText} >{item.al.name}</span>
    },
    {
      title: '时长',
      key: '11',
      width: 80,
      sorter: (a, b) => a.dt - b.dt,
      render: item => formatSongTime(item.dt)
    },
  ];

  selectRow = record => {
    message.destroy();
    if (record.st === -200) {
      message.error('因合作方要求，该资源暂时下架');
    } else if (record.fee === 4) {
      message.error('版权方要求,当前专辑需单独付费,购买数字专辑即可无限畅享');
    } else {
      const { currentPlayList } = this.props;
      const index = currentPlayList.findIndex(item => item.id === record.id);
      if (index === -1) {
        currentPlayList.unshift(record);
      }
      this.props.setCurrentPlayList(currentPlayList);
      this.props.setCurrentPlayer(record);
    }

    /*     
      privilege.fee
      8、0：免费
      4：所在专辑需单独付费
      1：VIP可听
      privilege.cs: 云盘
      privilege.st：-200无版权
    */
  }
  onChange = (pagination, filters, sorter, extra) => {
    this.setState({ newList: extra.currentDataSource })
  }
  // 控制样式
  setClassName = record => {
    return record.st === -200 ? styles.disabled : ''
  }

  render() {
    const { list, currentPlayer, type } = this.props;
    return (
      <Table
        // bordered
        rowKey={"id"}
        size={"small"}
        columns={type === 'local' ? this.localColumns : this.onLineColumns}
        dataSource={list}
        pagination={false}
        rowClassName={(record, i) => record.type === 'local' ? (currentPlayer.name === record.name ? 'active' : '') : (record.st === -200 ? 'disabled' : (currentPlayer.id === record.id) ? 'active' : null)
        }
        onChange={this.onChange}
        className={styles.table}
        onRow={(record, index) => {
          return {
            onClick: event => { }, // 点击行
            onDoubleClick: event => this.selectRow(record),
            // onContextMenu: event => { },
            // onMouseEnter: event => { }, // 鼠标移入行
            // onMouseLeave: event => { },
          };
        }
        }
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

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    userPlayList: state.userPlayList,
    currentPlayer: state.currentPlayer,
    currentPlayList: state.currentPlayList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentPlayList: bindActionCreators(currentPlayList, dispatch), // 当前播放歌单列表
    setCurrentPlayer: bindActionCreators(currentPlayer, dispatch), // 获取当前音乐信息
  }
}
const box = connect(mapStateToProps, mapDispatchToProps)(MusicList)
export default withRouter(box)