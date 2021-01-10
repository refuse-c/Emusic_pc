/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-10 13:48:07
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modelPower, queryUserInfo, userPlayList } from 'store/actions';
import { IS_SHOW_LOGIN } from 'store/actionTypes';
import { login, qrKey, qrCreate, qrCheck } from 'common/api/api';
import { routerJump, setLocal } from 'common/utils/tools';
import { withRouter } from 'react-router-dom';
import BoxModel from 'components/model/BoxModel';
import styles from './css/index.module.scss';
import { replaceLabel } from 'common/utils/format';
// import MD5 from 'crypto-js/md5'

let timer;
const FormItem = Form.Item;
class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: ['密码登录', '邮箱登录', '扫码登录'],
      navStatus: 0,
      unikey: '', //qr key
      qrimg: '', // qr images
      msg: '', // qr check message
      code: null, // qr check code
      nickname: '' // 用户名

    }
  }


  // 登陆成功后的方法 
  success = res => {
    const { history, callBack } = this.props;
    this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
    message.info('登录成功');
    setLocal('userInfo', res.profile);
    const uid = res.profile.userId;
    callBack && callBack(uid);
    this.props.handleQueryUserInfo(res.profile);
    routerJump(history, `/home/find/`);
  }

  // 登录
  handelLogin = params => {
    login(params).then(res => {
      if (res.code !== 200) return;
      this.success(res);
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
    // this.formRef.current.resetFields();
    this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
  }

  //切换登录
  handelNav = navStatus => {
    clearInterval(timer);
    if (navStatus === 2) this.queryQrKey();
    this.setState({ navStatus })
  }

  // 二维码key生成接口
  queryQrKey = () => {
    qrKey({}).then(res => {
      if (res.code === 200) {
        const { unikey } = res.data;
        this.setState({ unikey })
        this.queryQrCreate(unikey);
      }
    }).catch(err => {
      console.log(err)
    })
  }
  // 二维码生成接口
  queryQrCreate = key => {
    clearInterval(timer);
    qrCreate({ key, qrimg: true }).then(res => {
      if (res.code !== 200) return;
      // 保存二维码
      console.log(res.data.qrimg)
      this.setState({ qrimg: res.data.qrimg, nickname: '请使用[/网易云音乐APP/]扫描二维码' })
      // 二维码检测扫码状态
      timer = setInterval(() => {
        const { unikey: key } = this.state;
        const { queryLoginStatus } = this.props;
        qrCheck({ key }).then(res => {
          const { code, message: msg, nickname } = res.data;
          console.log('res==>>' + code, msg, nickname)
          if (code === 801) {
            this.setState({ code, nickname: msg })
          }
          if (code === 803) {
            clearInterval(timer);
            message.info('登录成功');
            queryLoginStatus && queryLoginStatus(); //刷新登录
            this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
          }
        }).catch(err => {
          const { code, message: msg, nickname } = err.data;
          console.log('err==>>' + code, msg, nickname)
          if (code === 800) {
            clearInterval(timer);
            this.setState({ code, msg: '二维码已过期, 请重新获取[/点击刷新/]', nickname })
          }
        })
      }, 3000)
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillUnmount = () => {
    clearInterval(timer);
  }

  formRef = React.createRef();
  render() {
    const { hasShow } = this.props;
    const { navList, navStatus, qrimg, code, msg, nickname } = this.state;
    const headView = (
      <ul className={styles.login_nav}>
        {
          navList.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => this.handelNav(index)}
                className={navStatus === index ? styles.active : ''}

              >{item}</li>
            )
          })
        }
      </ul>
    )
    const pwdView =
      (< Form ref={this.formRef} name="loginForm" preserve={false} autoComplete="off">
        <FormItem
          label="账号"
          name="phone"
          initialValue=""
          // extra="*目前仅支持使用手机号码登录"
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

    const mailView = (
      <div className={styles.mail_view}>
        mailViewmailViewmailView
      </div>
    )

    const qrCodeView = (
      <div className={styles.qrcode_view}>
        {qrimg ? <img src={qrimg} alt="" /> : null}
        {code === 801 || code === 802 ? <div className={styles.layer}>
          {/* 显示在二维码中间的文件 */}
          <p
            onClick={() => this.queryQrKey()}
            dangerouslySetInnerHTML={{
              __html: replaceLabel(msg, 'button')
            }}></p>
        </div> : null}
        {/* 显示在二维码下面的文字 */}
        <div className={styles.info}
          dangerouslySetInnerHTML={{
            __html: replaceLabel(nickname, 'span')
          }}></div>
      </div>
    )
    return (
      <BoxModel
        hasShow={hasShow}
        title=" "
        okText="登录"
        cancelText="取消"
        width={520}
        // maskClosable={false}
        onClose={this.onClose}
        onFinish={this.onFinish}
        headView={headView}
        contentView={navStatus === 1 ? mailView : navStatus === 2 ? qrCodeView : pwdView}
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
