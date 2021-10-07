import { constants as c } from "../constants";
import { userServices as s } from "../services/userServices";
function accountCheck(info) {
  return (dispatch) => {
    s.accountCheck(info).then((res) => {
      if (res.code === 200) {
        let result = res.data.filter((v) => v.value === true);
        if (result.length === 0) {
          if (info.phone_number !== null) {
            dispatch({ type: c.PHONE_NOT_REGISTERED, info });
          }
        } else {
          if (result[0].name === "phone_number") {
            dispatch({ type: c.PHONE_REGISTERED, info });
          }
        }
      }
    });
  };
}

function accountLogin(info) {
  console.log(info);
  return (dispatch) => {
    s.accountLogin(info).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(tokenInfo) {
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
    window.location.reload();
    return { type: c.LOGIN_SUCCESS, tokenInfo };
  }
  function failure(msg) {
    console.log(msg);
    return { type: c.LOGIN_FAILURE, msg };
  }
}
function accountRegis(info) {
  return (dispatch) => {
    s.accountRegis(info).then((res) => {
      if (res.code === 200 || res.code === 201) {
        console.log("ok");
        s.accountLogin(info).then((res2) => {
          console.log("res2", res2);
          if (res2.code === 200) {
            dispatch(success(res2.data));
          } else {
            window.location.reload();
          }
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(tokenInfo) {
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
    window.location.reload();
    return { type: c.LOGIN_SUCCESS, tokenInfo };
  }
  function failure(message) {
    return { type: c.REGIS_FAILURE, message };
  }
}
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
function accountLogout() {
  localStorage.removeItem("tokenInfo");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartInfo");
  localStorage.removeItem("profile");
  return (dispatch) => {
    dispatch({ type: c.LOGOUT });
    window.location.reload();
  };
}
function getUserAddress() {
  return (dispatch) => {
    s.getUserAddress().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success(userAddress) {
    return { type: c.GET_USER_ADDRESS_SUCCESS, userAddress };
  }
  function failure() {
    return { type: c.GET_USER_ADDRESS_FAILURE };
  }
}
function addUserAddress(addressInfo) {
  return (dispatch) => {
    s.addUserAddress(addressInfo).then((res) => {
      if (res.code === 201) {
        dispatch(success());
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.ADD_USER_ADDRESS_SUCCESS,
      message: "Thêm địa chỉ giao hàng thành công",
    };
  }
  function failure(message) {
    return { type: c.ADD_USER_ADDRESS_FAILURE, message };
  }
}
function updateUserAddress(addressInfo) {
  return (dispatch) => {
    s.updateUserAddress(addressInfo).then((res) => {
      if (res.code === 200) {
        dispatch(success());
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.UPDATE_USER_ADDRESS_SUCCESS,
      message: "Cập nhật thông tin giao hàng thành công",
    };
  }
  function failure(message) {
    return { type: c.UPDATE_USER_ADDRESS_FAILURE, message };
  }
}
function setAddressDefault(addressInfo) {
  return (dispatch) => {
    s.updateUserAddress(addressInfo).then((res) => {
      if (res.code === 200) {
        dispatch(success());
        window.location.reload();
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success() {
    return { type: c.SET_ADDRESS_DEFAULT_SUCCESS };
  }
  function failure() {
    return { type: c.SET_ADDRESS_DEFAULT_FAILURE };
  }
}
function deleteUserAddress(id) {
  return (dispatch) => {
    s.deleteUserAddress(id).then((res) => {
      if (res.code === 200) {
        dispatch(success());
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.DELETE_USER_ADDRESS_SUCCESS,
      message: "Xóa địa chỉ thành công",
    };
  }
  function failure(message) {
    return { type: c.DELETE_USER_ADDRESS_FAILURE, message };
  }
}
function getUserProfile() {
  return (dispatch) => {
    s.getUserProfile().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
    return {
      type: c.GET_PROFILE_SUCCESS,
      profile,
    };
  }
  function failure(message, code) {
    return { type: c.GET_PROFILE_FAILURE, message, code };
  }
}
function updateUserProfile(profile) {
  return (dispatch) => {
    s.updateUserProfile(profile).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Cập nhật thông tin thành công !",
        });
      } else {
        dispatch(failure(res.msg, res.code));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
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
function getUserBadges() {
  return (dispatch) => {
    s.getUserBadges().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      badges: data,
      type: c.GET_USER_BADGES_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_BADGES_FAILURE, message, code };
  }
}
function getuserNotify() {
  return (dispatch) => {
    s.getuserNotify().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.msg, res.code));
      }
    });
  };
  function success(data) {
    return {
      data,
      type: c.GET_USER_NOTIFY_SUCCESS,
    };
  }
  function failure(message, code) {
    return { type: c.GET_USER_NOTIFY_FAILURE, message, code };
  }
}

function toggleClassChat(boxChatStateIp) {
  var boxChatState = boxChatStateIp;
  boxChatState = boxChatState === "active" ? "" : "active";
  console.log({ boxChatState });
  return {
    boxChatState,
    type: c.TOGGLE_BOX_CHAT,
  };
}

export const userActions = {
  accountCheck,
  accountLogin,
  accountRegis,
  accountLogout,
  resetPassword,
  getUserProfile,
  getUserAddress,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setAddressDefault,
  updateUserProfile,
  getUserReview,
  getUserBadges,
  getuserNotify,
  toggleClassChat,
};
