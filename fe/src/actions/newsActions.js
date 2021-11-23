import { constants as c } from "../constants";
import { newsServices as s } from "../services/newsServices";
function getAllNews(queryString) {
  return (dispatch) => {
    s.getAllNews(queryString).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(res) {
    return { type: c.GET_ALL_NEWS_SUCCESS, ...res };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_NEWS_FAILURE, code, message };
  }
}
function getNewsInfo(id) {
  return (dispatch) => {
    s.getNewsInfo(id).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
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
function getLatestNews() {
  return (dispatch) => {
    s.getLatestNews().then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure(res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_LATEST_NEWS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_LATEST_NEWS_FAILURE, message };
  }
}
function addNews(info) {
  return (dispatch) => {
    s.addNews(info).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.CREATE_NEWS_FAILURE };
  }
  function failure(code, message) {
    return { type: c.CREATE_NEWS_FAILURE, code, message };
  }
}
export const newsActions = {
  getAllNews,
  getLatestNews,
  getNewsInfo,
  addNews,
};
