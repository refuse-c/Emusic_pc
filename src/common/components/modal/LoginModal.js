/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 18:05:38
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN } from '@/store/actionTypes';

let T1;
const FormItem = Form.Item

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }


  handleCancel = () => {
    clearTimeout(T1)
    this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
    this.setState({ loading: false });

  };

  callback = key => {
    console.log(key);
  }

  handleOk = async () => {
    const values = await this.props.form.validateFields();
    //values
    console.log("values", values);

    clearTimeout(T1)
    this.setState({ loading: true });
    T1 = setTimeout(() => {
      this.setState({ loading: false });
      this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
    }, 3000);
  };


  render() {
    const { showModal } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="账号">
              {getFieldDecorator('phone', {
                initialValue: '13272946536',
                rules: [{ required: true, message: '请输入手机号码' }],
              })(
                <Input placeholder="请输入手机号码" />
              )}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                initialValue: '123456',
                rules: [{
                  required: true, message: '请输入登录密码'
                }],
              })(
                <Input placeholder="请输入登录密码" />
              )}
            </FormItem>
          </Form>
        </Modal >
      </div >
    );
  }
}




const mapStateToprops = state => {
  console.log(state)
  return {
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelModalPower: bindActionCreators(modalPower, dispatch)
  }
}

// constaaa Refuse = ;

export default connect(mapStateToprops, mapDispatchToProps)(Form.create()(LoginModal));