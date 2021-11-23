import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsActions as a } from "../../actions/newsActions";
import { constants as c } from "../../constants";
import Header from "../../components/Header";
import PageLoading from "../../components/PageLoading";
import LatestNews from "../../components/LatestNews";
function NewsPage(props) {
  const dispatch = useDispatch();
  const pageInfo = useSelector(state => state.news.info);
  const latest = useSelector(state => state.news.latest);
  document.title = pageInfo.title ? pageInfo.title : "Tin tức";
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let newsId = "-1";
    if (props.match.params.id) {
      let arr = props.match.params.id.split("-");
      newsId = arr[arr.length - 1];
    }
    if (pageInfo.status === c.LOADING)
      dispatch(a.getNewsInfo(newsId));
    if (latest.status === c.LOADING)
      dispatch(a.getLatestNews());
    if (pageInfo.status === c.SUCCESS) {
      document.title = pageInfo.data.title;
      if (newsId !== pageInfo.data._id)
        dispatch({ type: c.RESET_NEWS_STATUS });
    }
  }, [props.match.params.id, pageInfo]);
  return (
    <React.Fragment>
      <Header />
      {
        pageInfo.status === c.SUCCESS ?
          <React.Fragment>
            <div className="news-page">
              <div className="container">
                <div className="main-view">
                  <div className="news">
                    <div className="title">
                      {pageInfo.data.title}
                    </div>
                    <div className="date">
                      <img src="/img/calendar.png" alt="" />
                      {pageInfo.data.date}
                    </div>
                    <div className="paragraph">
                      <div dangerouslySetInnerHTML={{ __html: pageInfo.data.content }}>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="latest-news">
                  <h4>Tin mới nhất</h4>
                  {
                    latest.data.length &&
                    latest.data.map((v) => <LatestNews {...v} key={v._id} />)
                  }
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