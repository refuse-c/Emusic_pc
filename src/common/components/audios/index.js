/*
 * @Author: REFUSE_C
 * @Date: 2020-08-29 07:14:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-15 16:54:40
 * @Description: 
 */
import { spectrum } from '@/common/utils/tools';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import styles from './index.module.scss';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runing: false,
      audioInfo: {}

    }
  }

  componentDidMount = () => {
    const { audio, canvas } = this;
    this.audio.addEventListener('playing', () => {
      spectrum(audio, canvas);
    });

    this.audio.addEventListener('pause', () => {
      // spectrum(audio, canvas);
    });
    this.audio.addEventListener('volumechange', (e) => {
      const { volume } = e.target

      spectrum(audio, canvas, volume);
    });

    // this.audio.addEventListener('ended', () => {
    //   spectrum(audio, canvas, true);
    // });
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.aduioInfo !== nextProps.aduioInfo) {
      return {
        aduioInfo: nextProps.aduioInfo
      };
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.aduioInfo !== prevState.aduioInfo) {
      this.queryPlayListDetail();
      this.setState({ aduioInfo: prevState.aduioInfo })
    }
  }




  play = () => {
    const { audio } = this;
    if (!audio.paused) return;
    audio.play();
  }

  render() {
    const { aduioInfo } = this.props;
    return (
      <div className={styles.audio} onClick={this.play}>
        <canvas
          id="canvas"
          className={styles.canvas}
          ref={(canvas => this.canvas = canvas)}
        >
        </canvas>
        <audio id="audio"
          controls
          ref={(audio => this.audio = audio)}
          crossOrigin="anonymous">
          <source ref={(source => this.source = source)} src={require('@components/audio/test.mp3')}></source>
        </audio>
      </div >
    );
  }
}

const mapStateToprops = state => {
  return {
    audioInfo: state.audioInfo,
  }
}
const mapDispatchToProps = dispatch => { }

export default connect(mapStateToprops, mapDispatchToProps)(Audio);