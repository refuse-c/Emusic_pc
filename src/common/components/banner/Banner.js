/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 19:05:56
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-04 16:34:29
 * @Description: 轮播图
 */
import React, { Component } from 'react';
import './index.scss';
import propTypes from 'prop-types';
import { formatImgSize } from '@/common/utils/format';
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list || [],
      bannerList: [
        {

          imageUrl: "http://p1.music.126.net/mGBcg_tnSAEhaAEx7NC0LA==/109951165292794655.jpg",
          name: 'start',
        },
        {
          imageUrl: "http://p1.music.126.net/9Mw4jgBPnax4CBRh9acCsw==/109951165292798591.jpg",
          name: 'middle',
        },
        {
          imageUrl: "http://p1.music.126.net/i08ce36lTFmLjFrQWJsjpw==/109951165292794363.jpg",
          name: 'end',
        },
        {
          imageUrl: "http://p1.music.126.net/BsHnEFXTCnptz92szd9XpA==/109951165292459161.jpg",
          name: 'normal',

        },
        {
          imageUrl: "http://p1.music.126.net/niqmwMW1440y-jX5vFqVzg==/109951165292468696.jpg",
          name: 'normal',

        },
        {
          imageUrl: "http://p1.music.126.net/Ihi_yZ31-URNVyNpA-k2OA==/109951165293068759.jpg",
          name: 'normal',

        },
        {
          imageUrl: "http://p1.music.126.net/2tMIAJVBRADXdfJ9hiyMTg==/109951165292459827.jpg",
          name: 'normal',

        },
        {
          imageUrl: "http://p1.music.126.net/TGPZJxx62rtnHuz8OlOUIw==/109951165292783307.jpg",
          name: 'normal',

        },
        {
          imageUrl: "http://p1.music.126.net/lvBSHIBY2UngTa4zQbLlEA==/109951165292785160.jpg",
          name: 'normal',

        }
      ]
    }
  }


  recombinantArray(index) {
    console.log(index)
    let arr = this.state.bannerList;
    if (index === 0) {
      arr.unshift(arr.pop())
    } else if (index === 2) {
      arr.push(arr.shift())
    }
    this.setState({ bannerList: arr });
  }



  renderBanner = () => {
    const { bannerList: list } = this.state;
    console.log(list)
    return (
      list && list.map((item, index) => {
        const cls = index === 0 ? 'start' : index === 1 ? 'middle' : index === 2 ? 'end' : 'other'
        return (
          <li className={cls} key={index} onClick={() => this.recombinantArray(index)}
          >
            <img src={formatImgSize(item.imageUrl, 520, 200)} alt="" />
          </li>
        )
      })
    )
  }

  render() {
    const { bannerList: list } = this.state;
    return (
      <div className="banner">
        {
          <ul>
            {this.renderBanner()}
          </ul>
        }
        <div className="point">
          {
            list && list.map((item, index) => <span className={index === 0 ? 'active' : ''} key={item.imageUrl}></span>)
          }
        </div>
      </div>
    );
  }
}
Banner.propTypes = {
  list: propTypes.array
}
export default Banner;