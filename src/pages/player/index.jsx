/*
 * @Author: REFUSE_C
 * @Date: 2020-08-26 21:47:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-29 18:04:50
 * @Description:
 */
import React, { Component } from "react";
import "./index.scss";
import Audio from "@components/audio";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="player">
        <Audio />
      </div>
    );
  }
}

export default Player;
