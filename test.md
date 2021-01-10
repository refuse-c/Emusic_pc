<!--
 * @Author: REFUSE_C
 * @Date: 2020-12-23 20:51:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-10 23:05:17
 * @Description:
-->

##快速删除 node-modules

npm install rimraf -g
rimraf node_modules
清除缓存
npm cache clean
npm5 之后执行 npm cache clean 报错
npm 5 使用了新的包管理模式，所以在升级之后，要先清空一下本地缓存
npm cache clean --force

npm i create-react-app -g

create-react-app -V

npx create-react-app my-app

Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

超链接访问过后 hover 样式就不出现了 被点击访问过的超链接样式不在具有 hover 和 active 了解决方法是改变 CSS 属性的排列顺序:
L-V-H-A : a:link {} a:visited {} a:hover {} a:active {}

801 "等待扫码" undefined
802 "授权中" "遥遥老婆"
803 "授权登陆成功" undefined
800 "二维码不存在或已过期" undefined

if (res.code === 800) {
console.log('二维码已过期,请重新获取')
clearInterval(timer)
}
if (res.code === 803) {
// 这一步会返回 cookie
clearInterval(timer)
console.log('授权登录成功')
this.success(res);
}

timer = setInterval(() => {
const { unikey: key } = this.state;
qrCheck({ key }).then(res => {
const { queryLoginStatus } = this.props;
const { code, message: msg, nickname } = res.data;
console.log(code, msg, nickname)
if (code === 800 || 803) {
if (code === 803) {
clearInterval(timer);
message.info('登录成功');
queryLoginStatus && queryLoginStatus(); //刷新登录
this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
}
this.setState({ code, msg, nickname })
}
}).catch(err => {
const { queryLoginStatus } = this.props;
const { code, message: msg, nickname } = err.data;
console.log(code, msg, nickname)
if (code === 800 || 803) {
if (code === 803) {
clearInterval(timer);
message.info('登录成功');
queryLoginStatus && queryLoginStatus(); //刷新登录
this.props.handelModelPower({ type: IS_SHOW_LOGIN, data: false });
}
this.setState({ code, msg, nickname })
}
})
}, 1500)
