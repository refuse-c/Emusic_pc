/*
 * @Author: REFUSE_C
 * @Date: 2020-09-15 16:33:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-19 17:02:53
 * @Description: 歌单列表
 */
import { formatSerialNo, formatSongTime } from '@/common/utils/format';
import { message, Table } from 'antd';
import React, { Component } from 'react'
import styles from './css/index.module.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPlayList, currentPlayer } from '@/store/actions';
import { highlightText, routerJump } from '@/common/utils/tools';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { setLike, likeList } from '@/common/api/like';
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [], // 点击排序后的新列表
      likeListIds: []
    }
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
      key: 'tool',
      width: 80,
      render: item => <div className="btn_box">
        <i
          className={this.isLike(item.id) !== -1 ? "like" : 'unlike'}
          onClick={() => this.handelLike(item.id, this.isLike(item.id) !== -1 ? false : true)}
        ></i>
        <i className="download"></i>
      </div>
    },
    {
      title: '音乐标题',
      key: 'name',
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
      key: 'singer',
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
      key: 'album',
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
      key: 'time',
      width: 80,
      sorter: (a, b) => a.dt - b.dt,
      render: item => formatSongTime(item.dt)
    },
  ];

  // 查询当前音乐是否为喜欢音乐
  isLike = id => {
    const { likeListIds: list } = this.state;
    if (list.length === 0) return;
    return list.findIndex(item => item === id)
  }

  // 查询全部喜欢的音乐
  queryLikeList = async (uid) => {
    const res = await likeList({ uid })
    const likeListIds = res.ids || [];
    this.setState({ likeListIds })
  }

  // 添加/删除喜欢
  handelLike = async (id, like) => {
    const { callBack } = this.props;
    const res = await setLike({ id, like })
    message.destroy();
    if (res.code === 200) {
      callBack && callBack();
      like ? message.info('已添加到我喜欢的音乐') : message.info('取消喜欢成功')
    } else {
      like ? message.info('添加到我喜欢的音乐失败,,请重试') : message.info('取消喜欢失败,请重试')
    }


  }

  selectRow = record => {
    // console.log(record)
    if (record.st === -200) {
      message.destroy();
      message.error('因合作方要求，该资源暂时下架')
    } else {
      const { currentPlayList } = this.props;
      const index = currentPlayList.findIndex(item => item.id === record.id);
      if (index === -1) {
        currentPlayList.unshift(record)
        // currentPlayList.splice(index, 1)
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

  // 获取喜欢的列表 
  componentDidMount = async () => {
    const { userInfo } = this.props;
    const uid = userInfo.profile ? userInfo.profile.userId : '';
    if (uid) await this.queryLikeList(uid);
  }

  componentDidUpdate = prevProps => {
    const { userInfo } = this.props;
    const uid = userInfo.profile ? userInfo.profile.userId : '';
    if (prevProps.list !== this.props.list) {
      this.queryLikeList(uid);
    }
  }

  render() {
    const { list, currentPlayer } = this.props;
    return (
      <Table
        // bordered
        rowKey={"id"}
        size={"small"}
        columns={this.columns}
        dataSource={list}
        pagination={false}
        rowClassName={(record, i) => record.st === -200 ? 'disabled' : (currentPlayer.id === record.id) ? 'active' : null
        }
        onChange={this.onChange}
        className={styles.table}
        onRow={(record, index) => {
          return {
            onClick: event => { }, // 点击行
            onDoubleClick: event => {
              this.selectRow(record)
              // record.fee === 4 ? message.info('版权方要求,当前专辑需单独付费,购买数字专辑即可无限畅享') : this.selectRow(record)
            },
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