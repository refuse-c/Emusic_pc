/*
 * @Author: REFUSE_C
 * @Date: 2020-12-25 17:22:57
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-28 12:57:45
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
    });
    // https://blog.csdn.net/weixin_46187747/article/details/105396764
    // 这里的会传递回给主进程，这里的第一个参数需要对应着主进程里on注册事件的名字一致

  }

  handelClick = (path, filename) => {
    console.log(path, filename)
    const url = 'file:///' + path + filename;
    let file = new FileReader()
    console.log(file.readAsDataURL(url))
    // this.setState({ url: 'file:///' +  })
  }



  render() {
    const { list, url } = this.state;
    return (
      <div
        className={styles.local}

      >
        <div onClick={() => ipc.send("asynchronous-message", "F:/Emusic/")}>点我读取文件</div>
        <ul>
          {
            list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => this.handelClick(item.path, item.filename)}
                >{item.filename}</li>
              )
            })
          }
        </ul>
        <audio autoPlay={!!url} controls>
          <source src={url} type="audio/mpeg" ></source>
        </audio>
      </div >
    );
  }
}

export default Local;