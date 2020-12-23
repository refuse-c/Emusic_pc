/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 21:47:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-23 11:24:49
 * @Description:播放页面
 */
import { formatImgSize } from "common/utils/format";
import { getTimeIndex } from "common/utils/tools";
import React, { Component } from "react";
import ScrollArea from 'react-scrollbar';
import styles from "./css/index.module.scss";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalPower } from 'store/actions';
import { withRouter } from 'react-router-dom';
import { IS_SHOW_PLAYLIST } from "store/actionTypes";

// import Audio from "components/audio";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hidePlayList = () => {
    const { playListStatus } = this.props.modalPower;
    if (playListStatus) { this.props.handleModalPower({ type: IS_SHOW_PLAYLIST, data: !playListStatus }) }
  }


  render() {
    const { hasShow, data, lyricText, rotate, isPlay, currentTime } = this.props;
    const cls = isPlay ? styles.active : null;
    return (
      <div className={styles.player}
        style={{ transform: hasShow ? `scale(1)` : `scale(0)` }}
        onClick={this.hidePlayList}
      >
        <div className={styles.player_content}>
          <div className={styles.top}>
            <div className={[styles.top_content, styles.album].join(' ')}>
              <div className={[styles.arm, cls].join(' ')}></div>
              <div
                className={styles.album_img}
                style={{ transform: `rotate(${rotate + 'deg'})` }}
              >
                {data.al ? <img src={formatImgSize(data.al.picUrl, 200, 200)} alt="" /> : ''}
              </div>
              <ul className={styles.tool_ul}>
                <li>喜欢</li>
                <li>收藏</li>
                <li>下载</li>
                <li>分享</li>
              </ul>
            </div>
            <div className={[styles.top_content, styles.lyric].join(' ')}>
              <div className={styles.name}>
                <p>{data.name || ''}</p>
                <div>
                  <p>专辑: <span className="overflow">{data.al ? data.al.name : ''}</span></p>
                  <p>歌手: <span className="overflow">{data.ar ? data.ar.map(item => item.name).join('/ ') : ''}</span></p>
                </div>
              </div>
              <div className={styles.lrc_content}>
                <ScrollArea
                  speed={1}
                  className={styles.area}
                  ref={(content) => (this.content = content)}
                >
                  <ul>
                    {
                      lyricText && lyricText.map((item, index, lyric) => {
                        const num = getTimeIndex(lyric, currentTime);
                        if (num > 6) {
                          this.content.scrollArea.scrollYTo((num - 6) * 24);
                        } else {
                          this.content.scrollArea.scrollYTo(0);
                        }
                        return (
                          <li
                            key={index}
                            className={index === num ? styles.aa : styles.bb}
                            ref={(item) => (this.item = item)}
                          >
                            {item.text}
                          </li>
                        );
                      })
                    }
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className={styles.buttom}></div>
        </div>
      </div >
    );
  }
}


const mapStateToprops = state => {
  return {
    userInfo: state.userInfo,
    modalPower: state.modalPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleModalPower: bindActionCreators(modalPower, dispatch)
  }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Player));

