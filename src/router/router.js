/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: refuse_c
 * @LastEditTime: 2020-08-25 17:20:22
 * @Description: 
 */
import Search from '@pages/search';
import Find from '@pages/find';
import Friend from '@pages/friend';
import Video from '@pages/video';


const routers = [{
  path: '/',
  exact: true,
  component: Find,
}, {
  path: '/search',
  component: Search,
}, {
  path: '/friend',
  component: Friend,
}, {
  path: '/video',
  component: Video,
}]

export default routers;