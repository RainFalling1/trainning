import React from "react";
import { Spin, Row, Col, notification } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { getAll, getMoreByUrl } from "../../services/Popular";
import "./Popular.css";
import PopularCard from "../../components/PopularCard/PopularCard";
// import { Link } from 'react-router-dom';
import PopularNav from "./PopularNav";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      pageNum: 1,
      pageType: "all",
      showSpin: true,
    };
    this.initData();
  }

  initData = () => {
    const GetQueryString = (name) => {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    };

    const type = GetQueryString("type");
    let postType = "";
    if (type === "All") {
      postType = "all";
    } else if (type === "Javascript") {
      postType = "+language:javascript";
    } else {
      postType = `+language:${type}`;
    }
    // eslint-disable-next-line no-use-before-define
    this.getMore(postType, 1, []);
  };

  getMore = (pageType, pageNum, pageList) => {
    if (pageType === "all" || !pageType) {
      // 拉取全部
      getAll(pageNum)
        .then((res) => {
          if (res.data) {
            // eslint-disable-next-line react/no-access-state-in-setstate
            const nextNum = this.state.pageNum + 1;
            this.setState({
              list: [...pageList, ...res.data.items],
              pageNum: nextNum,
              pageType,
            });
          }
        })
        .catch((res) => {
          this.setState({ list: [] });
          this.setState({ showSpin: false });
          const { response } = res;
          notification.open({
            type: "error",
            message: "错误",
            description: response.data.message,
          });
        });
    } else {
      getMoreByUrl(pageType, pageNum)
        .then((res) => {
          // eslint-disable-next-line react/no-access-state-in-setstate
          const nextNum = this.state.pageNum + 1;
          this.setState({
            list: [...pageList, ...res.data.items],
            pageNum: nextNum,
            pageType,
          });
        })
        .catch((res) => {
          this.setState({ list: [] });
          this.setState({ showSpin: false });
          const { response } = res;
          notification.open({
            type: "error",
            message: "错误",
            description: response.data.message,
          });
        });
    }
  };

  updateList = (type) => {
    this.setState({
      list: [],
      pageNum: 1,
      pageType: type,
    });
    this.getMore(type, 1, []);
  };

  render() {
    const { pageType, pageNum, list } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          display: "flex",
        }}
      >
        <PopularNav callback={this.updateList} currentType={pageType} />
        {list && list.length > 0 ? (
          <div>
            <InfiniteScroll
              loadMore={() => this.getMore(pageType, pageNum, list)}
              loader={null}
              hasMore
              initialLoad
            >
              {/* 卡片列表 */}
              {/* <div className={"listArea"}> */}
              <Row type="flex" justify="center" align="center">
                {list.map((i, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <PopularCard item={i} key={i.id} index={index} />
                  </Col>
                ))}
              </Row>

              {/* </div> */}
            </InfiniteScroll>
          </div>
        ) : (
          <div>
            {this.state.showSpin && <Spin size="large" tip="加载中..." />}
          </div>
        )}
        {list && list.length > 0 && <Spin size="large" tip="加载中..." />}
      </div>
    );
  }
}
