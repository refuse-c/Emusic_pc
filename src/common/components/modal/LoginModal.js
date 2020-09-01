/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-01 23:32:31
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from '@/store/actions';
import { IS_SHOW_LOGIN } from '@/store/actionTypes';
const FormItem = Form.Item;
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone: '13272946536',
      password: '123456'
    }
  }


  callback = key => {
    console.log(key);
  }

  onFinish = e => {
    this.formRef.current.validateFields()
      .then(values => {
        this.formRef.current.resetFields();
        console.dir(values);
      })
      .catch(err => {
        console.log(err);
      });
    // 关闭登录弹窗
    this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
  }

  onCancel = e => {
    this.formRef.current.resetFields();
    // 关闭登录弹窗
    this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
    this.setState({ loading: false });
  }

  formRef = React.createRef();
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
          onCancel={this.onCancel}
        >
          < Form ref={this.formRef} name="loginForm" preserve={false} autoComplete="off">
            <FormItem
              label="账号"
              name="phone"
              initialValue=""
              extra="*目前仅支持使用手机号码登录"
              getValueFromEvent={(e) => e.target.value.replace(/\D/g, '')}
              rules={
                [
                  {
                    required: true,
                    message: "账号不能为空"
                  },
                  {
                    pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
                    message: "您输入的手机号码有误"
                  },
                ]}
            >
              <Input type="tel" maxLength={11} placeholder="请输入手机号码" />

            </FormItem >
            <FormItem label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '密码不能为空'
                },
                {
                  pattern: /^\S*(?=\S{6,})\S*$/,
                  message: "密码最小6位"
                },
              ]
              }
            >
              <Input type="password" maxLength={20} placeholder="请输入登录密码" />

            </FormItem >
          </Form >
        </Modal>
      </div >
    );
  }
}




const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
