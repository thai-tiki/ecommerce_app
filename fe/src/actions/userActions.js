import { constants as c } from "../constants";
import { userServices as s } from "../services/userServices";
import { appActions } from "./appActions";
function accountCheck(info) {
  return (dispatch) => {
    s.accountCheck(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch({ type: c.REQUEST_PHONE_CHECK, phone: info.phone });
        if (!res.is_registered) {
          dispatch(appActions.changePopup(c.REGIS_POPUP));
        } else {
          dispatch(appActions.changePopup(c.LOGIN_POPUP));
        }
      }
    });
  };
}
function accountLogin(info) {
  return (dispatch) => {
    s.accountLogin(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data, res.token));
        dispatch(appActions.changePopup(c.NO_POPUP));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(profile, token) {
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("token", JSON.stringify(token));
    window.location.reload();
    return { type: c.LOGIN_SUCCESS, token };
  }
  function failure(msg) {
    console.log(msg);
    return { type: c.LOGIN_FAILURE, msg };
  }
}
function accountRegis(info) {
  return (dispatch) => {
    s.accountRegis(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data, res.token));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(info, token) {
    localStorage.setItem("profile", JSON.stringify(info));
    localStorage.setItem("token", JSON.stringify(token));
    window.location.reload();
    return { type: c.REGIS_SUCCESS, token };
  }
  function failure(message) {
    return { type: c.REGIS_FAILURE, message };
  }
}
function accountLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  localStorage.removeItem("cartInfo");
  return (dispatch) => {
    dispatch({ type: c.LOGOUT });
    window.location.reload();
  };
}
function getUserAddress() {
  return (dispatch) => {
    s.getUserAddress().then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(address) {
    return { type: c.GET_USER_ADDRESS_SUCCESS, address };
  }
  function failure() {
    return { type: c.GET_USER_ADDRESS_FAILURE };
  }
}
function updateUserAddress(addressInfo, index) {
  return (dispatch) => {
    s.updateUserAddress(addressInfo, index).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Cập nhật địa chỉ giao hàng thàng công !",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
      } else {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
            status: c.FAILURE,
            willReloadAfterClose: true,
          })
        );
      }
    });
  };
}
function addUserAddress(addressInfo) {
  return (dispatch) => {
    s.addUserAddress(addressInfo).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Thêm địa chỉ giao hàng thàng công !",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
      } else {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
            status: c.FAILURE,
            willReloadAfterClose: false,
          })
        );
      }
    });
  };
}
function deleteUserAddress(id) {
  return (dispatch) => {
    s.deleteUserAddress(id).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Xóa địa chỉ giao hàng thàng công !",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
      } else {
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
            status: c.FAILURE,
            willReloadAfterClose: false,
          })
        );
      }
    });
  };
}
function updateUserProfile(profile) {
  return (dispatch) => {
    s.updateUserProfile(profile).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
        dispatch(
          appActions.changePopup(
            c.PROFILE_POPUP,
            "Cập nhật thông tin thành công!",
            {
              status: c.SUCCESS,
            }
          )
        );
      } else {
        dispatch(failure(res.msg, res.code));
        dispatch(
          appActions.changePopup(c.PROFILE_POPUP, res.msg, {
            status: c.FAILURE,
          })
        );
      }
    });
  };
  function success(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
    return {
      type: c.UPDATE_PROFILE_SUCCESS,
      profile,
    };
  }
  function failure(message, code) {
    return { type: c.UPDATE_PROFILE_FAILURE, message, code };
  }
}
//OK
function resetPassword(info) {
  return (dispatch) => {
    s.resetPassword(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        dispatch(success());
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return { type: c.RESET_PASSWORD_SUCCESS };
  }
  function failure(msg) {
    return { type: c.RESET_PASSWORD_FAILURE, msg };
  }
}
function getUserReview() {
  return (dispatch) => {
    s.getUserReview().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      ...data,
      type: c.GET_USER_REVIEW_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_REVIEW_FAILURE, message, code };
  }
}
export const userActions = {
  accountCheck,
  accountLogin,
  accountRegis,
  accountLogout,
  resetPassword,
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  updateUserProfile,
  getUserReview,
};
