/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-11-12 14:42:36
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

// 歌单列表(详情)
import Single from '@pages/single';
// 精品歌单
import QualityList from '@pages/qualityList';
// 播放页
import Player from '@pages/player';
// 专辑详情
import Album from '@pages/album';

import MyLove from '@pages/myLove';
// 歌手详情 
import SingerDetail from '@pages/singerDetail';
import singerAlbum from '@pages/singerDetail/component/Album';
import singerMv from '@pages/singerDetail/component/Mv';
import singerDesc from '@pages/singerDetail/component/Desc';
import singerSimi from '@pages/singerDetail/component/Simi';


// 用户详情
import UserDetail from '@pages/userDetail';



const routes = [
  {
    path: '/',
    component: Home,
    routes: [{
      path: '/find',
      component: Find,
      routes: [{
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
      routes: [{
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
    },
    {
      path: '/singerdetail',
      component: SingerDetail,
      routes: [
        {
          path: '/singerdetail',
          component: singerAlbum,
        },
        {
          path: '/singerdetail/mv',
          component: singerMv,
        },
        {
          path: '/singerdetail/desc',
          component: singerDesc,
        },
        {
          path: '/singerdetail/simi',
          component: singerSimi,
        }
      ]
    }, {
      path: '/album:id',
      component: Album
    },
    {
      path: '/userdetail',
      component: UserDetail
    }
    ]
  },
  {
    path: '/player',
    // exact: true,
    component: Player,
  }, {
    path: '/mylove',
    // exact: true,
    component: MyLove,
  },

]

export default routes;