import { constants as c } from "../constants";
import { appServices } from "../services/appServices";
function getHomeInfo() {
  return (dispatch) => {
    appServices.getHomeInfo().then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_HOME_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_HOME_FAILURE };
  }
}
function getAdminInfo() {
  return (dispatch) => {
    appServices.getAdminInfo().then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_ADMIN_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_ADMIN_FAILURE };
  }
}
function changePopup(popupType, msg, additionalInfo) {
  return (dispatch) => {
    dispatch({
      msg,
      popupType,
      additionalInfo,
      type: c.CHANGE_POPUP,
    });
  };
}
function getLocation() {
  return (dispatch) => {
    appServices.getLocation().then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(provinces) {
    localStorage.setItem("location", JSON.stringify(provinces));
    return {
      type: c.GET_PROVINCES_LIST_SUCCESS,
      provinces,
    };
  }
  function failure() {
    return {
      type: c.GET_PROVINCES_LIST_FAILURE,
    };
  }
}
export const appActions = {
  getLocation,
  getHomeInfo,
  changePopup,
  getAdminInfo,
};
