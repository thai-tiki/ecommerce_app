import { constants as c } from "../constants";
import { cartServices as s } from "../services/cartServices";
import { toast } from "react-toastify";
import { userActions } from "../actions/userActions";
function addCart(product, willShowPopup) {
  return (dispatch) => {
    s.addCart(product).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
        if (product.quantity) {
          if (willShowPopup) {
            toast.success(" Đã thêm vào giỏ hàng", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Xóa sản phẩm khỏi giỏ hàng thành công !",
          });
        }
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Có lỗi xảy ra vui lòng thử lại sau !",
        });
      }
      dispatch(userActions.getUserBadges());
    });
  };
  function success(cartInfo) {
    return { type: c.ADD_CART_SUCCESS, cartInfo };
  }
  function failure() {
    return { type: c.ADD_CART_FAILURE };
  }
}
function changeNumberInCart(product) {
  return (dispatch) => {
    s.changeNumberInCart(product).then((res) => {
      if (res.code === 200) {
        console.log("success");
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        if (product.quantity === 0) {
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: "Xóa sản phẩm khỏi giỏ hàng thành công !",
          });
        }
        dispatch(userActions.getUserBadges());
        dispatch(getCartInfo());
      } else {
        dispatch(failure());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: "Có lỗi xảy ra vui lòng thử lại sau !",
        });
      }
    });
  };
  function success(cartInfo) {
    return { type: c.CHANGE_NUMBER_SUCCESS, cartInfo };
  }
  function failure() {
    return { type: c.ADD_CART_FAILURE };
  }
}
function getCartInfo() {
  return (dispatch) => {
    s.getCartInfo().then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.GET_CART_SUCCESS,
      cartInfo,
    };
  }
  function failure() {
    return { type: c.GET_CART_FAILURE };
  }
}
function getShipmentFee(idAddress) {
  return (dispatch) => {
    s.getShipmentFee(idAddress).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(shipmentFee) {
    return {
      type: c.GET_SHIPMENT_FEE_SUCCESS,
      shipmentFee,
    };
  }
  function failure() {
    return { type: c.GET_SHIPMENT_FEE_FAILURE };
  }
}
function getPaymentMethods() {
  return (dispatch) => {
    s.getPaymentMethods().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(paymentMethod) {
    return {
      type: c.GET_PAYMENT_METHODS_SUCCESS,
      paymentMethod,
    };
  }
  function failure() {
    return { type: c.GET_PAYMENT_METHODS_FAILURE };
  }
}
function order(orderInfo) {
  return (dispatch) => {
    s.order(orderInfo).then((res) => {
      if (res.code === 201) {
        window.localStorage.removeItem("cartInfo");
        dispatch(success());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.ORDER_POPUP,
          orderPopupTitle: {
            title: "Đặt hàng thành công !",
            subTitle:
              "Bạn đã đặt hàng thành công vui lòng đợi xác nhận từ cửa hàng.",
          },
          paymentMethod: {
            payment_method_name: res.data.payment_method_name,
            payment_method_id: res.data.payment_method_id,
            order_code: res.data.order_code,
          },
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.ORDER_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.ORDER_FAILURE,
      message,
    };
  }
}
function changePaymentMethod(info) {
  return (dispatch) => {
    s.changePaymentMethod(info).then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.ORDER_POPUP,
          orderPopupTitle: {
            title: "Cập nhật thông tin thanh toán thành công !",
            subTitle:
              "Bạn đã cập nhật thông tin thanh toán thành công vui lòng đợi xác nhận từ cửa hàng.",
          },
          paymentMethod: {
            payment_method_name: info.paymentMethodName,
            payment_method_id: info.paymentMethodId,
            order_code: info.orderCode,
          },
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.CHANGE_PAYMENT_METHOD_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.CHANGE_PAYMENT_METHOD_FAILURE,
      message,
    };
  }
}
function getOrdersList(query) {
  return (dispatch) => {
    s.getOrdersList(query).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(ordersList) {
    return {
      type: c.GET_ORDERS_LIST_SUCCESS,
      ordersList,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDERS_LIST_FAILURE,
      code,
      message,
    };
  }
}
function getOrderInfo(orderCode) {
  return (dispatch) => {
    s.getOrderInfo(orderCode).then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(orderInfo) {
    return {
      type: c.GET_ORDER_INFO_SUCCESS,
      orderInfo,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDER_INFO_FAILURE,
      code,
      message,
    };
  }
}
function cancelOrder(info) {
  return (dispatch) => {
    s.cancelOrder(info).then((res) => {
      if (res.code === 200) {
        dispatch(success());
        window.location.reload();
      } else {
        dispatch(failure(res.code, res.msg));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success() {
    return { type: c.CANCEL_ORDER_SUCCESS };
  }
  function failure(code, message) {
    return { type: c.CANCEL_ORDER_FAILURE, code, message };
  }
}
function applyDiscount(info, type) {
  const msg = {
    code_voucher: "Áp dụng voucher thành công !",
    is_use_points: "Sử dụng xu thành công !",
    is_use_balance_collaborator: "Sử dụng số dư CTV thành công !",
  };
  return (dispatch) => {
    s.applyDiscount(info).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
        if (info[type])
          dispatch({
            type: c.CHANGE_POPUP,
            popupType: c.AUTOHIDE_POPUP,
            messageInfo: msg[type],
          });
      } else {
        dispatch(failure(res.code, res.msg));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.APPLY_VOUCHER_SUCCESS,
      cartInfo,
    };
  }
  function failure(code, message) {
    return { type: c.APPLY_VOUCHER_FAILURE, code, message };
  }
}
export const cartActions = {
  order,
  addCart,
  getCartInfo,
  getShipmentFee,
  getPaymentMethods,
  changeNumberInCart,
  changePaymentMethod,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
};
