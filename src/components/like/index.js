/*
 * @Author: REFUSE_C
 * @Date: 2020-12-24 16:19:38
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-02 18:21:10
 * @Description: 当前音乐是否为用户喜欢的音乐
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
import { message } from 'antd';
import { setLike } from 'common/api/like';
import { getSession } from 'common/utils/tools';
class Like extends Component {
  // 查询当前音乐是否为喜欢音乐
  isLike = () => {
    const { id, list } = this.props;
    if (!list.length) return false;
    const res = list.findIndex(item => item === id)
    return !(res === -1)
  }

  // 添加/删除喜欢
  handelLike = async (id, like) => {
    const myLikeSingleId = getSession('myLikeSingleId');
    const currentSingleId = getSession('currentSingleId');
    const { callBack, reloadPlayList } = this.props;
    const res = await setLike({ id, like })
    message.destroy();
    if (res.code === 200) {
      // 重载我喜欢的音乐
      callBack && callBack();
      // 如果当前操作的歌单为用户喜欢的歌单则需要刷新喜欢的歌单
      if (myLikeSingleId === Number(currentSingleId))
        reloadPlayList && reloadPlayList();
      message.success(like ? '已添加到我喜欢的音乐' : '已取消');
    } else {
      message.error(like ? '添加到我喜欢的音乐失败' : '取消失败');
    }
  }

  // 阻止重复渲染
  shouldComponentUpdate = nextProps => {
    const { id, list } = this.props;
    return nextProps.id !== id || nextProps.list.length !== list.length;
  }

  render() {
    const isLike = this.isLike();
    const { id } = this.props;
    return (
      <div className={styles.like_one} >
        <i onClick={(e) => {
          this.handelLike(id, !isLike);
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
          className={isLike ? styles.like : styles.unlike}></i>
      </div >
    );
  }
}

export default Like;