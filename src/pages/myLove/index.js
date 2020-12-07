/*
 * @Author: REFUSE_C
 * @Date: 2020-11-11 20:09:45
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-07 15:36:34
 * @Description:
 */
import React, { Component } from 'react';
import styles from './css/idnex.module.scss';

class Mylove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        id: '1',
        name: '1',
        children: [{
          id: '1_1',
          name: '1_1',
        }, {
          id: '1_2',
          name: '1_2',
        }, {
          id: '1_3',
          name: '1_3',
        }]
      }, {
        id: '2',
        name: '2',
        children: [{
          id: '2_1',
          name: '2_1',
        }, {
          id: '2_2',
          name: '2_2',
        }, {
          id: '2_3',
          name: '2_3',
        }]
      }, {
        id: '3',
        name: '3',
        children: [{
          id: '3_1',
          name: '3_1',
        }, {
          id: '3_1',
          name: '3_1',
        }, {
          id: '3_1',
          name: '3_1',
        }]
      }]
    }
  }
  render() {
    const { list } = this.state;
    return (
      <div className={styles.myLove}>

        { list.map((item, index1) => {
          return (
            <li key={index1}>
              <p onClick={() => { console.log(item.id) }}>{item.name}</p>
              <ul>
                {
                  item.children.map((child, index2) => {
                    return (
                      <li onClick={() => { console.log(child.id) }} key={index2}>{child.name}</li>
                    )
                  })
                }
              </ul>

            </li>

          )
        })}
      </div>
    );
  }
}


export default Mylove;