import queryString from "query-string"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { newsActions as a } from "../../actions/newsActions";
import Header from "../../components/Header";
import BlogCard from "../../components/BlogCard";
import Paginate from "../../components/Paginate";
import LatestNews from "../../components/LatestNews";
import PageLoading from "../../components/PageLoading";
function NewsListPage(props) {
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector(state => state.news.list);
  console.log(pageInfo);
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState(props.location.state);
  const [currentQuery, setCurrentQuery] = useState(createQueryString(query));
  function createQueryString(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") {
        if (keys[i] === "danh-muc") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["category_ids"] = id;
        }
        else
          query[keys[i]] = option[keys[i]];
      }
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }
  useEffect(() => {
    document.title = "Danh sách bài viết";
    let queryStr = createQueryString(query);
    if ((queryStr !== currentQuery || prevLocation !== window.location.pathname)) {
      dispatch({ type: c.RESET_NEWS_LIST_STATUS });
      setCurrentQuery(queryStr);
      setPrevLocation(window.location.pathname);
    } else
      if (pageInfo.status === c.LOADING) {
        let queryStr = createQueryString(query);
        dispatch(a.getAllNews(queryStr));
      }
  }, [props.location.search, pageInfo]);
  function handleSort(option) {
    const queryStr = createQueryString(option);
    window.location.href = window.location.origin + window.location.pathname + queryStr
  }
  return (
    <React.Fragment>
      <Header />
      {
        pageInfo.status === c.SUCCESS ?
          <div className="news-list-page container">
            <div className="row">
              <div className="news-list">
                <div className="title">
                  <h3>Danh mục tin tức</h3>
                </div>
                <div className="row list-news">
                  {
                    pageInfo.data.map((v) =>
                      <div className="card-container" key={v._id}>
                        <BlogCard
                          {...v}
                        />
                      </div>
                    )
                  }
                </div>
                <Paginate
                  currentPage={pageInfo.current_page}
                  totalPage={pageInfo.total_page}
                  handlePageSelect={handleSort}
                />
              </div>
              <div className="latest-news">
                <h4>Tin tức mới nhất</h4>
                {
                  pageInfo.data.map((v) => <LatestNews {...v} />)
                }
              </div>
            </div>
          </div>
          : <PageLoading />
      }
    </React.Fragment>
  )
}
export default NewsListPage