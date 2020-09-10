/*
 * @Author: REFUSE_C
 * @Date: 2020-08-28 20:23:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-10 11:29:34
 * @Description: FindTitle
 */
import { message } from 'antd';
import React, { Component } from 'react';
import './index.scss';
class FindTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  jump = () => {
    const type = this.props.type;
    switch (type) {
      case '0': this.props.history.push({ pathname: `/find/songlist` }); break;
      case '1': message.warning('客官请稍等,<独家放送>页面程序汪还在开发ing'); break;
      case '2': this.props.history.push({ pathname: `/find/newest` }); break;
      case '3': message.warning('客官请稍等,<推荐mv>页面程序汪还在开发ing'); break;
      case '4': this.props.history.push({ pathname: `/find/radioStation` }); break;
      default: message.warning(`客官请稍等,<看看>页面程序汪还在开发ing`)
    }
  }
  render() {
    return (
      <div className="find_title">
        <h2>{this.props.title}</h2>
        {
          this.props.type ? <span onClick={this.jump.bind(this)}>更多</span> : null
        }
      </div >
    );
  }
}

export default FindTitle;