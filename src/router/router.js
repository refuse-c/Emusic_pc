/*
 * @Author: REFUSE_C
 * @Date: 2020-08-24 09:03:36
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-03 15:09:11
 * @Description: 路由
 */

// 发现
import Find from 'pages/find';
import Recommend from 'pages/recommend';
import SongList from 'pages/songList';
import RadioStation from 'pages/radioStation';
import TopList from 'pages/topList';
import Singer from 'pages/singer';
import Newest from 'pages/newest';

// 每日推荐音乐
import RecommendSong from 'pages/recommendSong';

// 视频
import Videos from 'pages/video';
import Video from 'pages/video/component/Video';
import Mv from 'pages/video/component/Mv';


import AllMv from 'pages/mv';// 全部MV
import TopMv from 'pages/topMv';// MV排行榜
import PrivatecontentList from 'pages/privatecontentList'; //独家放送列表


import Home from 'pages/home';
import Index from 'pages/index';

import Search from 'pages/search';
import Friend from 'pages/friend';
import Local from 'pages/local';
import Down from 'pages/down';
// 设置页
import Setting from 'pages/setting';

// 歌单列表(详情)
import Single from 'pages/single';
// 精品歌单
import QualityList from 'pages/qualityList';
// 播放页
import Player from 'pages/player';
// 专辑详情
import Album from 'pages/album';

import MyLove from 'pages/myLove';
// 歌手详情 
import SingerDetail from 'pages/singerDetail';
import singerAlbum from 'pages/singerDetail/component/Album';
import singerMv from 'pages/singerDetail/component/Mv';
import singerDesc from 'pages/singerDetail/component/Desc';
import singerSimi from 'pages/singerDetail/component/Simi';


// 用户详情
import UserDetail from 'pages/userDetail';
// 视频详情
import VideoDetail from 'pages/videoDetail';


const routes = [
  {
    path: '/',
    component: Index,
    routes: [{
      path: '/home',
      component: Home,
      routes: [{
        path: '/home/find',
        component: Find,
        routes: [{
          exact: true,
          path: '/home/find',
          component: Recommend  // 个性推荐
        },
        {
          path: '/home/find/songlist',
          component: SongList  // 歌单
        },
        {
          path: '/home/find/radioStation',
          component: RadioStation  // 主播电台
        },
        {
          path: '/home/find/topList',
          component: TopList  // 排行榜
        },
        {
          path: '/home/find/singer',
          component: Singer  // 歌手
        },
        {
          path: '/home/find/newest',
          component: Newest  // 最新音乐
        }]
      },
      {
        path: '/home/search',
        component: Search
      },
      {
        path: '/home/friend',
        component: Friend
      }, {
        path: '/home/local',
        component: Local
      }, {
        path: '/home/down',
        component: Down
      },
      {
        path: '/home/setting',
        component: Setting
      },
      {
        path: '/home/video',
        component: Videos,
        routes: [{
          path: '/home/video',
          exact: true,
          component: Video  // 视频
        },
        {
          path: '/home/video/mv',
          component: Mv  // Mv
        }]
      },
      {
        path: '/home/single:id',
        component: Single
      },
      {
        path: '/home/recommendSong',
        component: RecommendSong
      },
      {
        path: '/home/allmv',
        component: AllMv
      },
      {
        path: '/home/topmv',
        component: TopMv
      },
      {
        path: '/home/privatecontentList',
        component: PrivatecontentList
      },
      {
        path: '/home/qualityList:id',
        component: QualityList
      },
      {
        path: '/home/singerdetail',
        component: SingerDetail,
        routes: [
          {
            path: '/home/singerdetail',
            component: singerAlbum,
          },
          {
            path: '/home/singerdetail/mv',
            component: singerMv,
          },
          {
            path: '/home/singerdetail/desc',
            component: singerDesc,
          },
          {
            path: '/home/singerdetail/simi',
            component: singerSimi,
          }
        ]
      },
      {
        path: '/home/album:id',
        component: Album
      },
      {
        path: '/home/userdetail',
        component: UserDetail
      },
      {
        path: '/home/mylove',
        component: MyLove,
      },
      {
        path: '/home/player',
        exact: true,
        component: Player,
      }
      ]
    },
    {
      path: '/videoDetail:id',
      component: VideoDetail
    }]
  },

]

export default routes;