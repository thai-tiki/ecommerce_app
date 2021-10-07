import { constants as c } from "../constants";
import { collaboratorServices as s } from "../services/collaboratorServices";
function getAccountInfo() {
  return (dispatch) => {
    s.getAccountInfo().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_ACCOUNT_SUCCESS, data };
  }
  function failure(code, msg) {
    return { type: c.GET_COLLABORATOR_ACCOUNT_FAILURE, code, msg };
  }
}
function getInfo() {
  return (dispatch) => {
    s.getInfo().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_COLLABORATOR_INFO_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_COLLABORATOR_INFO_FAILURE, code, message };
  }
}
function getSharedOrder(query) {
  return (dispatch) => {
    s.getSharedOrder(query).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_SHARED_ORDERS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_SHARED_ORDERS_FAILURE, code, message };
  }
}
function getBalanceHistory() {
  return (dispatch) => {
    s.getBalanceHistory().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_BALANCE_HISTORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_BALANCE_HISTORY_FAILURE, code, message };
  }
}
function getBonusHistory() {
  return (dispatch) => {
    s.getBonusHistory().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        return;
      }
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_BONUS_HISTORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_BONUS_HISTORY_FAILURE, code, message };
  }
}
function requestPayment() {
  return (dispatch) => {
    s.requestPayment().then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Gửi yêu cầu thanh toán thành công",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.REQUEST_PAYMENT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.REQUEST_PAYMENT_FAILURE, code, message };
  }
}
function updateInfo(info) {
  return (dispatch) => {
    s.updateInfo(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Cập nhật thông tin thành công",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }
      dispatch({
        type: c.CHANGE_POPUP,
        popupType: c.AUTOHIDE_POPUP,
        messageInfo: res.msg,
      });
      dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.UPDATE_COLLABORATOR_INFO_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.UPDATE_INFO_COLLABORATOR_FAILURE, code, message };
  }
}
export const collaboratorActions = {
  getInfo,
  updateInfo,
  getSharedOrder,
  getAccountInfo,
  requestPayment,
  getBalanceHistory,
  getBonusHistory,
};
