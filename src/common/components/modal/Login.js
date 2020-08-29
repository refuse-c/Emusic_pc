/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-28 22:27:08
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false
    }
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.hideModal(false)
    }, 3000);
  };

  handleCancel = () => {
    this.props.hideModal(false)
  };

  callback = key => {
    console.log(key);
  }

  render() {
    const { showModal } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Modal
          visible={showModal}
          title="小主,请选择登录的方式"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="验证码登录" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="密码登录" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="邮箱登录" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Modal>
      </>
    );
  }
}

export default Login;