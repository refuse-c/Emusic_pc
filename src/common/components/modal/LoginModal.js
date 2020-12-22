/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-22 11:10:38
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower, queryUserInfo, userPlayList } from '@/store/actions';
import { IS_SHOW_LOGIN } from '@/store/actionTypes';
import { login } from '@/common/api/api';
import { routerJump, setLocal } from '@/common/utils/tools';

// import MD5 from 'crypto-js/md5'
const FormItem = Form.Item;
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // 登录
  handelLogin = async params => {
    const { history, callBack } = this.props;
    const res = await login(params);
    if (res.code !== 200) return;
    this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
    message.info('登录成功');
    setLocal('userInfo', res.profile);
    const uid = res.profile.userId;
    callBack && callBack(uid);
    this.props.handleQueryUserInfo(res.profile);
    routerJump(history, `/home/find/`)
  }

  // 表单验证
  onFinish = e => {
    this.formRef.current.validateFields()
      .then(values => {
        this.formRef.current.resetFields();
        const params = {
          phone: values.phone,
          password: values.password
        }
        this.handelLogin(params)

      }).catch(err => {
        if (!err.phone) {
          message.error('请输入手机号码');
          return;
        }
        if (!err.password) {
          message.error('请输入登录密码');
          return;
        }
      });

  }

  // 关闭登录弹窗
  onCancel = e => {
    this.formRef.current.resetFields();
    this.props.handelModalPower({ type: IS_SHOW_LOGIN, data: false });
  }


  formRef = React.createRef();
  render() {
    return (
      <Modal
        visible={this.props.showModal}
        title="小主,请选择登录的方式"
        okText="登录"
        cancelText="取消"
        width={400}
        maskClosable={false}
        onOk={this.onFinish}
        onCancel={this.onCancel}
      >
        < Form ref={this.formRef} name="loginForm" preserve={false} autoComplete="off">
          <FormItem
            label="账号"
            name="phone"
            initialValue="13272946536"
            extra="*目前仅支持使用手机号码登录"
            getValueFromEvent={(e) => (e.target.value)}
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
            <Input type="tel" autoComplete={`off`} maxLength={11} placeholder="请输入手机号码" />
          </FormItem >
          <FormItem label="密码"
            name="password"
            initialValue="Wangyi123" // Wangyi123
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
            <Input type="password" autoComplete={`off`} maxLength={20} placeholder="请输入登录密码" />
          </FormItem >
        </Form >
      </Modal>
    );
  }
}




const mapStateToProps = state => {
  return {
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelModalPower: bindActionCreators(modalPower, dispatch),
    handleQueryUserInfo: bindActionCreators(queryUserInfo, dispatch),
    handeUserPlayList: bindActionCreators(userPlayList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
