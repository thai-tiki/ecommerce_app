import { constants as c } from "../constants";
import { newsServices as s } from "../services/newsServices";
function getAllNews(queryString) {
  return (dispatch) => {
    s.getAllNews(queryString).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_ALL_NEWS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_NEWS_FAILURE, code, message };
  }
}
function getNewsCategory() {
  return (dispatch) => {
    s.getNewsCategory().then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_NEWS_CATEGORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_NEWS_CATEGORY_FAILURE, code, message };
  }
}
function getNewsInfo(id) {
  return (dispatch) => {
    s.getNewsInfo(id).then((res) => {
      if (res.code === 200) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_NEWS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_NEWS_FAILURE, code, message };
  }
}
export const newsActions = {
  getAllNews,
  getNewsCategory,
  getNewsInfo,
};
