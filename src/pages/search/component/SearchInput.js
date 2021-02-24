/*
 * @Author: REFUSE_C
 * @Date: 2020-08-25 15:04:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-24 20:15:29
 * @Description: 搜索-搜索框
 */
import React, { Component } from 'react';
import { searchDefault, searchHotDetail, searchSuggest } from 'common/api/search';
import { isEmpty, Trim } from 'common/utils/format';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modelPower } from 'store/actions';
import { IS_SHOW_SEARCH_LIST } from 'store/actionTypes';
import SearchHotList from './SearchHotList';
import { routerJump } from 'common/utils/tools';
// import SearchSuggest from './SearchSuggest';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
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

  // 传递搜索的关键字
  querySearch = () => {
    const { keywords } = this.state;
    this.querySearchDefault();//查询搜索框默认显示的文字
    routerJump(this.props.history, `/home/search`, queryString.stringify({ keywords }))
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
    this.props.handelModelPower({ type: IS_SHOW_SEARCH_LIST, data: false });
  }

  onChange = e => {
    const { value: keywords } = e.target;
    this.setState({ keywords }, () => {
      if (Trim(keywords)) {
        this.props.handelModelPower({ type: IS_SHOW_SEARCH_LIST, data: false });
        // this.querySearchSuggest({ keywords })
        // global.debounce(() => this.querySearchSuggest({ keywords }), 50)
      } else {
        this.props.handelModelPower({ type: IS_SHOW_SEARCH_LIST, data: true });
      }
    });
  }

  // 聚焦显示热搜榜
  handelFocus = () => {
    const { keywords } = this.state;
    if (isEmpty(Trim(keywords)))
      this.props.handelModelPower({ type: IS_SHOW_SEARCH_LIST, data: true });
    // this.querySearchSuggest({ keywords });
  }

  // 点击热搜回调
  searchHotListCaback = keywords => {
    this.setState({ keywords }, () => {
      this.props.handelModelPower({ type: IS_SHOW_SEARCH_LIST, data: false });
      this.querySearch();
    })
  }

  componentDidMount = () => {
    this.querySearchDefault();
    this.querySearchHotDetail();
  }

  render() {
    const { modelPower } = this.props;
    const { searchListStatus } = modelPower;
    const { defaultKeyword, keywords, searchHotList, } = this.state;
    return (
      <div>
        <Search
          size={`small`}
          // allowClear
          maxLength={30}
          loading={false}
          value={keywords}
          onChange={this.onChange}
          placeholder={defaultKeyword}
          onSearch={e => this.onSearch(e)}
          onFocus={() => this.handelFocus()}
          onClick={e => e.stopPropagation()}

        />
        {searchListStatus ? <SearchHotList data={searchHotList} fun={this.searchHotListCaback} /> : null}
        {/* {isShowSuggestStatus ? <SearchSuggest data={suggestList} fun={this.searchHotListCaback} keywords={keywords} /> : null} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelPower: state.modelPower,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handelModelPower: bindActionCreators(modelPower, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchs));
