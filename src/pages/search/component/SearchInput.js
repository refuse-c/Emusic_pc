/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-05 21:11:22
 * @Description: 搜索-搜索框
 */
import React, { Component } from 'react';
import { search, searchDefault, searchHotDetail, searchSuggest } from '@/common/api/search';
import { isEmpty, Trim } from '@/common/utils/format';
import { Input } from 'antd';
// import styles from '../css/index.module.scss';
import SearchHotList from './SearchHotList';
// import SearchSuggest from './SearchSuggest';
const { Search } = Input;
class Searchs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKeyword: '',
      type: '1',
      keywords: '',
      limit: 50,
      offset: 1,
      isShowHotListStatus: false, // 热搜状态
      isShowSuggestStatus: false,
      searchHotList: [],
      suggestList: {}
    }
  }
  // 查询搜索框默认显示的文字 
  querySearchDefault = async () => {
    const res = await searchDefault();
    if (res.code !== 200) return;
    const { showKeyword: defaultKeyword } = res.data;
    this.setState({ defaultKeyword })
  }

  // 搜索建议 
  querySearchSuggest = async params => {
    const res = await searchSuggest(params);
    if (res.code !== 200) return;

    this.setState({ suggestList: res.result, isShowSuggestStatus: true })
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
      this.setState({ keywords })
    } else {
      this.setState({ keywords: defaultKeyword }, () => {
        this.querySearch();
      })
    }
  }

  onChange = e => {
    const { value: keywords } = e.target;
    console.log(keywords)
    this.setState({ keywords }, () => {
      if (Trim(keywords)) {
        this.setState({ isShowHotListStatus: false })
        // this.querySearchSuggest({ keywords })
        // global.debounce(() => this.querySearchSuggest({ keywords }), 50)
      } else {
        this.setState({ isShowHotListStatus: true })
      }
    });
  }

  // 聚焦显示热搜榜
  handelFocus = () => {
    const { keywords } = this.state;
    if (isEmpty(Trim(keywords))) this.setState({ isShowHotListStatus: true })
    // this.querySearchSuggest({ keywords });
  }

  // 点击热搜回调
  searchHotListCaback = keywords => {
    this.setState({ keywords, isShowHotListStatus: false }, () => {
      this.querySearch();
    })
  }

  componentDidMount = () => {
    this.querySearchDefault();
    this.querySearchHotDetail();
  }

  render() {
    const { defaultKeyword, keywords, searchHotList, isShowHotListStatus } = this.state;
    return (
      <div>
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
        // onBlur={() => global.debounce(this.setState({ isShowHotListStatus: false }))}
        />
        {isShowHotListStatus ? <SearchHotList data={searchHotList} fun={this.searchHotListCaback} /> : null}
        {/* {isShowSuggestStatus ? <SearchSuggest data={suggestList} fun={this.searchHotListCaback} keywords={keywords} /> : null} */}
      </div>
    );
  }
}

export default Searchs;