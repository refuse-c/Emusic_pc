/*
 * @Author: REFUSE_C
 * @Date: 2020-12-25 17:22:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-29 16:59:49
 * @Description:
 */
import React, { Component } from 'react';
import styles from './css/index.module.scss';
const { ipcRenderer: ipc } = window.require('electron');

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      list: []
    }
  }

  componentDidMount = () => {
    const that = this;
    // 这里是接收主进程传递过来的参数，这里的on要对应主进程send过来的名字
    ipc.on("asynchronous-reply", function (event, arg) {
      const list = JSON.parse(JSON.stringify(arg))
      // 这里的arg是从主线程请求的数据
      that.setState({ list })
      console.log(list)
    });
  }

  onChange = e => {
    const data = e.target.files;
    if (!data.length) return;
    const { path, name } = e.target.files[0]
    const currentPath = path.split(name)[0];
    ipc.send("asynchronous-message", currentPath)
  }

  render() {
    const { list, url } = this.state;
    return (
      <div className={styles.local} >
        <input type="file" webkitdirectory={`true`} directory={`true`} onChange={this.onChange} />
        <ul>
          {
            list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => this.setState({ url: item.url })}
                >{item.title}</li>
              )
            })
          }
        </ul>
        <audio autoPlay={!!url} controls src={url} >

        </audio>
      </div >
    );
  }
}
export default Local;