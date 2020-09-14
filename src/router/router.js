/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-14 22:04:18
 * @Description: 路由
 */

// 发现
import Find from '@pages/find';
import Recommend from '@pages/recommend';
import SongList from '@pages/songList';
import RadioStation from '@pages/radioStation';
import TopList from '@pages/topList';
import Singer from '@pages/singer';
import Newest from '@pages/newest';

// 视频
import Videos from '@pages/video';
import Video from '@pages/video/component/Video';
import Mv from '@pages/video/component/Mv';

// 全部MV
import AllMv from '@pages/mv';

// MV排行榜
import TopMv from '@pages/topMv';


import Search from '@pages/search';
import Friend from '@pages/friend';

import Home from '@pages/home';
import Single from '@pages/single';
import Player from '@pages/player';


const routers = [
  {
    path: '/',
    component: Home,
    // eslint-disable-next-line
    routers: [{
      path: '/find',
      component: Find,
      routers: [{
        path: '/find',
        exact: true,
        component: Recommend  // 个性推荐
      }, {
        path: '/find/songlist',
        component: SongList  // 歌单
      }, {
        path: '/find/radioStation',
        component: RadioStation  // 主播电台
      }, {
        path: '/find/topList',
        component: TopList  // 排行榜
      }, {
        path: '/find/singer',
        component: Singer  // 歌手
      }, {
        path: '/find/newest',
        component: Newest  // 最新音乐
      }]
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/friend',
      component: Friend
    }, {
      path: '/video',
      component: Videos,
      routers: [{
        path: '/video',
        exact: true,
        component: Video  // 视频
      }, {
        path: '/video/mv',
        component: Mv  // Mv
      }]
    },
      , {
      path: '/single:id',
      component: Single
    },
    {
      path: '/allmv',
      component: AllMv
    },
    {
      path: '/topmv',
      component: TopMv
    }
    ]
  },
  {
    path: '/player',
    // exact: true,
    component: Player,
  },

]

export default routers;