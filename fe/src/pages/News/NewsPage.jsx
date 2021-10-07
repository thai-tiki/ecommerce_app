import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newsActions as a } from "../../actions/newsActions";
import { constants as c } from "../../constants";
import NewsCard from "./child/NewsCard";
import PageLoading from "../../components/PageLoading";
function NewsPage(props) {
  const dispatch = useDispatch();
  const pageInfo = useSelector(state => state.news.info);
  const latestNews = useSelector(state => state.news.list);
  const categories = useSelector(state => state.news.categories);
  document.title = pageInfo.title ? pageInfo.title : "Tin tức";
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let newsId = -1;
    if (props.match.params.id) {
      let arr = props.match.params.id.split("-");
      newsId = arr[arr.length - 1];
    }
    if (pageInfo.status === c.LOADING)
      dispatch(a.getNewsInfo(newsId));
    if (pageInfo.status === c.SUCCESS) {
      if (parseInt(newsId) !== pageInfo.id)
        dispatch({ type: c.RESET_NEWS_STATUS });
      if (categories.status === c.LOADING)
        dispatch(a.getNewsCategory());
      if (latestNews.status === c.LOADING)
        dispatch(a.getAllNews(""));
    }
  }, [props.match.params.id, pageInfo]);
  return (
    <React.Fragment>
      <Header />
      {
        pageInfo.status === c.SUCCESS && categories.status === c.SUCCESS ?
          <React.Fragment>
            <div className="news-page">
              <div className="container">
                <div className="main-view">
                  <div className="title">
                    <h4>
                      <span onClick={() => { window.location.href = "/" }}>
                        Trang chủ /
                      </span>
                      <span onClick={() => { window.location.href = "/tin-tuc" }}>
                        Tin tức /
                      </span>
                      {pageInfo.title}
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
                  <div className="news">
                    <div className="title">
                      {pageInfo.title}
                    </div>
                    <div className="date">
                      <img src="/img/calendar.png" alt="" />
                      {pageInfo.updated_at.split(" ")[0]}
                    </div>
                    <div className="paragraph">
                      <div dangerouslySetInnerHTML={{ __html: pageInfo.content }}>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="latest-news">
                  <h3>Tin mới nhất</h3>
                  <div className="column">
                    {
                      latestNews.data.map((v, i) =>
                        i < 6 && <NewsCard key={v.id} {...v} />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
          :
          <PageLoading />
      }
    </React.Fragment>
  )
}
export default NewsPage