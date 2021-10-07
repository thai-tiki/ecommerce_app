import queryString from "query-string"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../components/Paginate";
import BlogCard from "../../components/BlogCard";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading"
import { newsActions as a } from "../../actions/newsActions";
import Header from "../../components/Header";
import { handleImgErr } from "../../helper";
function NewsListPage(props) {
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector(state => state.news.list);
  const categories = useSelector(state => state.news.categories);
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
      } else {
        if (categories.status === c.LOADING) {
          dispatch(a.getNewsCategory());
        }
      }
  }, [props.location.search, pageInfo]);
  function handleSort(option) {
    const queryStr = createQueryString(option);
    window.location.href = window.location.origin + window.location.pathname + queryStr
  }
  function handleCategorySelect(id, title) {
    window.location.href = `/tin-tuc?danh-muc=${title.replace(/\s/g, "-")}-${id}`;
  }
  return (
    <React.Fragment>
      <Header />
      {
        pageInfo.status === c.SUCCESS && categories.status === c.SUCCESS ?
          <div className="news-list-page container">
            <div className="row">
              <div className="categories-column">
                <div className="main-title">
                  <h3>Danh mục</h3>
                </div>
                <div className="column">
                  {
                    categories.list.map((v, i) =>
                      <Link
                        key={i}
                        style={{ cursor: "pointer" }}
                        to={`/tin-tuc?danh-muc=${v.title.replace(/\s/g, "-")}-${v.id}`}>
                        <div className="image">
                          <div className="img-container">
                            <img
                              onError={handleImgErr}
                              src={v.image_url}
                              alt=""
                              style={{ width: "30px", objectFir: "contain", marginRight: "8px" }}
                            />
                          </div>
                        </div>
                        <div>
                          {v.title}
                        </div>
                      </Link>
                    )
                  }
                </div>
              </div>
              <div className="news-list">
                <div className="title">
                  <h3>Danh mục tin tức</h3>
                  <h4>
                    <span onClick={() => { window.location.href = "/" }}>Trang chủ /</span> Danh mục tin tức
                  </h4>
                </div>
                <div className="news-category">
                  {
                    categories.list.map((v, i) =>
                      <Link
                        key={i}
                        className="news-category-card"
                        to={`/tin-tuc?danh-muc=${v.title.replace(/\s/g, "-")}-${v.id}`}>
                        {v.title}
                      </Link>
                    )
                  }
                </div>
                <div className="row">
                  {
                    pageInfo.data.map((v, i) =>
                      <div className="card-container" key={i}>
                        <BlogCard
                          id={v.id}
                          title={v.title}
                          img={v.image_url}
                          quote={v.content}
                        />
                      </div>
                    )
                  }
                </div>
                <Paginate
                  currentPage={pageInfo.current_page}
                  totalPage={pageInfo.last_page}
                  handlePageSelect={handleSort}
                />
              </div>
            </div>
          </div>
          : <PageLoading />
      }
    </React.Fragment>
  )
}
export default NewsListPage