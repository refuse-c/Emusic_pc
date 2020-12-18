/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 21:47:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-18 17:53:41
 * @Description:播放页面
 */
import { formatImgSize } from "@/common/utils/format";
import React, { Component } from "react";
import styles from "./css/index.module.scss";
// import Audio from "@components/audio";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { hasShow, data } = this.props;
    return (
      <div className={styles.player}
        style={{ transform: hasShow ? `scale(1)` : `scale(0)` }}>
        <div className={styles.player_content}>
          <div className={styles.top}>
            <div className={[styles.top_content, styles.album].join(' ')}>
              <div className={styles.album_img}>
                {data.al ? <img src={formatImgSize(data.al.picUrl, 200, 200)} alt="" /> : ''}
              </div>
            </div>
            <div className={[styles.top_content, styles.lyric].join(' ')}>
              <div className={styles.name}>
                <p>{data.name || ''}</p>
                <div>
                  <p>专辑: <span>{data.al ? data.al.name : ''}</span></p>
                  <p>歌手: <span>{data.ar ? data.ar.map(item => item.name).join('/ ') : ''}</span></p>
                </div>

              </div>
            </div>
          </div>
          <div className={styles.buttom}></div>
        </div>
      </div >
    );
  }
}

export default Player;
