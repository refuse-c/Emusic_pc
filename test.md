<!--
 * @Author: REFUSE_C
 * @Date: 2020-12-23 20:51:19
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-24 20:23:42
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
