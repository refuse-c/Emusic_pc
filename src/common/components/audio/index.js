/*
 * @Author: REFUSE_C
 * @Date: 2020-08-29 07:14:35
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-29 11:16:31
 * @Description: 
 */
import { spectrum } from '@/common/utils/tools';
import React, { Component } from 'react'
import './index.scss';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runing: false,

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

  play = () => {
    const { audio } = this;
    if (!audio.paused) return;
    audio.play();
    // spectrum(audio, canvas);
  }
  onLoadAudio = () => {

    // setInterval(renderFrame, 44);
  }

  render() {
    return (
      <div className="audio" onClick={this.play}>
        <canvas
          id="canvas"
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

export default Audio;