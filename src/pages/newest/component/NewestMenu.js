
import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../css/index.module.scss';
class NewestMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      menu: [{
        ti: '全部', area: 'ALL', type: 0
      }, {
        ti: '华语', area: 'ZH', type: 7
      }, {
        ti: '欧美', area: 'EA', type: 96
      }, {
        ti: '韩国', area: 'KR', type: 16
      }, {
        ti: '日本', area: 'JP', type: 8
      }]
    }
  }

  chooseItem = (item, index) => {
    this.setState({ num: index })
    this.props.fun1(item)
  }

  render() {
    const { type } = this.props;
    const { menu, num } = this.state;
    return (
      <div className={styles.newest_menu}>
        <ul>{
          menu.map((item, index) => {
            const cls = num === index ? styles.active : ''
            return (
              <li key={item.area} className={cls} onClick={() => this.chooseItem(item, index)}>{item.ti}</li>
            )
          })
        }</ul>
        {
          type ?
            <div>
              <span onClick={() => this.props.fun2(0)}>推荐</span>
              <span onClick={() => this.props.fun2(1)}>全部</span>
            </div>
            : null
        }

      </div>
    );
  }
}


NewestMenu.propTypes = {
  fun1: propTypes.func,
  fun2: propTypes.func,
  type: propTypes.number
}
export default NewestMenu;