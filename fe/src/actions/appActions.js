import { constants as c } from "../constants";
import { appServices } from "../services/appServices";
function getHomeInfo() {
  return (dispatch) => {
    appServices.getHomeInfo().then((res) => {
      if (res.code === 200) dispatch(success(res.data));
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
function changePopup(popupType, messageInfo, rattingInfo) {
  return (dispatch) => {
    dispatch({ type: c.CHANGE_POPUP, popupType, messageInfo, rattingInfo });
  };
}
function getProvincesList() {
  return (dispatch) => {
    appServices.getProvincesList().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(provinces) {
    localStorage.setItem("provinces", JSON.stringify(provinces));
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
function getDistrictsList(provinceID) {
  return (dispatch) => {
    appServices.getDistrictsList(provinceID).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(districts) {
    return {
      type: c.GET_DISTRICTS_LIST_SUCCESS,
      districts,
    };
  }
  function failure() {
    return {
      type: c.GET_DISTRICTS_LIST_FAILURE,
    };
  }
}
function getWardsList(districtID) {
  return (dispatch) => {
    appServices.getWardsList(districtID).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(wards) {
    return {
      type: c.GET_WARDS_LIST_SUCCESS,
      wards,
    };
  }
  function failure() {
    return {
      type: c.GET_WARDS_LIST_FAILURE,
    };
  }
}
function getInfoStore() {
  return (dispatch) => {

    const info_store = appServices.getInfoStore();
    if (info_store != null) {
      let info = { ...info_store, status: c.SUCCESS };
      dispatch(success(info));
    } else {
      dispatch(failure());
    }
  };
  function loading(data) {
    return { type: c.GETTING_INFO_STORE };
  }
  function success(data) {
    return { type: c.GET_INFO_STORE_SUCCESS, data };
  }
  function failure() {
    return { type: c.INFO_STORE_FAILURE };
  }
}
function getWebTheme() {
  return (dispatch) => {
    dispatch(loading({ status: c.NONE }));
    const theme_web = appServices.getWebTheme();
    if (theme_web != null) {
      let theme = { ...theme_web, status: c.SUCCESS };
      dispatch(success(theme));
    } else {
      dispatch(failure());
    }
  };
  function loading(data) {
    return { type: c.GETTING_WEB_THEME };
  }
  function success(data) {
    return { type: c.GET_WEB_THEME_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_WEB_THEME_FAILURE };
  }
}
function setChatStatus(status) {
  return (dispatch) => dispatch({ type: c.TOGGLE_CHAT_STATUS, status });
}
export const appActions = {
  getProvincesList,
  getDistrictsList,
  setChatStatus,
  getWardsList,
  getHomeInfo,
  changePopup,
  getWebTheme,
  getInfoStore
};
