/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 21:48:58
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-19 16:23:00
 * @Description 登录弹窗
 */
import React, { Component } from 'react'
import { Button, Form, Input, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modelPower, queryUserInfo, userPlayList } from 'store/actions';
import { IS_SHOW_LOGIN } from 'store/actionTypes';
import { phoneLogin, emailLogin, qrKey, qrCreate, qrCheck, phoneIsRegistered } from 'common/api/api';
import { routerJump, setLocal } from 'common/utils/tools';
import { withRouter } from 'react-router-dom';
import BoxModel from 'components/model/BoxModel';
import styles from './css/index.module.scss';
import { formatTel, formatTels, replaceLabel, Trim } from 'common/utils/format';
// import MD5 from 'crypto-js/md5';
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
      nickname: '', // 用户名
      isRegistered: true, //手机号是否注册    true 注册    false 未注册
    }
  }

  // 校验手机号是否注册
  queryRegistered = phone => {
    phoneIsRegistered({
      phone, countrycode: 86
    }).then(res => {
      if (res.code !== 200) return;
      if (res.exist === -1) {
        this.formRef.current.setFields([{
          errors: ['当前手机号还未注册'],
          name: 'phone',
          value: formatTel(phone)
        }])
        this.setState({ isRegistered: false })
      } else {
        this.setState({ isRegistered: true })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 手机登录
  handelPhoneLogin = params => {
    phoneLogin(params).then(res => {
      if (res.code !== 200) return;
      this.success(res);
    }).catch(err => {
      console.log(err)
    })
  }

  // 邮箱登录
  handelEmailLogin = params => {
    emailLogin(params).then(res => {
      if (res.code !== 200) return;
      this.success(res);
    }).catch(err => {
      console.log(err)
    })
  }

  // 二维码key生成接口
  queryQrKey = () => {
    clearInterval(timer);
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
      // 重新获取验证码刷新数据
      this.setState({ msg: '', code: null })
      if (res.code !== 200) return;
      // 保存二维码
      this.setState({ qrimg: res.data.qrimg, nickname: '请使用[/网易云音乐APP/]扫描二维码' })
      // 二维码检测扫码状态
      timer = setInterval(() => {
        const { unikey: key } = this.state;
        const { queryLoginStatus } = this.props;
        qrCheck({ key }).then(res => {
          const { code, nickname } = res;
          if (code === 800) {
            clearInterval(timer);
            this.setState({ code, msg: '二维码已过期, 请重新获取[/点击刷新/]', nickname: '' })
          }
          // if (code === 801) {
          //   this.setState({ code, nickname: msg })
          // }
          if (code === 802) {
            this.setState({ code, nickname: `[/${nickname}/]` })
          }
          if (code === 803) {
            clearInterval(timer);
            message.destroy();
            message.info('登录成功');
            setLocal('cookie', res.cookie);
            queryLoginStatus && queryLoginStatus(); //刷新登录
            this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
          }
        }).catch(err => {
          console.log(err)
        })
      }, 1000)
    }).catch(err => {
      console.log(err)
    })
  }

  // 登陆成功后的方法 
  success = res => {
    const { history, callBack } = this.props;
    this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
    message.info('登录成功');
    setLocal('userInfo', res.profile);
    setLocal('cookie', res.cookie);
    const uid = res.profile.userId;
    callBack && callBack(uid);
    this.props.handleQueryUserInfo(res.profile);
    routerJump(history, `/home/find/`);
  }

  //切换登录
  handelNav = navStatus => {
    clearInterval(timer);
    if (navStatus === 2) this.queryQrKey();
    this.setState({ isRegistered: true })
    this.setState({ navStatus }, () => {
      if (navStatus !== 2) this.formRef.current.resetFields();
    })
  }

  // 表单验证
  onFinish = e => {
    const { navStatus } = this.state;
    this.formRef.current.validateFields()
      .then(values => {
        // 手机
        const { phone, email, password } = values;
        if (navStatus === 0) {
          if (!formatTels(Trim(phone))) {
            this.formRef.current.setFields([{
              errors: ['您输入的手机号有误,请检查'],
              name: 'phone',
              value: formatTel(phone)
            }])
            return false;
          }
          const params = {
            phone: Trim(phone),
            password: password
          }
          this.handelPhoneLogin(params)
        }
        // 邮箱
        if (navStatus === 1) {

          const params = {
            email: email,
            password: password
          }
          this.handelEmailLogin(params)
        }

      })
  }

  // 输入手机号时 验证手机号是否正确 / 是否已经注册
  changeInput = e => {
    const { value } = e.target;
    const phone = Trim(value);
    if (formatTels(phone)) {
      this.queryRegistered(phone);
    } else {
      this.formRef.current.setFields([{
        errors: ['您输入的手机号有误,请检查'],
        name: 'phone',
        value: formatTel(phone)
      }])
    }
  }

  // 关闭登录弹窗
  onClose = e => {
    const { navStatus } = this.state;
    if (navStatus !== 2) this.formRef.current.resetFields();
    this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
  }

  componentWillUnmount = () => {
    clearInterval(timer);
  }

  formRef = React.createRef();
  render() {
    const { hasShow } = this.props;
    const { navList, isRegistered, navStatus, qrimg, code, msg, nickname } = this.state;
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
      (< Form
        name="loginForm"
        preserve={false}
        autoComplete="off"
        ref={this.formRef}
        className={styles.form}>
        {
          navStatus === 0 ?
            <FormItem
              label='账号'
              name="phone"
              initialValue=""
              extra={`目前仅支持中国大陆+86手机号登录/注册`}
              getValueFromEvent={(e) => formatTel(e.target.value)}
              rules={
                [{
                  required: true,
                  message: "账号不能为空"
                },
                  // {
                  //   pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
                  //   message: "您输入的手机号码有误"
                  // },
                ]}
            >
              <Input type="tel" autoComplete={`off`} maxLength={13} onChange={this.changeInput} placeholder="请输入手机号码" />
            </FormItem >
            : navStatus === 1 ?
              <FormItem
                label="邮箱"
                name="email"
                initialValue="refusec@163.com"
                getValueFromEvent={(e) => (e.target.value)}
                rules={
                  [
                    {
                      required: true,
                      message: "邮箱不能为空"
                    },
                    {
                      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                      message: "您输入的邮箱有误, 请检查"
                    },
                  ]}
              >
                <Input type="tel" autoComplete={`off`} maxLength={20} placeholder="请输入手机号码" />
              </FormItem > : null
        }


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
          ]}
        >
          <Input type="password" autoComplete={`off`} maxLength={20} placeholder="请输入登录密码" onPressEnter={this.onFinish} />
        </FormItem>
        <div className={styles.btn}>
          <Button
            disabled={!isRegistered}
            onClick={this.onFinish}
            className={styles.submit}
            style={{ backgroundColor: isRegistered ? 'rgba(236, 65, 65)' : 'rgba(236, 65, 65, 0.5)' }}
          >登录</Button>
          <Button onClick={this.onClose} className={styles.cancel}>取消</Button>
        </div>
      </Form >)

    const qrCodeView = (
      <div className={styles.qrcode_view}>
        {qrimg ? <img src={qrimg} alt="" /> : null}
        {code === 800 ? <div className={styles.layer}>
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
        headView={headView}
        contentView={navStatus === 2 ? qrCodeView : pwdView}
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
