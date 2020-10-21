/*
 * @Author: REFUSE_C
 * @Date: 2020-10-21 10:36:37
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-21 18:11:59
 * @Description: 
 */
import { artistDesc } from '@/common/api/singer';
import styles from '../css/index.module.scss';
import { isEmpty } from '@/common/utils/format';
import { Spin } from 'antd';
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import queryString from 'query-string';
class Desc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descData: '',
      loading: true,
    }
  }

  componentDidMount = () => {
    const { id } = queryString.parse(this.props.history.location.search)
    this.getArtistDesc(id);
  }
  // 获取歌手描述
  getArtistDesc = async (id) => {
    this.setState({ loading: true })
    const res = await artistDesc({ id });
    this.setState({ loading: false })
    if (res.code === 200) {
      const descData = res;
      const desc = descData.introduction;
      let text = '';
      if (desc.length > 0) {
        desc.forEach(ele => {
          text += `\n## ${ele.ti}\n +  ${ele.txt.replace(/\n/g, '\n + ')}`
        });
      } else if (!isEmpty(res.briefDesc)) {
        text += `\n## 人物简介\n +  ${res.briefDesc}`
      } else {
        text = ''
      }
      this.setState({ descData: text });
    }
  }

  render() {
    const { descData, loading } = this.state;
    return (
      <div className={styles.desc}>
        {
          loading ? <div className='loading'><Spin style={{ color: '#666' }} tip="Loading..."></Spin></div> : ''
        }
        {
          !isEmpty(descData)
            ? <ReactMarkdown
              source={descData}
              escapeHtml={false}  //不进行HTML标签的转化
            />
            : loading ? '' : '暂无介绍'
        }
      </div>
    );
  }
}

export default Desc;