<!--
 * @Author: REFUSE_C
 * @Date: 2020-12-23 20:51:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-04 16:44:39
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

超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}