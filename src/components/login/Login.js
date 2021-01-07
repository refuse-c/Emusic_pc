/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-07 21:44:00
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modelPower, queryUserInfo, userPlayList } from 'store/actions';
import { IS_SHOW_LOGIN } from 'store/actionTypes';
import { login } from 'common/api/api';
import { routerJump, setLocal } from 'common/utils/tools';
import { withRouter } from 'react-router-dom';
import BoxModel from 'components/model/BoxModel';
// import MD5 from 'crypto-js/md5'
const FormItem = Form.Item;
class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // 登录
  handelLogin = params => {
    const { history, callBack } = this.props;
    login(params).then(res => {
      if (res.code !== 200) return;
      this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
      message.info('登录成功');
      setLocal('userInfo', res.profile);
      const uid = res.profile.userId;
      callBack && callBack(uid);
      this.props.handleQueryUserInfo(res.profile);
      routerJump(history, `/home/find/`);
    }).catch(err => {
      console.log(err)
    })


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
  onClose = e => {
    this.formRef.current.resetFields();
    this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
  }


  formRef = React.createRef();
  render() {
    const head = (<div>是大神大所大所多</div>)
    const contentView =
      (< Form ref={this.formRef} name="loginForm" preserve={false} autoComplete="off">
        <FormItem
          label="账号"
          name="phone"
          initialValue=""
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
          initialValue=""
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
        </FormItem>
      </Form>)


    return (
      <BoxModel
        hasShow={this.props.hasShow}
        title="小主,请选择登录的方式"
        okText="登录"
        cancelText="取消"
        width={600}
        maskClosable={false}
        onFinish={this.onFinish}
        onClose={this.onClose}
        contentView={head + contentView}
      />
    );
  }
}




const mapStateToProps = state => {
  return {
    modelPower: state.modelPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelModelPower: bindActionCreators(modelPower, dispatch),
    handleQueryUserInfo: bindActionCreators(queryUserInfo, dispatch),
    handeUserPlayList: bindActionCreators(userPlayList, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModel));
