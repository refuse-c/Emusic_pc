/*
 * @Author: REFUSE_C
 * @Date: 2021-01-07 16:34:15
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-08 14:23:48
 * @Description:
 * props值:
 * 1.title, 标题；
 * 2.hasShow 是否展示
 * 3.onClose 点击关闭的回调
 * 4.contentView 内容布局；
 */

import { Modal } from "antd";
import React, { Component } from "react";
import styles from './css/index.module.scss';


export default class BaseBoxModel extends Component {
  render() {
    const { title, width, height, hasShow, okText, cancelText, onFinish, onClose, headView, contentView } = this.props;
    return (
      <Modal
        width={width}
        title={title}
        visible={hasShow}
        maskClosable={true}
        okText={okText}
        cancelText={cancelText}
        onOk={onFinish && onFinish}
        onCancel={onClose && onClose}
        wrapClassName={`webModel`}
      >
        <div
          className={styles.contentbox}
          style={{ width: '100%', height: height || "auto" }}
        >
          {headView}
          {contentView}
        </div>
      </Modal>
    );
  }
}