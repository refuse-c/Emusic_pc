/*
 * @Author: REFUSE_C
 * @Date: 2020-10-10 15:55:14
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-11 14:44:09
 * @Description 播放组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux';
class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }



  // static getDerivedStateFromProps = (nextProps, prevState) => {
  //   const { currentPlayer } = nextProps;
  //   const { id } = nextProps.currentPlayer;
  //   if (id !== prevState.id) {
  //     return {
  //       id,
  //       currentPlayer,
  //       props: {
  //         id: id,
  //         currentPlayer: currentPlayer
  //       },
  //     };
  //   }
  //   return null;
  // }

  // componentDidUpdate = prevState => {
  //   const { id } = prevState.currentPlayer;
  //   if (id !== this.state.id) {
  //     this.getSongUrl();
  //   }
  // }

  componentDidUpdate = () => {
    const { isPlay, url } = this.props;
    if (!url) return;
    isPlay ? this.audio.play() : this.audio.pause();
  }

  render() {
    const { url } = this.props;
    return (
      <audio
        id="audio"
        // controls
        loop
        src={url}
        // autoPlay
        ref={(audio => this.audio = audio)}
        crossOrigin="anonymous">
        {/* <source ref={(source => this.source = source)} src={url}></source> */}
      </audio>
    );
  }
}

const mapStateToprops = state => {
  // console.log(state)
  return {
    currentPlayer: state.currentPlayer,
  }
}
// const mapDispatchToProps = dispatch => { }

export default connect(mapStateToprops, null)(Audio);