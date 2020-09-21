/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-21 14:28:09
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

// 每日推荐音乐
import RecommendSong from '@pages/recommendSong';

// 视频
import Videos from '@pages/video';
import Video from '@pages/video/component/Video';
import Mv from '@pages/video/component/Mv';


import AllMv from '@pages/mv';// 全部MV

import TopMv from '@pages/topMv';// MV排行榜
import PrivatecontentList from '@pages/privatecontentList'; //独家放送列表

import Search from '@pages/search';
import Friend from '@pages/friend';
import Home from '@pages/home';

//歌单列表(详情)
import Single from '@pages/single';
//精品歌单
import QualityList from '@pages/qualityList';
// 播放页
import Player from '@pages/player';


const routers = [
  {
    path: '/',
    component: Home,
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
    }, {
      path: '/single:id',
      component: Single
    },
    {
      path: '/recommendSong',
      component: RecommendSong
    },
    {
      path: '/allmv',
      component: AllMv
    },
    {
      path: '/topmv',
      component: TopMv
    },
    {
      path: '/privatecontentList',
      component: PrivatecontentList
    },
    {
      path: '/qualityList:id',
      component: QualityList
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