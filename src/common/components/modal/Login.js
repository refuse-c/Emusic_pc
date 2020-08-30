/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-30 17:06:21
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

let T1;
const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false
    }
  }

  handleOk = () => {
    clearTimeout(T1)
    this.setState({ loading: true });
    T1 = setTimeout(() => {
      this.setState({ loading: false });
      this.props.hideModal(false)
    }, 3000);
  };

  handleCancel = () => {
    clearTimeout(T1)
    this.props.hideModal(false);
    this.setState({ loading: false });
  };

  callback = key => {
    console.log(key);
  }
  onFinish = async () => {
    const values = await this.props.form.validateFields();
    //values
    console.log("values", values);
  };


  render() {
    const { showModal } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Modal
          visible={showModal}
          title="小主,请选择登录的方式"
          okText="登录"
          cancelText="取消"
          width={400}
          maskClosable={false}
          confirmLoading={loading}
          onOk={this.onFinish}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="账号">
              {/* {getFieldDecorator('phone', {
                initialValue: '13272946536',
                rules: [{ required: true, message: '请输入手机号码' }],
              })( */}
              <Input placeholder="请输入手机号码" />
              {/* )} */}
            </FormItem>
            <FormItem label="密码">
              {/* {getFieldDecorator('password', {
                initialValue: '123456',
                rules: [{
                  required: true, message: '请输入登录密码'
                }],
              })( */}
              <Input placeholder="请输入登录密码" />
              {/* )} */}
            </FormItem>
          </Form>
        </Modal >
      </div >
    );
  }
}

export default Login;