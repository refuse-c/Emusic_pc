import React, { Component } from 'react';

import styles from './css/index.module.scss';
class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    // const { currentTime } = this.props;
    return (
      <div
        className={styles.range}
        ref={range => this.range = range}
      >
        <div
          className={styles.buffer}
          ref={buffer => this.buffer = buffer}
        ></div>
        <div
          className={styles.progress}
          ref={progress => this.progress = progress}
        ></div>
        <div
          className={styles.point}
          ref={point => this.point = point}
        ></div>
      </div>
    );
  }
}

export default Range;