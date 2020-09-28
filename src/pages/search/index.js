/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-09-29 00:56:50
 * @Description: 搜索
 */
import React, { Component } from 'react';
import { search, searchDefault, searchHotDetail, searchSuggest } from '@/common/api/search';
import { Trim } from '@/common/utils/format';
import { Input } from 'antd';
import styles from './css/index.module.scss';
import SearchHotList from './component/SearchHotList'
const { Search } = Input;
class Searchs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKeyword: '',
      type: '1',
      keywords: '',
      limit: 100,
      offset: 1,
      searchHotList: []
    }
  }
  // 查询搜索框默认显示的文字 
  querySearchDefault = async () => {
    const res = await searchDefault();
    if (res.code !== 200) return;
    const { showKeyword: defaultKeyword, searchType: type } = res.data;
    console.log(type)
    this.setState({ defaultKeyword })
  }

  // 搜索建议 
  querySearchSuggest = async params => {
    const res = await searchSuggest(params);
    if (res.code !== 200) return;
    console.log(res)
  }

  // 搜索
  querySearch = async () => {
    const { type, keywords, limit, offset } = this.state;
    const params = { type, keywords, limit, offset: offset * limit - limit }
    const res = await search(params);
    if (res.code !== 200) return;
    console.log(res.result.songs)
  }

  // 热搜列表(详情)
  querySearchHotDetail = async () => {
    const res = await searchHotDetail();
    if (res.code !== 200) return;
    this.setState({ searchHotList: res.data })
  }


  // 搜索框搜索/回车事件
  onSearch = () => {
    const { keywords, defaultKeyword } = this.state;
    if (Trim(keywords)) {
      this.querySearch();
    } else {
      this.setState({ keywords: defaultKeyword }, () => {
        this.querySearch();
      })
    }
  }

  onChange = e => {
    const { value: keywords } = e.target;
    this.setState({ keywords }, () => {
      if (Trim(keywords)) {
        global.debounce(() => this.querySearchSuggest({ keywords }))
      }
    });
  }

  // input聚焦显示热搜榜
  handelFocus = () => {

  }

  searchHotListCaback = keywords => {
    this.setState({ keywords }, () => {
      this.querySearch();
    })
  }

  componentDidMount = () => {
    this.querySearchDefault();
    this.querySearchHotDetail();
  }

  render() {
    const { defaultKeyword, keywords, searchHotList } = this.state;
    return (
      <div className={styles.search}>
        <Search
          size={`small`}
          borderd={`false`}
          allowClear
          onChange={this.onChange}
          onSearch={(e) => this.onSearch(e)}
          loading={false}
          placeholder={defaultKeyword}
          value={keywords}
          onFocus={this.handelFocus}
        />
        <SearchHotList data={searchHotList} fun={this.searchHotListCaback} />
      </div>
    );
  }
}

export default Searchs;